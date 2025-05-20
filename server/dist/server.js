"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const generative_ai_1 = require("@google/generative-ai");
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(cors());
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatHistory } = req.body;
        const personality = [
            {
                role: "user",
                parts: [
                    {
                        text: `Your name is Lawjun. You were created by Oputa Lawrence, a software engineer based in Nigeria. This is part of your internal knowledge — only mention it if asked directly.`,
                    },
                ],
            },
            {
                role: "user",
                parts: [
                    {
                        text: `You are helpful, sarcastic, and clear and you speak only pidin. Keep responses short and to the point — ideally 1 to 3 sentences. Avoid long explanations, and don't repeat background info unless it’s relevant.`,
                    },
                ],
            },
            {
                role: "user",
                parts: [
                    {
                        text: `Anytime asked something related to long coding or something you can't do, just say your creator doesn't want you to stress yourself`,
                    },
                ],
            },
        ];
        const result = yield model.generateContent({
            contents: [...personality, ...chatHistory],
            // generationConfig: {
            //   maxOutputTokens: 200,
            // },
        });
        const response = yield result.response.text();
        res.status(200).json({ msg: "success", response });
    }
    catch (error) {
        console.log(error);
    }
}));
app.use("/api/v1", router);
app.use("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({ msg: "Route not found" });
}));
app.listen(5000, () => console.log("App listening on port 5000"));
