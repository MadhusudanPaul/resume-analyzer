// ============================================================
// utils/gemini.js — Gemini API integration
// ============================================================
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

console.log("🔑 Key loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes a resume against a job description using Gemini.
 * @param {string} resumeText  - Extracted text from the PDF resume
 * @param {string} jobDescription - Job description entered by the user
 * @returns {Promise<{ atsScore, missingSkills, suggestions }>}
 */
export async function analyzeResumeWithGemini(resumeText, jobDescription) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an expert ATS (Applicant Tracking System) and career coach. Analyze the resume against the job description below.

Return ONLY a valid JSON object (no markdown, no extra text) with this exact structure:
{
  "atsScore": <number between 0 and 100>,
  "missingSkills": [<list of missing skill strings>],
  "suggestions": [<list of actionable improvement suggestion strings>]
}

Rules:
- atsScore: Integer 0–100 based on how well the resume matches the job description
- missingSkills: Array of skill/keyword strings the resume lacks but the job needs (max 10)
- suggestions: Array of specific, actionable tips to improve the resume (max 8)

---RESUME---
${resumeText}

---JOB DESCRIPTION---
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  // Strip markdown code fences if Gemini wraps the response
  const clean = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error("Failed to parse Gemini response as JSON: " + clean);
  }
}
