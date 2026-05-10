// ============================================================
// components/ATSScoreCard.jsx — Animated ATS score ring card
// ============================================================
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TbTargetArrow } from "react-icons/tb";

/**
 * Returns color based on score range:
 * 80–100 → green, 60–79 → cyan, 40–59 → amber, 0–39 → red
 */
function getScoreTheme(score) {
  if (score >= 80) return { stroke: "#22c55e", glow: "rgba(34,197,94,0.3)", text: "text-green-400", label: "Excellent", bg: "bg-green-500/10 border-green-500/25" };
  if (score >= 60) return { stroke: "#22d3ee", glow: "rgba(34,211,238,0.3)", text: "text-cyan-400",  label: "Good", bg: "bg-cyan-500/10 border-cyan-500/25" };
  if (score >= 40) return { stroke: "#f59e0b", glow: "rgba(245,158,11,0.3)",  text: "text-amber-400", label: "Fair", bg: "bg-amber-500/10 border-amber-500/25" };
  return { stroke: "#ef4444", glow: "rgba(239,68,68,0.3)", text: "text-red-400", label: "Needs Work", bg: "bg-red-500/10 border-red-500/25" };
}

export default function ATSScoreCard({ score }) {
  const [displayScore, setDisplayScore] = useState(0);
  const theme = getScoreTheme(score);

  // Animate the number counter
  useEffect(() => {
    let start = 0;
    const step = score / 60; // 60 frames ~1s
    const timer = setInterval(() => {
      start += step;
      if (start >= score) { setDisplayScore(score); clearInterval(timer); }
      else setDisplayScore(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  // SVG ring math
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 flex flex-col items-center text-center"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 self-start">
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${theme.bg}`}>
          <TbTargetArrow className={`w-4 h-4 ${theme.text}`} />
        </div>
        <div className="text-left">
          <p className="font-display font-semibold text-white text-sm">ATS Score</p>
          <p className="text-xs text-slate-500">Keyword match rate</p>
        </div>
      </div>

      {/* Animated ring */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow filter */}
        <svg width={0} height={0}>
          <defs>
            <filter id="glow-ring">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth}
          />
          {/* Animated progress arc */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            filter="url(#glow-ring)"
            style={{ filter: `drop-shadow(0 0 8px ${theme.stroke})` }}
          />
        </svg>

        {/* Center score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display font-extrabold text-4xl ${theme.text}`}>
            {displayScore}
          </span>
          <span className="text-slate-500 text-xs font-mono mt-0.5">/ 100</span>
        </div>
      </div>

      {/* Score label */}
      <div className="mt-5 space-y-2 w-full">
        <span className={`inline-block px-4 py-1.5 rounded-lg text-sm font-semibold font-display border ${theme.bg} ${theme.text}`}>
          {theme.label} Match
        </span>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${theme.stroke}88, ${theme.stroke})` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600 font-mono">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      {/* Insight */}
      <p className="mt-4 text-xs text-slate-500 text-center leading-relaxed">
        {score >= 80
          ? "Your resume strongly matches this position. Great job!"
          : score >= 60
          ? "Good match! Adding missing skills could push you higher."
          : score >= 40
          ? "Fair match. Review the suggestions to improve your score."
          : "Low match. Tailor your resume closely to this job description."}
      </p>
    </motion.div>
  );
}
