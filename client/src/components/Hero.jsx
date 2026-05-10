// ============================================================
// components/Hero.jsx — Landing hero section
// ============================================================
import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineArrowDown } from "react-icons/hi2";
import { TbTargetArrow, TbBrain, TbChartBar } from "react-icons/tb";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { icon: TbTargetArrow, value: "98%", label: "ATS Accuracy" },
  { icon: TbBrain, value: "Gemini AI", label: "Powered By" },
  { icon: TbChartBar, value: "10k+", label: "Resumes Analyzed" },
];

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 text-center" id="how-it-works">
      {/* Pill badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                   bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-sm font-medium"
      >
        <HiOutlineSparkles className="w-4 h-4 animate-pulse" />
        Powered by Google Gemini AI
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      </motion.div>

      {/* Main headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6"
      >
        Beat the ATS.
        <br />
        <span className="text-gradient">Land the Interview.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-10"
      >
        Upload your resume, paste the job description, and get an instant AI-powered
        ATS score, missing skills analysis, and personalized improvement suggestions
        — all in under 10 seconds.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <motion.a
          href="#analyze"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn-primary flex items-center gap-2 text-base"
        >
          <HiOutlineSparkles className="w-5 h-5" />
          Analyze My Resume
        </motion.a>
        <a
          href="#features"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-slate-400
                     hover:text-white border border-white/8 hover:border-white/20
                     bg-white/3 hover:bg-white/6 transition-all duration-300 text-sm font-medium"
        >
          See how it works
          <HiOutlineArrowDown className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.4}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        id="features"
      >
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center
                              group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300">
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-2xl text-white">{value}</span>
            </div>
            <span className="text-xs text-slate-500 uppercase tracking-widest">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative divider */}
      <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
