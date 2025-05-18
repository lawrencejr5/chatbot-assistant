require("dotenv").config();

import express, { Request, Response } from "express";

import axios from "axios";

const app = express();
const router = express.Router();

app.use(express.json());

const model = process.env.HF_MODEL;
const token = process.env.HF_TOKEN;

const hf_url = `https://api-inference.huggingface.co/models/${model}`;

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { input } = req.body;

    const { data } = await axios.post(
      hf_url,
      { inputs: input, parameters: { temperature: 0.7, max_new_tokens: 100 } },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.status(200).json({ msg: "success", response: data[0]?.generated_text });
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/v1", router);

app.use("/", async (req: Request, res: Response): Promise<void> => {
  res.status(404).json({ msg: "Route not found" });
});

app.listen(5000, () => console.log("App listening on port 5000"));
