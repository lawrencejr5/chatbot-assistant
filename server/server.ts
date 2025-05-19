require("dotenv").config();

import express, { Request, Response } from "express";

// import

const app = express();
const router = express.Router();

app.use(express.json());

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { input } = req.body;

    res.status(200).json({ msg: "success", response: input });
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/v1", router);

app.use("/", async (req: Request, res: Response): Promise<void> => {
  res.status(404).json({ msg: "Route not found" });
});

app.listen(5000, () => console.log("App listening on port 5000"));
