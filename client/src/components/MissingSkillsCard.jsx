// ============================================================
// components/MissingSkillsCard.jsx — Missing keywords/skills
// ============================================================
import { motion } from "framer-motion";
import { HiOutlinePuzzlePiece, HiOutlineXCircle } from "react-icons/hi2";

export default function MissingSkillsCard({ skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center">
            <HiOutlinePuzzlePiece className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm">Missing Skills</p>
            <p className="text-xs text-slate-500">Keywords not found in your resume</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-semibold">
          {skills.length}
        </span>
      </div>

      {/* Skills grid */}
      {skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-3">
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-sm font-medium text-green-400">No missing skills!</p>
          <p className="text-xs text-slate-500 mt-1">Your resume covers all required keywords.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="skill-tag"
              >
                <HiOutlineXCircle className="w-3.5 h-3.5 opacity-70" />
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Action tip */}
          <div className="mt-4 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
            <p className="text-xs text-amber-300/80 leading-relaxed">
              <span className="font-semibold text-amber-300">Pro tip:</span> Naturally incorporate these keywords into your
              experience bullet points and skills section to improve your ATS score.
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}
