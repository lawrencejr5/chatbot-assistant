require("dotenv").config();

import express, { Request, Response } from "express";

import { OpenAI } from "openai";

const app = express();
const router = express.Router();

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { input } = req.body;

    const data = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [{ role: "user", content: input }],
    });
    const response = data.choices[0]?.message?.content;

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
