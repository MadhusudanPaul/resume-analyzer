// ============================================================
// components/Navbar.jsx — Sticky glassy navigation bar
// ============================================================
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbBrain } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Analyze", href: "#analyze" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface-900/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/25">
              <TbBrain className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Resume<span className="text-gradient">IQ</span>
            </span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#analyze"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-display
                         bg-gradient-to-r from-cyan-500/20 to-indigo-500/20
                         border border-cyan-500/30 text-cyan-300
                         hover:from-cyan-500/30 hover:to-indigo-500/30 hover:border-cyan-400/50 hover:text-white
                         transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <HiOutlineSparkles className="w-4 h-4" />
              Analyze Free
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RxCross2 className="w-5 h-5" /> : <RxHamburgerMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 py-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#analyze"
              className="mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-display
                         bg-gradient-to-r from-cyan-500/20 to-indigo-500/20
                         border border-cyan-500/30 text-cyan-300 text-center justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <HiOutlineSparkles className="w-4 h-4" />
              Analyze Free
            </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
