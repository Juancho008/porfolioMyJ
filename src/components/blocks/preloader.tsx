"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MIN_DURATION = 1300;

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();

    const computeProgress = () => {
      const imgs = Array.from(document.images);
      const total = imgs.length || 1;
      const loaded = imgs.filter(
        (img) => img.complete && img.naturalWidth > 0
      ).length;
      return Math.round((loaded / total) * 100);
    };

    const interval = window.setInterval(() => {
      if (cancelled) return;
      setProgress((prev) => Math.max(prev, Math.min(computeProgress(), 96)));
    }, 110);

    const finish = () => {
      if (cancelled) return;
      window.clearInterval(interval);
      setProgress(100);
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(() => {
        if (!cancelled) setDone(true);
      }, wait + 420);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            scale: 1.04,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
        >
          {/* Glow ambiental */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-violet-700/20 blur-[120px]"
          />

          {/* Monograma */}
          <div
            className="relative flex items-baseline leading-none"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-medium tracking-[0.1em] text-white md:text-8xl"
            >
              M
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-[0.16em] -translate-y-[0.06em] text-5xl font-normal italic text-violet-300/90 md:text-7xl"
            >
              &amp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-medium tracking-[0.1em] text-white md:text-8xl"
            >
              J
            </motion.span>
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="mt-5 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-white/45 md:text-xs"
            style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
          >
            Marketing
            <span className="mx-1.5 inline-block text-[0.45rem] text-violet-400/70">
              ◆
            </span>
            Website
          </motion.p>

          {/* Barra de progreso */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "11rem" }}
            transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
            className="relative mt-10 h-px w-44 overflow-hidden bg-white/10"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 to-white"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Porcentaje */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 text-[0.65rem] font-medium tabular-nums tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
          >
            {progress.toString().padStart(2, "0")}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
