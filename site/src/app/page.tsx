"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { load } from "js-yaml";
import { Heart } from "lucide-react";
import { BUILD_CONFIG, type SiteConfig } from "@/lib/config";
import HeartAnimation from "@/components/HeartAnimation";

const THEMES = {
  "midnight-rose": {
    name: "Midnight Rose",
    bg: "from-slate-950 via-rose-950 to-slate-950",
    text: "text-rose-100",
    accent: "text-rose-400",
    buttonYes: "bg-rose-500 hover:shadow-rose-500/50",
    buttonNo: "bg-white/10 border-white/20 text-rose-200",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 25%, #86198f 50%, #be185d 75%, #9d174d 100%)",
  },
  "ocean-breeze": {
    name: "Ocean Breeze",
    bg: "from-slate-950 via-cyan-950 to-slate-950",
    text: "text-cyan-100",
    accent: "text-cyan-400",
    buttonYes: "bg-cyan-500 hover:shadow-cyan-500/50",
    buttonNo: "bg-white/10 border-white/20 text-cyan-200",
    gradient: "linear-gradient(135deg, #082f49 0%, #0e7490 25%, #06b6d4 50%, #22d3ee 75%, #0891b2 100%)",
  },
  "forest-dawn": {
    name: "Forest Dawn",
    bg: "from-slate-950 via-emerald-950 to-slate-950",
    text: "text-emerald-100",
    accent: "text-emerald-400",
    buttonYes: "bg-emerald-500 hover:shadow-emerald-500/50",
    buttonNo: "bg-white/10 border-white/20 text-emerald-200",
    gradient: "linear-gradient(135deg, #022c22 0%, #064e3b 25%, #059669 50%, #10b981 75%, #047857 100%)",
  },
  "golden-hour": {
    name: "Golden Hour",
    bg: "from-slate-950 via-amber-950 to-slate-950",
    text: "text-amber-100",
    accent: "text-amber-400",
    buttonYes: "bg-amber-500 hover:shadow-amber-500/50",
    buttonNo: "bg-white/10 border-white/20 text-amber-200",
    gradient: "linear-gradient(135deg, #451a03 0%, #78350f 25%, #d97706 50%, #f59e0b 75%, #92400e 100%)",
  },
  "pastel-dreams": {
    name: "Pastel Dreams",
    bg: "from-pink-50 via-purple-50 to-indigo-50",
    text: "text-slate-700",
    accent: "text-pink-500",
    buttonYes: "bg-pink-400 hover:shadow-pink-400/50 text-white",
    buttonNo: "bg-white/60 border-pink-200 text-slate-600",
    gradient: "linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 25%, #e0e7ff 50%, #fce7f3 75%, #ede9fe 100%)",
  },
};

export default function Home() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [configError, setConfigError] = useState(false);
  const [theme, setTheme] = useState<keyof typeof THEMES>("midnight-rose");
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/config.yml")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load config");
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        const parsed = load(text) as Partial<SiteConfig>;
        const merged = { ...BUILD_CONFIG, ...parsed };
        setConfig(merged as SiteConfig);
        if (merged.theme && merged.theme in THEMES) {
          setTheme(merged.theme as keyof typeof THEMES);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setConfigError(true);
          setConfig(BUILD_CONFIG);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeConfig = config || BUILD_CONFIG;
  const themeData = THEMES[theme];
  const colors = activeConfig.particles.colors[theme] || BUILD_CONFIG.particles.colors[theme];
  const maxAttempts = activeConfig.maxAttempts;
  const caught = attempts >= maxAttempts;
  const fontSizes = activeConfig.fontSizes;

  const getRandomPosition = useCallback(
    (buttonWidth = 140, buttonHeight = 48) => {
      const container = containerRef.current;
      if (!container) return { x: 0, y: 0 };
      const rect = container.getBoundingClientRect();
      const maxX = Math.max(-rect.width / 2 + 20, rect.width / 2 - buttonWidth - 20);
      const maxY = Math.max(-rect.height / 2 + 20, rect.height / 2 - buttonHeight - 20);
      const x = (Math.random() - 0.5) * 2 * maxX * 1.5;
      const y = (Math.random() - 0.5) * 2 * maxY * 1.5;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    []
  );

  const evade = useCallback(() => {
    if (caught) return;
    setAttempts((prev) => {
      const next = prev + 1;
      if (next >= maxAttempts) {
        setNoPos({ x: 0, y: 0 });
      } else {
        setNoPos(getRandomPosition());
      }
      return next;
    });
  }, [caught, maxAttempts, getRandomPosition]);

  const handleYes = useCallback(() => {
    setSuccess(true);
  }, []);

  const reset = useCallback(() => {
    setSuccess(false);
    setAttempts(0);
    setNoPos({ x: 0, y: 0 });
  }, []);

  if (configError) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950">
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-4xl md:text-6xl text-rose-100 mb-4">Config Error</h1>
          <p className="text-rose-300/80 font-display">Using default settings. Check config.yml.</p>
        </div>
      </main>
    );
  }

  if (!config) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950">
        <div className="relative z-10 text-center px-6">
          <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-rose-200 font-display text-lg">Loading settings...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${themeData.bg} transition-colors duration-700`}
    >
      {success && <HeartAnimation colors={colors} />}

      {!success ? (
        <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 px-6 w-full max-w-xl mx-auto">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className={themeData.accent}
          >
            <Heart className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" />
          </motion.div>

          <h1 className={`font-display ${fontSizes.title} text-center ${themeData.text}`}>
            {activeConfig.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
            <motion.button
              onClick={handleYes}
              className={`w-full sm:w-auto px-8 py-3 rounded-full text-white font-display ${fontSizes.button} shadow-lg transition-shadow ${themeData.buttonYes}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeConfig.yesButtonText}
            </motion.button>

            <motion.button
              onMouseEnter={evade}
              onTouchStart={evade}
              onClick={caught ? handleYes : undefined}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-full sm:w-auto px-8 py-3 rounded-full font-display ${fontSizes.button} transition-colors ${themeData.buttonNo}`}
            >
              {activeConfig.noButtonText}
            </motion.button>
          </div>

          <p className={`text-sm md:text-base ${theme === "pastel-dreams" ? "text-slate-500" : "text-rose-300/70"} font-display`}>
            Attempts: {attempts} / {maxAttempts}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`px-4 py-2 rounded-full ${fontSizes.themeBox} font-display border transition-all ${
                  theme === key
                    ? "bg-white/20 border-white/40"
                    : "bg-white/5 border-white/10 opacity-60 hover:opacity-100"
                } ${themeData.text}`}
                style={{ backdropFilter: "blur(8px)" }}
              >
                {THEMES[key].name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.h1
            className={`font-display ${fontSizes.title} ${themeData.text}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {activeConfig.successTitle}
          </motion.h1>

          <motion.p
            className={`font-display ${fontSizes.subtitle} ${themeData.accent}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {activeConfig.successSubtitle}
          </motion.p>

          <motion.button
            onClick={reset}
            className="mt-4 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-display text-lg hover:bg-white/20 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Reset
          </motion.button>
        </motion.div>
      )}
    </main>
  );
}
