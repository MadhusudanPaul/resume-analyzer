// ============================================================
// components/ResultsDashboard.jsx — Results section layout
// ============================================================
import { motion } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { TbSparkles } from "react-icons/tb";
import ATSScoreCard from "./ATSScoreCard.jsx";
import MissingSkillsCard from "./MissingSkillsCard.jsx";
import SuggestionsCard from "./SuggestionsCard.jsx";

export default function ResultsDashboard({ result }) {
  const { atsScore, missingSkills, suggestions } = result;

  return (
    <section id="results" className="pb-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        {/* Success badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                     bg-green-500/10 border border-green-500/25 text-green-300 text-sm font-medium"
        >
          <HiOutlineCheckCircle className="w-4 h-4" />
          Analysis Complete
        </motion.div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
          Your <span className="text-gradient">Results</span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm">
          Here's a detailed breakdown of how your resume performs against this job description.
        </p>
      </motion.div>

      {/* ── Dashboard grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ATS Score — tall left card */}
        <div className="lg:col-span-1">
          <ATSScoreCard score={atsScore} />
        </div>

        {/* Right column stacked: Missing Skills + Suggestions */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MissingSkillsCard skills={missingSkills} />
          <SuggestionsCard suggestions={suggestions} />
        </div>
      </div>

      {/* ── Summary bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 glass-card p-5"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/25 flex items-center justify-center">
              <TbSparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="font-display font-semibold text-white text-sm">Quick Summary</p>
              <p className="text-xs text-slate-500">Based on Gemini's analysis</p>
            </div>
          </div>

          {/* Three mini stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-display font-bold text-xl text-white">{atsScore}%</p>
              <p className="text-xs text-slate-500">ATS Match</p>
            </div>
            <div className="w-px h-8 bg-white/8" />
            <div className="text-center">
              <p className="font-display font-bold text-xl text-red-400">{missingSkills.length}</p>
              <p className="text-xs text-slate-500">Skills Gap</p>
            </div>
            <div className="w-px h-8 bg-white/8" />
            <div className="text-center">
              <p className="font-display font-bold text-xl text-indigo-400">{suggestions.length}</p>
              <p className="text-xs text-slate-500">Suggestions</p>
            </div>
          </div>

          {/* Re-analyze hint */}
          <a
            href="#analyze"
            className="text-xs text-slate-500 hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400/50"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑ Analyze another resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}
