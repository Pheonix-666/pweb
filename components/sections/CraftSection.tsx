"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Cpu, Camera, Film, Layers, ArrowUpRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function CraftSection() {
  const [activeGearTab, setActiveGearTab] = useState(0);

  return (
    <section id="craft" className="py-24 md:py-36 border-b border-hairline relative">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div>
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="text-muted">[ 02 ]</span> STUDIO CAPABILITIES & DISCIPLINE
            </div>
            <h2 className="font-serif heading-display-lg text-primary">
              Crafted with <span className="italic text-tungsten font-light">Precision</span> & Artistry.
            </h2>
          </div>
          <p className="text-sm text-muted max-w-md font-light">
            Every production is engineered with Hollywood-standard capture protocols, calibrated color management, and pristine optical glass.
          </p>
        </div>

        {/* 3 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {siteConfig.services.map((service, idx) => (
            <div
              key={service.id}
              className="border border-hairline bg-surface p-7 md:p-8 flex flex-col justify-between hover:border-tungsten transition-colors group relative"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <span className="font-mono text-sm text-tungsten">{service.number}</span>
                  <span className="timecode-badge text-[10px] uppercase">DISCIPLINE</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-primary group-hover:text-tungsten transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-2 pt-4 border-t border-hairline">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    TECHNICAL CAPABILITIES
                  </div>
                  <ul className="space-y-1.5">
                    {service.capabilities.map((cap, i) => (
                      <li key={i} className="text-xs text-primary/80 flex items-start gap-2">
                        <span className="text-tungsten font-mono text-[11px]">›</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deliverables summary */}
              <div className="mt-8 pt-4 border-t border-hairline bg-elevated/50 -mx-7 -mb-7 md:-mx-8 md:-mb-8 p-5">
                <div className="font-mono text-[10px] text-tungsten uppercase tracking-widest mb-1.5">
                  DELIVERY STANDARDS
                </div>
                <div className="text-[11px] font-mono text-muted">
                  {service.deliverables.join(" · ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Production Packages */}
        <div className="mt-24 pt-16 border-t border-hairline">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase">
              {"// PRODUCTION PACKAGES"}
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-primary">
              Standardized <span className="italic text-tungsten font-light">Commission</span> Tiers.
            </h3>
            <p className="text-xs text-muted font-light">
              Transparent workflows tailored for commercial campaigns, luxury weddings, and post finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-7 md:p-8 flex flex-col justify-between border ${
                  pkg.featured
                    ? "bg-elevated border-tungsten relative shadow-2xl"
                    : "bg-surface border-hairline"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 right-6 bg-tungsten text-background font-mono text-[10px] uppercase tracking-widest px-3 py-0.5 font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center justify-between font-mono text-xs text-muted">
                    <span>{pkg.tier}</span>
                    <span className="text-tungsten">{pkg.timeline}</span>
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl text-primary mb-2">{pkg.name}</h4>
                    <p className="text-xs text-muted leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="font-mono text-[11px] text-primary/80 bg-background/80 p-3 border border-hairline">
                    <span className="text-muted block text-[9px] uppercase tracking-wider mb-0.5">TARGET PRODUCTION:</span>
                    {pkg.idealFor}
                  </div>

                  {/* Included items */}
                  <div className="space-y-2 pt-2">
                    <div className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      INCLUDED DELIVERABLES:
                    </div>
                    <ul className="space-y-2">
                      {pkg.deliverables.map((item, i) => (
                        <li key={i} className="text-xs text-primary/90 flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-tungsten flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`mt-8 w-full flex items-center justify-center gap-2 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                    pkg.featured
                      ? "bg-tungsten hover:bg-tungsten-hover text-background font-semibold"
                      : "bg-elevated hover:bg-primary hover:text-background text-primary border border-hairline"
                  }`}
                  data-cursor="hover"
                >
                  <span>Book This Tier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Gear Kit / Technical Arsenal */}
        <div className="mt-24 pt-16 border-t border-hairline">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
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
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase border transition-colors ${
                    activeGearTab === idx
                      ? "bg-tungsten text-background border-tungsten font-medium"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.gearKit[activeGearTab].items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 border border-hairline bg-surface space-y-2 hover:border-hairline-light transition-colors"
              >
                <div className="font-mono text-[10px] text-tungsten uppercase tracking-wider">
                  {item.role}
                </div>
                <div className="font-sans font-medium text-sm text-primary">
                  {item.name}
                </div>
                <div className="font-mono text-[11px] text-muted leading-relaxed">
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
