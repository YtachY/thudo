"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const hearts = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 20 + 10,
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 10,
}));

const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 3,
}));

const memories = [
  { year: "2020", title: "First Hello", desc: "The day everything changed..." },
  { year: "2021", title: "First Date", desc: "Nervous but perfect." },
  { year: "2022", title: "First 'I Love You'", desc: "Three words that changed everything." },
  { year: "2023", title: "Every Day Since", desc: "Building a lifetime of memories." },
  { year: "2024", title: "Forever Starts", desc: "The next chapter begins now." },
];

const sweetNotes = [
  { icon: "💖", title: "Your Smile", text: "It brightens even the darkest days." },
  { icon: "✨", title: "Your Laugh", text: "The sweetest sound in the world." },
  { icon: "🌹", title: "Your Heart", text: "Gentle, kind, and unconditionally loving." },
  { icon: "💫", title: "Your Eyes", text: "I could get lost in them forever." },
];

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-300/30"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            fontSize: heart.size,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}

function TwinklingStars() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GlowingText() {
  return (
    <motion.h1
      className="font-display text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-rose-400 animate-shimmer"
      style={{
        backgroundSize: "200% auto",
        backgroundImage: "linear-gradient(90deg, #fda4af, #fbcfe8, #fda4af, #f9a8d4, #fda4af)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      Do July me?
    </motion.h1>
  );
}

export default function Home() {
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen romantic-gradient overflow-hidden">
      <TwinklingStars />
      <FloatingHearts />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-rose-300"
          >
            <Heart className="w-16 h-16 md:w-24 md:h-24 mx-auto" fill="currentColor" />
          </motion.div>
        </motion.div>

        <GlowingText />

        <motion.p
          className="mt-6 font-serif text-xl md:text-3xl text-rose-100/90 max-w-2xl italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Every love story is beautiful, but ours is my favorite.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center gap-2 text-rose-200/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-display text-lg">Scroll to explore our story</span>
          <Sparkles className="w-5 h-5" />
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div className="w-6 h-10 rounded-full border-2 border-rose-300/50 flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 bg-rose-300/70 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Timeline */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-display text-5xl md:text-6xl text-center mb-16 text-rose-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-pink-300">Story</span>
          </motion.h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-400/50 via-pink-400/50 to-rose-400/50 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.year}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className="glass-card rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 group">
                      <span className="font-display text-4xl md:text-5xl text-pink-300 block mb-2 group-hover:animate-heart-beat">
                        {memory.year}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                        {memory.title}
                      </h3>
                      <p className="text-rose-100/80 font-serif italic">
                        {memory.desc}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-400 rounded-full border-4 border-white/20 shadow-lg shadow-rose-500/50 z-10" />

                  <div className="w-full md:w-5/12 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sweet Notes Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-display text-5xl md:text-6xl text-center mb-16 text-rose-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why I <span className="text-pink-300">Love</span> You
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sweetNotes.map((note, index) => (
              <motion.div
                key={note.title}
                className="glass-card rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300 cursor-default group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="text-5xl mb-4 block"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {note.icon}
                </motion.div>
                <h3 className="font-serif text-2xl text-white mb-3">{note.title}</h3>
                <p className="text-rose-100/80 font-serif italic leading-relaxed">
                  {note.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Heart Wall */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-display text-5xl md:text-6xl mb-8 text-rose-100"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            All My <span className="text-pink-300 animate-heart-beat inline-block">♥</span>
          </motion.h2>

          <motion.p
            className="font-serif text-xl md:text-2xl text-rose-100/90 mb-12 italic max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Click on the hearts to add some love to the wall
          </motion.p>

          <HeartWall />
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <Heart className="w-20 h-20 md:w-32 md:h-32 mx-auto text-rose-400 mb-8 animate-heart-beat" fill="currentColor" />
          </motion.div>

          <motion.h2
            className="font-display text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            You are my everything
          </motion.h2>

          <motion.p
            className="font-serif text-xl md:text-2xl text-rose-100/90 italic max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            And I would choose you in every lifetime, in every universe.
          </motion.p>

          <motion.div
            className="mt-12 flex items-center justify-center gap-3 text-rose-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <Star className="w-5 h-5" fill="currentColor" />
            <span className="font-display text-2xl">Forever & Always</span>
            <Star className="w-5 h-5" fill="currentColor" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 text-center border-t border-white/10">
        <p className="text-rose-200/60 font-display text-lg">
          Made with endless love, just for you ♥
        </p>
      </footer>
    </main>
  );
}

function HeartWall() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    };
    setHearts((prev) => [...prev.slice(-20), newHeart]);
  };

  return (
    <div className="relative h-96 w-full max-w-3xl mx-auto">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-400 cursor-pointer"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          whileHover={{ scale: 1.5 }}
          onClick={() => {
            setHearts((prev) => prev.filter((h) => h.id !== heart.id));
          }}
        >
          <Heart fill="currentColor" className="w-6 h-6" />
        </motion.div>
      ))}

      <AnimatePresence>
        {hearts.length === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-rose-300/50 font-serif italic text-lg">
              Tap where your heart feels most alive...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={addHeart}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full text-rose-200 hover:bg-white/20 transition-all font-display text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        + Spread Love
      </motion.button>
    </div>
  );
}
