// ============================================================
// App.jsx — Root component with global layout & providers
// ============================================================
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import UploadSection from "./components/UploadSection.jsx";
import ResultsDashboard from "./components/ResultsDashboard.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // ── Shared state lifted to App so Upload & Results can share it ──
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    // noise-overlay adds a subtle film-grain texture to the whole page
    <div className="relative min-h-screen bg-surface-900 noise-overlay">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-600/4 blur-[100px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-60" />
        {/* Top radial glow */}
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(13,19,33,0.95)",
            color: "#e2e8f0",
            border: "1px solid rgba(34,211,238,0.2)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#22d3ee", secondary: "#080c14" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#080c14" } },
        }}
      />

      {/* Main layout */}
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />

          {/* Upload + Analysis form */}
          <UploadSection
            onResult={setAnalysisResult}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />

          {/* Results appear below after analysis */}
          {analysisResult && (
            <ResultsDashboard result={analysisResult} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
