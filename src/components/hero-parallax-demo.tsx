"use client";

import React from "react";
import { HeroParallax } from "@/components/blocks/hero-parallax";
import { AboutLearnSection } from "@/components/blocks/about-learn-section";
import { PricingSection } from "@/components/blocks/pricing-section";
import { ClientsSection } from "@/components/blocks/clients-section";
import { products } from "@/components/hero-parallax-products";

export function HeroParallaxDemo() {
  return (
    <div className="w-full bg-black">
      <HeroParallax products={products} />
      <AboutLearnSection />
      <PricingSection />
      <ClientsSection />
    </div>
  );
}
