"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { siteConfig, whatsappUrl } from "@/lib/site";

const packages = [
  {
    name: "Demo",
    price: "Gratis",
    currency: null,
    period: "sin compromiso",
    description:
      "Probá nuestro trabajo sin costo ni obligación de contratar.",
    features: [
      "Documentacion de la web",
      "Vista previa en 72 horas",
      "Paleta de colores y tipografía",
      "Reunión de presentación",
      "Sin compromiso",
      "Diseño flyer o cartel de marca de prueba",
    ],
    cta: "Pedir demo",
    isDemo: true,
    highlighted: false,
  },
  {
    name: "Esencial",
    price: "$300.000",
    currency: "ARS",
    period: "Pago Mensual",
    description:
      "Presencia digital profesional para emprendedores y negocios nuevos.",
    features: [
      "Página web de 2 secciones básica de nuestra plantilla",
      "2 Flyer Semanales",
      "Dominio y hosting",
      "Entrega en 10–15 días 8hs",
      "Soporte 15 días",
      "Panel de control",
      "Posicionamiento en Google",
      "Gestion de redes sociales",
      "1 Video Promocional Mensual",
    ],
    cta: "Elegir plan",
    isDemo: false,
    highlighted: false,
  },
  {
    name: "Profesional",
    price: "$750.000",
    currency: "ARS",
    period: "Pago Mensual",
    description:
      "Web completa y estrategia digital para empresas en crecimiento.",
    features: [
      "Diseño UI/UX personalizado",
      "Pagina Web 3D",
      "Base de datos de clientes",
      "5 Videos Promocionales Mensuales",
      "4 Flyers Semanales",
      "Flyer de dia del padre, madre, navidad, etc",
      "Diseño de logo o marca",
      "Redes sociales integradas",
      "Soporte 12hs",
      "Todo lo incluido en el anterior plan"
    ],
    cta: "Elegir plan",
    isDemo: false,
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$-",
    currency: "ARS",
    period: "pago único",
    description:
      "Solución integral con tecnología avanzada y marketing continuo.",
    features: [
      "IA Whatsapp que responde preguntas y atiende consultas",
      "Panel de control para gestionar el negocio personalizado",
      "Base de datos de clientes personalizada",
      "Modificaciones de la web a medida semanales",
      "Soporte 24hs",
      "Soporte a clientes a traves de whatsapp",
      "Mail de bienvenida y seguimiento de compra",
      "Mail de confirmacion de compra",
      "Mail de promociones y noticias",
      "Todo lo incluido en el anterior plan",
    ],
    cta: "Elegir plan",
    isDemo: false,
    highlighted: false,
  },
];

function buildWhatsappLink(pkg: (typeof packages)[number]) {
  const message = pkg.isDemo
    ? "¡Hola M&J! Me gustaría pedir una *demo* sin compromiso. ¿Cómo seguimos?"
    : `¡Hola M&J! Me interesa el plan *${pkg.name}* (${pkg.price}${
        pkg.currency ? ` ${pkg.currency}` : ""
      }). ¿Me dan más información?`;
  return whatsappUrl(message);
}

const easeOut = [0.16, 1, 0.3, 1] as const;

const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: easeOut },
  },
};

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PricingCard({
  pkg,
}: {
  pkg: (typeof packages)[number];
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.35,
    margin: "0px 0px -40px 0px",
  });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 72, scale: 0.9, rotateX: 8, filter: "blur(12px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 72, scale: 0.9, rotateX: 8, filter: "blur(12px)" }
      }
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 16,
        mass: 0.9,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      className={`relative flex min-w-0 flex-col rounded-2xl border p-5 transition-shadow duration-500 sm:p-6 [transform-style:preserve-3d] ${
        pkg.highlighted
          ? "border-violet-500/50 bg-neutral-900/80 shadow-2xl shadow-violet-900/20"
          : pkg.isDemo
            ? "border-emerald-500/40 bg-neutral-950/60 hover:border-emerald-500/60"
            : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-700"
      }`}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-violet-600 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Más popular
        </span>
      )}
      {pkg.isDemo && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Sin costo
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {pkg.name}
        </h3>
        <p className="mt-2 text-pretty text-xs leading-snug text-neutral-400 sm:text-[13px]">
          {pkg.description}
        </p>
      </div>

      <div className="mb-5 border-b border-neutral-800/80 pb-5">
        <p
          className={`font-bold leading-none tracking-tight text-white ${
            pkg.isDemo ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {pkg.price}
        </p>
        <p className="mt-1.5 text-[11px] text-neutral-500 sm:text-xs">
          {pkg.currency ? `${pkg.currency} · ${pkg.period}` : pkg.period}
        </p>
      </div>

      <ul className="mb-5 flex flex-1 flex-col gap-2">
        {pkg.features.map((feature, index) => (
          <li
            key={`${pkg.name}-${index}`}
            className="flex items-start gap-2 text-[11px] leading-snug text-neutral-300 sm:text-xs"
          >
            <CheckIcon />
            <span className="min-w-0 break-words text-pretty">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={buildWhatsappLink(pkg)}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full cursor-pointer rounded-lg px-3 py-2.5 text-center text-xs font-semibold transition-all duration-300 sm:text-sm ${
          pkg.highlighted
            ? "bg-violet-600 text-white hover:bg-violet-500"
            : pkg.isDemo
              ? "border border-emerald-600 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white"
              : "border border-neutral-700 bg-transparent text-white hover:border-neutral-500 hover:bg-neutral-900"
        }`}
      >
        {pkg.cta}
      </a>
    </motion.article>
  );
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  const isHeaderInView = useInView(headerRef, {
    once: false,
    amount: 0.5,
    margin: "0px 0px -60px 0px",
  });

  const isFooterInView = useInView(footerRef, {
    once: false,
    amount: 0.5,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.4, 1, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.45], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-20"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-violet-900/20 blur-3xl" />
        <div className="absolute bottom-[15%] right-[12%] h-32 w-32 rounded-full bg-blue-900/20 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative mx-auto max-w-7xl"
      >
        <motion.div
          ref={headerRef}
          variants={headerContainerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="mb-16 text-center md:mb-20"
        >
          <motion.p
            variants={headerItemVariants}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500"
          >
            Paquetes
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Planes diseñados
            <br />
            para tu negocio
          </motion.h2>
          <motion.p
            variants={headerItemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            Elige el paquete que mejor se adapte a tus objetivos. Todos incluyen
            diseño moderno, código optimizado y acompañamiento de nuestro equipo
            en M&amp;J.
          </motion.p>
          <motion.div
            variants={headerItemVariants}
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <PricingCard key={pkg.name} pkg={pkg} />
          ))}
        </div>

        <motion.p
          ref={footerRef}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={
            isFooterInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-12 text-center text-sm text-neutral-500"
        >
          ¿Necesitas algo a medida?{" "}
          <a
            href={whatsappUrl(
              "¡Hola M&J! Necesito una cotización personalizada. ¿Me ayudan?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Contáctanos para una cotización personalizada
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
