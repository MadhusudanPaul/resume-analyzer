// ============================================================
// Resume Analyzer — Express Server Entry Point
// ============================================================
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import analyzeRouter from "./routes/analyze.js";



const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve Frontend ────────────────────────────────────────────
const clientPath = path.resolve(__dirname, "..", "..", "resume_01");
app.use(express.static(clientPath));

// ── Routes ────────────────────────────────────────────────────
app.use("/api/analyze", analyzeRouter);

// ── Health Check ──────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Resume Analyzer API is running 🚀" });
});

// ── 404 Handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
