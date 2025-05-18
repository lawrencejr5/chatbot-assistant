require("dotenv").config();

import express, { Request, Response } from "express";

import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

import axios from "axios";

const app = express();
const router = express.Router();

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { input } = req.body;

    const result = await model.generateContent(input);
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
