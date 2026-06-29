"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

const ROW_CLASS =
  "flex h-48 min-h-48 mb-8 shrink-0 items-center gap-4 md:h-96 md:min-h-96 md:mb-16 md:space-x-20 md:gap-0";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function MarqueeRow({
  products,
  reverse = false,
  duration = 45,
}: {
  products: { title: string; link: string; thumbnail: string }[];
  reverse?: boolean;
  duration?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const track = [...products, ...products];

  return (
    <div className="overflow-hidden md:hidden">
      <motion.div
        className="flex w-max gap-4"
        animate={
          reducedMotion
            ? { x: 0 }
            : { x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration, repeat: Infinity, ease: "linear" }
        }
      >
        {track.map((product, index) => (
          <ProductCard
            key={`marquee-${index}`}
            product={product}
            mobile
          />
        ))}
      </motion.div>
    </div>
  );
}

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [12, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [12, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 350]),
    springConfig
  );

  return (
    <section
      ref={ref}
      className="relative flex h-[250vh] flex-col self-auto overflow-hidden py-16 antialiased md:h-[300vh] md:py-40 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="flex flex-col"
      >
        {/* Mobile: carrusel horizontal automático + parallax al scrollear */}
        <div className="flex flex-col gap-2 md:hidden">
          <MarqueeRow products={firstRow} reverse duration={38} />
          <MarqueeRow products={secondRow} duration={46} />
          <MarqueeRow products={thirdRow} reverse duration={42} />
        </div>

        {/* Desktop: parallax con scroll horizontal */}
        <motion.div
          className={`${ROW_CLASS} hidden flex-row-reverse space-x-reverse md:flex`}
        >
          {firstRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`row1-${index}`}
            />
          ))}
        </motion.div>
        <motion.div className={`${ROW_CLASS} hidden flex-row md:flex`}>
          {secondRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`row2-${index}`}
            />
          ))}
        </motion.div>
        <motion.div
          className={`${ROW_CLASS} hidden flex-row-reverse space-x-reverse md:flex`}
        >
          {thirdRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`row3-${index}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Header = () => {
  return (
    <div className="relative top-0 left-0 z-10 mx-auto w-full max-w-7xl px-4 py-10 md:py-20 lg:py-40">
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        Impulsamos tu <br /> presencia digital
      </h1>
      <p className="mt-4 max-w-2xl text-sm md:mt-8 md:text-xl dark:text-neutral-200">
        En M&J desarrollamos sitios web modernos, estrategias de marketing
        digital y soluciones tecnológicas diseñadas para hacer crecer tu
        negocio. Combinamos creatividad, diseño y tecnología para transformar
        ideas en resultados.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  mobile = false,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate?: MotionValue<number>;
  mobile?: boolean;
}) => {
  return (
    <motion.div
      style={translate ? { x: translate } : undefined}
      whileHover={mobile ? undefined : { y: -20 }}
      className={
        mobile
          ? "group/product relative h-44 w-64 min-h-44 min-w-64 shrink-0 sm:h-48 sm:w-72"
          : "group/product relative h-96 w-[30rem] min-h-96 min-w-[30rem] shrink-0"
      }
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative block w-full overflow-hidden group-hover/product:shadow-2xl ${
          mobile ? "h-44 sm:h-48" : "h-96"
        }`}
      >
        <img
          src={product.thumbnail}
          height={600}
          width={600}
          className="absolute inset-0 h-full w-full object-cover object-top"
          alt={product.title}
        />
      </a>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80" />
      <h2
        className={`absolute bottom-3 left-3 text-white opacity-0 group-hover/product:opacity-100 ${
          mobile ? "text-xs" : "bottom-4 left-4"
        }`}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};
