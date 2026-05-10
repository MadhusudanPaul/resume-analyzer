// ============================================================
// routes/analyze.js — Analysis route
// ============================================================
import { Router } from "express";
import upload from "../utils/upload.js";
import { analyzeResume } from "../controllers/analyzeController.js";

const router = Router();

// POST /api/analyze
// Field name "resume" matches the FormData key in the frontend
router.post("/", upload.single("resume"), analyzeResume);

export default router;
