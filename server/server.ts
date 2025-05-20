require("dotenv").config();

import express, { Request, Response } from "express";

const cors = require("cors");

import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

router.post("/", async (req: Request, res: Response): Promise<void> => {
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

    const result = await model.generateContent({
      contents: [...personality, ...chatHistory],
      // generationConfig: {
      //   maxOutputTokens: 200,
      // },
    });
    const response = await result.response.text();

    res.status(200).json({ msg: "success", response });
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/v1", router);

app.use("/", async (req: Request, res: Response): Promise<void> => {
  res.status(404).json({ msg: "Route not found" });
});

app.listen(5000, () => console.log("App listening on port 5000"));
