"use client";

import React from "react";
import { HeroParallax } from "@/components/blocks/hero-parallax";
import { AboutLearnSection } from "@/components/blocks/about-learn-section";
import { PricingSection } from "@/components/blocks/pricing-section";
import { ClientsSection } from "@/components/blocks/clients-section";
import { ScrollIndicator } from "@/components/blocks/scroll-indicator";
import { SiteBrand } from "@/components/blocks/site-brand";
import { SiteFooter } from "@/components/blocks/site-footer";
import { products } from "@/components/hero-parallax-products";

export function HeroParallaxDemo() {
  return (
    <div className="w-full bg-black">
      <SiteBrand />
      <ScrollIndicator />
      <main>
        <HeroParallax products={products} />
        <AboutLearnSection />
        <PricingSection />
        <ClientsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
