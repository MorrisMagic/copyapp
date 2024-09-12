const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();
const connectDB = require("./connectDB");
const copy = require("./model");

connectDB();

app.use(express.json());

app.use(cors({ credentials: true, origin: "https://copyapp-front2.onrender.com" }));

app.get("/test", async (req, res) => {
  const data = await copy.find();
  res.json(data);
});

app.get("/delete", async (req, res) => {
  try {
    setTimeout(async () => {
      const data = await copy.deleteMany();
      res.json({ message: "All entries deleted", data });
    }, 10000);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/test", async (req, res) => {
  const { link } = req.body;
  const data = await copy.create({ link });
  res.json(data);
});

app.listen(PORT);
