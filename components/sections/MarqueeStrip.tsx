"use client";

import React from "react";

export default function MarqueeStrip() {
  const items = [
    "Large Format Cinematography",
    "Medium Format Stills",
    "ACES 1.3 Color Pipeline",
    "Anamorphic 2X Optics",
    "Celluloid 16mm & 35mm",
    "High-Energy Kinetic Edit",
    "Chiaroscuro Lighting Design",
    "Sound Design & Foley Sync",
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 md:py-5 border-y border-hairline bg-surface select-none">
      <div className="flex w-max animate-[marquee-left_35s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-6 mx-6">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-primary/80">
              {item}
            </span>
            <span className="text-tungsten text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
