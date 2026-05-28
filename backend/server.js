import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.post("/api/cal/book", async (req, res) => {
  res.json({ ok: true });
});

app.get("/api/cal/availability", async (req, res) => {
  res.json({ slots: [] });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});