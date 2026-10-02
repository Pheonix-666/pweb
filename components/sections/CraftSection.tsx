"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Cpu, Camera, Film, Layers, ArrowUpRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function CraftSection() {
  const [activeGearTab, setActiveGearTab] = useState(0);

  return (
    <section id="craft" className="py-16 sm:py-24 md:py-36 border-b border-hairline bg-background relative select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-hairline">
          <div className="max-w-[65ch]">
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-2 sm:mb-4 flex items-center gap-2">
              <span className="text-muted">[ 02 ]</span> STUDIO CAPABILITIES & DISCIPLINE
            </div>
            <h2 className="font-serif heading-display-lg text-primary">
              Crafted with <span className="italic text-tungsten font-light">Precision</span> & Artistry.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-[65ch] font-light leading-relaxed">
            Every production is engineered with Hollywood-standard capture protocols, calibrated color management, and pristine optical glass.
          </p>
        </div>

        {/* 3 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 sm:mt-16">
          {siteConfig.services.map((service) => (
            <div
              key={service.id}
              className="border border-hairline bg-surface p-6 md:p-8 flex flex-col justify-between hover:border-tungsten transition-colors group relative rounded-sm shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <span className="font-mono text-sm text-tungsten font-semibold">{service.number}</span>
                  <span className="timecode-badge text-[10px] uppercase">DISCIPLINE</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-primary group-hover:text-tungsten transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted leading-relaxed font-light max-w-[65ch]">
                  {service.description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-3 pt-4 border-t border-hairline">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-tungsten font-semibold">
                    TECHNICAL CAPABILITIES
                  </div>
                  <ul className="space-y-2">
                    {service.capabilities.map((cap, i) => (
                      <li key={i} className="text-xs text-primary/90 flex items-start gap-2">
                        <span className="text-tungsten font-mono text-[11px]">›</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deliverables summary */}
              <div className="mt-8 pt-4 border-t border-hairline bg-elevated/60 -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 rounded-b-sm">
                <div className="font-mono text-[10px] text-tungsten uppercase tracking-widest mb-1 font-semibold">
                  DELIVERY STANDARDS
                </div>
                <div className="text-xs font-mono text-muted">
                  {service.deliverables.join(" · ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Production Packages */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-hairline">
          <div className="text-center max-w-[65ch] mx-auto mb-10 sm:mb-16 space-y-4">
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase">
              {"// PRODUCTION PACKAGES"}
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-primary">
              Standardized <span className="italic text-tungsten font-light">Commission</span> Tiers.
            </h3>
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed max-w-[65ch] mx-auto">
              Transparent workflows tailored for commercial campaigns, luxury weddings, and post finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {siteConfig.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 md:p-8 flex flex-col justify-between border rounded-sm ${
                  pkg.featured
                    ? "bg-elevated border-tungsten/80 relative shadow-2xl"
                    : "bg-surface border-hairline"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 right-6 bg-tungsten text-background font-mono text-[10px] uppercase tracking-widest px-3 py-0.5 font-bold rounded-sm shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-hairline pb-4">
                    <span className="font-semibold text-primary">{pkg.tier}</span>
                    <span className="text-tungsten font-medium">{pkg.timeline}</span>
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl text-primary mb-2">{pkg.name}</h4>
                    <p className="text-xs text-muted leading-relaxed font-light max-w-[65ch]">{pkg.description}</p>
                  </div>

                  <div className="font-mono text-xs text-primary/90 bg-background/80 p-4 border border-hairline rounded-sm">
                    <span className="text-muted block text-[10px] uppercase tracking-wider mb-1 font-semibold">TARGET PRODUCTION:</span>
                    {pkg.idealFor}
                  </div>

                  {/* Included items */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-[10px] text-tungsten uppercase tracking-widest font-semibold">
                      INCLUDED DELIVERABLES:
                    </div>
                    <ul className="space-y-2">
                      {pkg.deliverables.map((item, i) => (
                        <li key={i} className="text-xs text-primary/90 flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-tungsten flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`mt-8 w-full flex items-center justify-center gap-2 py-4 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm ${
                    pkg.featured
                      ? "bg-tungsten hover:bg-tungsten-hover text-background font-bold shadow-lg"
                      : "bg-elevated hover:bg-primary hover:text-background text-primary border border-hairline font-semibold"
                  }`}
                  data-cursor="hover"
                >
                  <span>Book This Tier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Gear Kit / Technical Arsenal */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-hairline">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
            <div className="max-w-[65ch]">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-2">
                {"// STUDIO ARSENAL"}
              </div>
              <h3 className="font-serif text-3xl text-primary">
                The Master <span className="italic text-tungsten font-light">Kit</span> & Hardware.
              </h3>
            </div>

            {/* Gear Category Switcher */}
            <div className="flex flex-wrap gap-2">
              {siteConfig.gearKit.map((gear, idx) => (
                <button
                  key={gear.category}
                  onClick={() => setActiveGearTab(idx)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-colors rounded-sm ${
                    activeGearTab === idx
                      ? "bg-tungsten text-background border-tungsten font-bold"
                      : "bg-surface text-muted border-hairline hover:border-tungsten hover:text-primary"
                  }`}
                  data-cursor="hover"
                >
                  {gear.category.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Gear Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {siteConfig.gearKit[activeGearTab].items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 border border-hairline bg-surface space-y-2 hover:border-hairline-light transition-colors rounded-sm"
              >
                <div className="font-mono text-[10px] text-tungsten uppercase tracking-wider font-semibold">
                  {item.role}
                </div>
                <div className="font-sans font-medium text-sm text-primary">
                  {item.name}
                </div>
                <div className="font-mono text-xs text-muted leading-relaxed">
                  {item.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
