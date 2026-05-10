// ============================================================
// components/UploadSection.jsx — Resume upload + job desc form
// ============================================================
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineSparkles,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { TbFileTypePdf } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function UploadSection({ onResult, isAnalyzing, setIsAnalyzing }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ── File validation ───────────────────────────────────────
  const handleFile = useCallback((file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max size is 5 MB.");
      return;
    }
    setResumeFile(file);
    toast.success(`"${file.name}" uploaded ✓`);
  }, []);

  // ── Drag & drop handlers ──────────────────────────────────
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  // ── Form submission ───────────────────────────────────────
  const handleAnalyze = async () => {
    if (!resumeFile) { toast.error("Please upload a PDF resume first."); return; }
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      toast.error("Job description must be at least 20 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription.trim());

    setIsAnalyzing(true);
    onResult(null); // clear old results

    const toastId = toast.loading("🤖 Gemini is analyzing your resume…");

    try {
      const { data } = await axios.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Analysis complete!", { id: toastId });
      onResult(data);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);

    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(msg, { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = resumeFile && jobDescription.trim().length >= 20 && !isAnalyzing;

  return (
    <section id="analyze" className="py-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
          Analyze Your <span className="text-gradient">Resume</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Upload your PDF resume and paste the job description below. Our AI handles the rest.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {/* ── Left: PDF Upload ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                <TbFileTypePdf className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm">Resume Upload</p>
                <p className="text-xs text-slate-500">PDF only · Max 5 MB</p>
              </div>
            </div>

            {/* Drop zone */}
            <div
              className={`relative flex-1 min-h-48 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
                ${isDragging
                  ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                  : resumeFile
                    ? "border-green-500/40 bg-green-500/5"
                    : "border-white/10 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/5"
                }`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => !resumeFile && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              <AnimatePresence mode="wait">
                {resumeFile ? (
                  /* File uploaded state */
                  <motion.div
                    key="uploaded"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-3 animate-float">
                      <HiOutlineDocumentText className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="font-medium text-white text-sm mb-1 max-w-[200px] truncate">{resumeFile.name}</p>
                    <p className="text-xs text-slate-500 mb-4">
                      {(resumeFile.size / 1024).toFixed(0)} KB · PDF
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400
                                 border border-red-500/20 hover:bg-red-500/10 transition-all duration-200"
                    >
                      <HiOutlineXMark className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </motion.div>
                ) : (
                  /* Empty drop zone */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4"
                    >
                      <HiOutlineCloudArrowUp className={`w-8 h-8 transition-colors duration-300 ${isDragging ? "text-cyan-400" : "text-slate-500"}`} />
                    </motion.div>
                    <p className="font-medium text-slate-300 text-sm mb-1">
                      {isDragging ? "Drop your PDF here" : "Drag & drop your resume"}
                    </p>
                    <p className="text-xs text-slate-600 mb-3">or</p>
                    <span className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/25
                                     text-cyan-300 text-xs font-medium hover:bg-cyan-500/20 transition-colors">
                      Browse Files
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Job Description ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                <HiOutlineBriefcase className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm">Job Description</p>
                <p className="text-xs text-slate-500">Paste the full JD for best results</p>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here…&#10;&#10;e.g. We are looking for a Senior React Developer with experience in TypeScript, Node.js, and AWS..."
              className="flex-1 min-h-48 w-full bg-white/[0.03] border border-white/8
                         rounded-xl p-4 text-sm text-slate-300 placeholder-slate-600
                         resize-none outline-none transition-all duration-300
                         focus:border-cyan-500/40 focus:bg-cyan-500/4 focus:ring-1 focus:ring-cyan-500/20
                         font-sans leading-relaxed"
            />

            {/* Character count */}
            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span>{jobDescription.length} characters</span>
              {jobDescription.length > 0 && jobDescription.length < 20 && (
                <span className="text-amber-500/70">Need at least 20 characters</span>
              )}
              {jobDescription.length >= 20 && (
                <span className="text-green-500/70">✓ Ready to analyze</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Analyze Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mt-8"
      >
        <motion.button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          whileHover={canAnalyze ? { scale: 1.04 } : {}}
          whileTap={canAnalyze ? { scale: 0.96 } : {}}
          className="btn-primary flex items-center gap-3 text-base px-10 py-4 min-w-64"
        >
          {isAnalyzing ? (
            <>
              <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
              Analyzing Resume…
            </>
          ) : (
            <>
              <HiOutlineSparkles className="w-5 h-5" />
              Analyze Resume
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Tips row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600"
      >
        {["No data stored", "Instant analysis", "Powered by Gemini 1.5 Flash"].map((tip) => (
          <span key={tip} className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
            {tip}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
