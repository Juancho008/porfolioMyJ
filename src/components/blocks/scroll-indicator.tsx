"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function ScrollIndicator() {
  const { scrollY, scrollYProgress } = useScroll();
  const opacity = useTransform(scrollY, [0, 80, 400], [1, 1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <>
      {/* Barra de progreso lateral */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none fixed right-3 top-1/2 z-50 hidden h-24 w-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-neutral-800 md:block"
      >
        <motion.div
          className="w-full origin-top rounded-full bg-violet-500"
          style={{ scaleY: scrollYProgress }}
        />
      </motion.div>

      {/* Indicador principal — fijo en viewport */}
      <motion.div
        style={{ opacity, scale }}
        className="pointer-events-none fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="rounded-full border border-neutral-700/80 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-300 backdrop-blur-sm md:text-xs">
          Deslizá para explorar
        </span>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-[22px] items-start justify-center rounded-full border-2 border-neutral-400/70 p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-white"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5"
        >
          <svg
            className="h-4 w-4 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="h-4 w-4 -mt-2 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
