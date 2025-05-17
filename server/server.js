const express = require("express");

const app = express();
const router = express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "success" });
});
app.use("/api/v1", router);

app.use("/", (req, res) => {
  return res.status(404).json({ msg: "Route not found" });
});

app.listen(5000, console.log("App listening on port 5000"));
