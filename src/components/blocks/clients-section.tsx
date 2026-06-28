"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const clients = [
  { name: "Mascotas en Camino", sector: "Servicios para mascotas", initial: "MC" },
  { name: "MA - Beauty Business", sector: "Belleza y estética", initial: "MA" },
  { name: "SV - Descargas", sector: "Descargas digitales", initial: "SV" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function ClientCard({
  client,
  index,
}: {
  client: (typeof clients)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.4,
    margin: "0px 0px -40px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(10px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 40, scale: 0.92, filter: "blur(10px)" }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: easeOut,
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group flex cursor-default flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-950/60 px-5 py-6 text-center transition-colors hover:border-neutral-600 hover:bg-neutral-900/80"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/30 to-blue-600/20 text-sm font-bold text-white ring-1 ring-neutral-700 transition-all group-hover:from-violet-600/50 group-hover:to-blue-600/40">
        {client.initial}
      </div>
      <h3 className="text-sm font-semibold text-white sm:text-base">
        {client.name}
      </h3>
      <p className="mt-1 text-[11px] text-neutral-500 sm:text-xs">
        {client.sector}
      </p>
    </motion.div>
  );
}

export function ClientsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, {
    once: false,
    amount: 0.5,
    margin: "0px 0px -60px 0px",
  });

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="pointer-events-none absolute left-[15%] top-[30%] h-48 w-48 rounded-full bg-violet-900/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[20%] right-[10%] h-36 w-36 rounded-full bg-blue-900/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
          animate={
            isHeaderInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 48, filter: "blur(12px)" }
          }
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-14 text-center md:mb-16"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Nuestros clientes
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Empresas y emprendedores que confiaron en M&amp;J para llevar su
            marca al siguiente nivel digital.
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          {clients.map((client, index) => (
            <ClientCard key={client.name} client={client} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
          className="mt-14 text-center text-sm text-neutral-500"
        >
          ¿Querés ser el próximo?{" "}
          <a
            href="mailto:contacto@myj.com"
            className="cursor-pointer text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Hablemos de tu proyecto
          </a>
        </motion.p>
      </div>
    </section>
  );
}
