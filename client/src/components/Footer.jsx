// ============================================================
// components/Footer.jsx
// ============================================================
import { TbBrain } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center">
              <TbBrain className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              Resume<span className="text-gradient">IQ</span>
            </span>
          </div>

          {/* Credits */}
          <p className="text-xs text-slate-600 text-center">
            Built with React, Vite, Tailwind CSS &amp; Google Gemini · For educational use
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#analyze" className="hover:text-slate-400 transition-colors">Analyze</a>
            <span className="text-white/10">·</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <span className="text-white/10">·</span>
            <a href="#" className="hover:text-slate-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
