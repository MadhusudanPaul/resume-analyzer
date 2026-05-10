// ============================================================
// controllers/analyzeController.js — Core analysis logic
// ============================================================
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { analyzeResumeWithGemini } from "../utils/gemini.js";

/**
 * POST /api/analyze
 * Accepts: multipart/form-data with `resume` (PDF) and `jobDescription` (text)
 * Returns: { atsScore, missingSkills, suggestions }
 */
export async function analyzeResume(req, res) {
  try {
    // ── 1. Validate inputs ────────────────────────────────────
    if (!req.file) {
      return res.status(400).json({ error: "No PDF resume uploaded." });
    }

    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: "Please provide a job description." });
    }

    // ── 2. Extract text from PDF ──────────────────────────────
    console.log("📄 Parsing PDF...");
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text?.trim();

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({ error: "Could not extract text from the PDF. Please ensure it is a text-based (not scanned) PDF." });
    }

    console.log(`✅ Extracted ${resumeText.length} characters from PDF`);

    // ── 3. Send to Gemini for analysis ────────────────────────
    console.log("🤖 Sending to Gemini API...");
    const analysis = await analyzeResumeWithGemini(resumeText, jobDescription.trim());

    console.log("✅ Analysis complete:", JSON.stringify(analysis, null, 2));

    // ── 4. Return structured response ─────────────────────────
    return res.json({
      success: true,
      atsScore: analysis.atsScore,
      missingSkills: analysis.missingSkills || [],
      suggestions: analysis.suggestions || [],
    });

  } catch (error) {
    console.error("❌ Analysis error:", error.message);
    return res.status(500).json({ error: error.message || "Analysis failed. Please try again." });
  }
}
