"use client";

import { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Home() {
  const [answered, setAnswered] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noRef = useRef<HTMLButtonElement>(null);

  const getRandomPosition = () => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 200;
    return { x, y };
  };

  const moveNoButton = () => {
    setNoButtonPos(getRandomPosition());
  };

  const handleYes = () => {
    setAnswered(true);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950">
      {!answered ? (
        <motion.div
          className="relative z-10 flex flex-col items-center gap-12 px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-rose-400"
          >
            <Heart className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl text-center text-rose-100">
            Do July me?
          </h1>

          <div className="flex items-center gap-6">
            <motion.button
              onClick={handleYes}
              className="relative px-8 py-3 rounded-full bg-rose-500 text-white font-display text-xl md:text-2xl shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes
            </motion.button>

            <motion.button
              ref={noRef}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-rose-200 font-display text-xl md:text-2xl hover:bg-white/20 transition-colors"
            >
              No, July you?
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.div
            className="text-rose-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 md:w-32 md:h-32" fill="currentColor" />
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl text-rose-100"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Yes. I do.
          </motion.h1>

          <motion.p
            className="font-display text-xl md:text-2xl text-rose-300/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Forever & always ♥
          </motion.p>

          <Confetti />
        </motion.div>
      )}
    </main>
  );
}

function Confetti() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: (i * 2.3) % 100,
        size: 4 + (i * 1.7) % 8,
        duration: 2 + (i * 0.3) % 2,
        delay: (i * 0.2) % 1.5,
        drift: ((i * 3.1) % 200) - 100,
        color: ["#fda4af", "#fbcfe8", "#f9a8d4", "#fb7185"][i % 4],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, "-100vh"],
            x: [0, p.drift],
            opacity: [1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
