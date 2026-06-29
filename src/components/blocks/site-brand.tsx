"use client";

export function SiteBrand() {
  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-50 md:right-8 md:top-6"
      aria-label="M&J Marketing Website"
    >
      <div className="flex flex-col items-end">
        {/* Monograma principal */}
        <div
          className="flex items-baseline justify-end leading-none [text-shadow:0_0_40px_rgba(255,255,255,0.12)]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-[1.65rem] font-medium tracking-[0.13em] text-white md:text-[2.15rem]">
            M
          </span>
          <span className="mx-[0.18em] -translate-y-[0.06em] text-[1.35rem] font-normal italic text-violet-300/90 md:text-[1.75rem]">
            &amp;
          </span>
          <span className="text-[1.65rem] font-medium tracking-[0.13em] text-white md:text-[2.15rem]">
            J
          </span>
        </div>

        {/* Línea decorativa */}
        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-px w-9 bg-gradient-to-l from-violet-400/80 via-white/25 to-transparent md:w-11" />
          <span className="h-[3px] w-[3px] rotate-45 bg-violet-400/90 shadow-[0_0_6px_rgba(167,139,250,0.5)]" />
        </div>

        {/* Subtítulo */}
        <p
          className="mt-2.5 text-[0.58rem] font-medium uppercase leading-none tracking-[0.38em] text-white/50 md:text-[0.68rem] md:tracking-[0.42em]"
          style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
        >
          Marketing
          <span className="mx-1.5 inline-block text-[0.45rem] text-violet-400/70">
            ◆
          </span>
          Website
        </p>
      </div>
    </div>
  );
}
