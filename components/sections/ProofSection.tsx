"use client";

import React from "react";
import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import BehindTheScenesCarousel from "@/components/sections/BehindTheScenesCarousel";

interface PackageCard {
  id: string;
  category: "photography" | "film" | "edit";
  tier: string;
  title: string;
  description: string;
  turnaround: string;
  deliverables: string[];
  featured?: boolean;
}

const PACKAGES: PackageCard[] = [
  {
    id: "photography",
    category: "photography",
    tier: "DISCIPLINE 01",
    title: "Editorial & Stills",
    description:
      "Medium format digital & 35mm film still campaigns for luxury fashion, architectural monographs, and high-concept commercial product lookbooks.",
    turnaround: "2 to 3 Weeks",
    deliverables: [
      "100MP Hasselblad / GFX Masters",
      "Bespoke Chiaroscuro Lighting Set",
      "Fine-Art Retouching & Color Emulation",
      "Full Commercial & Archival License",
      "High-Res Contact Sheets & Raw Selects",
    ],
  },
  {
    id: "film",
    category: "film",
    tier: "DISCIPLINE 02",
    title: "Full Film Production",
    description:
      "End-to-end directorial and DP services for commercial brand films, luxury weddings, and cinematic music videos with pursuit rigs and anamorphic glass.",
    turnaround: "3 to 5 Weeks",
    deliverables: [
      "ARRI Alexa Mini LF 4.5K RAW Capture",
      "Atlas Orion 2X Anamorphic Optics",
      "On-Set DIT Color Monitoring & LUTs",
      "Hero 60s Brand Film + 3x Social Cuts",
      "Dolby Vision HDR & Cinema DCP Masters",
    ],
    featured: true,
  },
  {
    id: "edit",
    category: "edit",
    tier: "DISCIPLINE 03",
    title: "Edit & Color Finishing",
    description:
      "Dedicated offline narrative conform, kinetic commercial montages, ACES 1.3 master color grading, and multi-layered Foley sound design for pre-shot footage.",
    turnaround: "1 to 2 Weeks",
    deliverables: [
      "Offline Narrative & Rhythm Assembly",
      "DaVinci Resolve ACES Master Color Grade",
      "Film Print Emulation (Kodak 2383)",
      "Audio Foley, Sound FX & Mix Sync",
      "Multi-Aspect Ratio Exports (16:9, 9:16, 4:5)",
    ],
  },
];

export default function ProofSection() {
  const handleGetQuote = (category: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-package", { detail: { category } })
      );

      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="proof" className="relative bg-background border-b border-hairline select-none">
      {/* 1. CLIENT LOGO STRIP */}
      <div className="border-b border-hairline py-8 sm:py-12 bg-surface/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 space-y-4 sm:space-y-6">
          <div className="font-mono text-[9px] sm:text-[10px] text-[#C89B53] tracking-widest uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#C89B53] inline-block" />
            TRUSTED BY DIRECTORS, FASHION HOUSES & COMMISSIONS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {siteConfig.clients.map((client, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 liquid-glass-card flex flex-col justify-center text-center group cursor-default rounded-sm"
              >
                <span className="font-sans font-medium text-xs text-primary/80 group-hover:text-primary transition-colors">
                  {client.name}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-muted group-hover:text-[#C89B53] transition-colors mt-0.5">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SERVICES & PACKAGES */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-36 border-b border-hairline">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="font-mono text-xs text-[#C89B53] tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            COMMISSION PACKAGES & RATES
          </div>
          <h2 className="font-serif heading-display-lg text-primary">
            Clear Scope. <span className="italic text-[#C89B53] font-light">Turnaround Precision.</span>
          </h2>
          <p className="text-fluid-body text-muted font-light max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            Choose a standardized production package or commission a custom multi-camera campaign.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 sm:p-8 flex flex-col justify-between space-y-6 sm:space-y-8 relative rounded-sm ${
                pkg.featured
                  ? "liquid-glass-card !border-[#C89B53]/50 shadow-[0_0_35px_rgba(200,155,83,0.15)]"
                  : "liquid-glass-card"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 right-6 bg-[#C89B53] text-[#0A0A0C] font-mono text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 sm:px-3 py-0.5 font-bold shadow-[0_0_12px_rgba(200,155,83,0.4)] rounded-sm">
                  FLAGSHIP CAMPAIGN
                </div>
              )}

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-white/[0.08] pb-3 sm:pb-4">
                  <span className="text-[#C89B53] font-semibold">{pkg.tier}</span>
                  <span className="text-[11px] sm:text-xs">TURNAROUND: {pkg.turnaround}</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-primary mb-2">{pkg.title}</h3>
                  <p className="text-xs text-muted font-light leading-relaxed">{pkg.description}</p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                  <div className="font-mono text-[9px] sm:text-[10px] text-[#C89B53] uppercase tracking-widest">
                    INCLUDED DELIVERABLES:
                  </div>
                  <ul className="space-y-2">
                    {pkg.deliverables.map((item, i) => (
                      <li key={i} className="text-xs text-primary/90 flex items-start gap-2.5 font-sans">
                        <Check className="w-3.5 h-3.5 text-[#C89B53] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Get a Quote Button */}
              <button
                onClick={() => handleGetQuote(pkg.category)}
                data-cursor="hover"
                className={`w-full py-3.5 sm:py-4 text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-sm ${
                  pkg.featured
                    ? "bg-[#C89B53] hover:bg-[#d8ab63] text-[#0A0A0C] font-bold shadow-[0_0_20px_rgba(200,155,83,0.3)]"
                    : "liquid-glass hover:bg-white/[0.08] text-primary border border-white/10"
                }`}
              >
                <span>Get a Quote for {pkg.title.split(" ")[0]}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BEHIND-THE-SCENES 3D CIRCULAR CAROUSEL */}
      <BehindTheScenesCarousel />
    </section>
  );
}
