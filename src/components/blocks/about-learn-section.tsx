"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80",
    alt: "Equipo colaborando con laptops",
    className: "top-0 left-[28%] w-[52%] z-20",
    parallax: 40,
    delay: 0.15,
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&q=80",
    alt: "Personas aprendiendo juntas",
    className: "top-[38%] left-0 w-[48%] z-10",
    parallax: 25,
    delay: 0.3,
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&q=80",
    alt: "Estudiantes revisando material en tablet",
    className: "top-[18%] right-0 w-[44%] z-30",
    parallax: 55,
    delay: 0.45,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
};

function GalleryImage({
  src,
  alt,
  className,
  parallax,
  delay,
}: {
  src: string;
  alt: string;
  className: string;
  parallax: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
    margin: "0px 0px -40px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div ref={ref} style={{ y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 60, filter: "blur(10px)" }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.88, y: 60, filter: "blur(10px)" }
        }
        transition={{ duration: 1, delay, ease: easeOut }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
      >
        <motion.div
          animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{
            duration: 5 + delay * 2,
            repeat: isInView ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900 shadow-2xl shadow-black/50"
        >
          <Image
            src={src}
            alt={alt}
            width={600}
            height={450}
            sizes="(max-width: 768px) 80vw, 400px"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function AboutLearnSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, {
    once: false,
    amount: 0.4,
    margin: "0px 0px -60px 0px",
  });

  return (
    <section className="relative -mt-[72vh] overflow-hidden bg-black px-6 pb-16 pt-6 md:-mt-[25vh] md:px-12 md:py-32 lg:px-20">
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-28 w-28 rounded-full bg-blue-900/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[6%] h-16 w-16 rounded-2xl bg-violet-900/40 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 md:gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate={isTextInView ? "visible" : "hidden"}
          className="max-w-xl"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.25rem]"
          >
            Nuestros clientes
            <br />
            confían en nosotros
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="mt-8 text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            En M&amp;J trabajamos junto a empresas y emprendedores para crear
            soluciones digitales que generan resultados reales. Nuestro
            compromiso con la calidad, la innovación y la atención
            personalizada nos permite construir relaciones duraderas con
            clientes satisfechos.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto h-[420px] w-full max-w-lg md:h-[480px] lg:mx-0 lg:max-w-none">
          {galleryImages.map((image) => (
            <GalleryImage key={image.src} {...image} />
          ))}
        </div>
      </div>
    </section>
  );
}
