"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

interface StatItemProps {
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  code: string;
}

function AnimatedStat({ number, suffix = "+", prefix = "", label, sublabel, code }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeOut * number);

      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayValue(number);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [isInView, number]);

  return (
    <div
      ref={ref}
      className="p-8 md:p-12 border-r border-white/10 last:border-r-0 flex flex-col justify-between space-y-8 group hover:bg-white/[0.02] transition-colors relative"
    >
      {/* Top telemetry code */}
      <div className="flex items-center justify-between font-outfit text-[10px] text-white/40 uppercase tracking-[0.3em]">
        <span className="text-[#B8860B] font-bold">{code}</span>
        <span className="w-2 h-2 rounded-full bg-[#B8860B]/30 group-hover:bg-[#B8860B] transition-colors shadow-[0_0_8px_rgba(184,134,11,0.4)]" />
      </div>

      {/* Main Counter Display */}
      <div className="space-y-4">
        <div className="font-syncopate text-5xl sm:text-6xl lg:text-7xl text-white font-bold tracking-tight tabular-nums flex items-baseline leading-none">
          <span>{prefix}</span>
          <span>{displayValue.toLocaleString()}</span>
          <span className="text-[#B8860B] ml-1">{suffix}</span>
        </div>

        <div className="w-8 h-[2px] bg-[#B8860B] transition-all duration-500 group-hover:w-20" />
      </div>

      {/* Label and subtext */}
      <div>
        <div className="font-syncopate text-xs md:text-sm uppercase tracking-wider text-white font-bold leading-tight">
          {label}
        </div>
        <div className="font-outfit text-[11px] md:text-xs text-white/50 font-light mt-1.5 uppercase tracking-widest">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

export default function ReadoutsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Velocity tracking for responsive Marquee speed
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const marqueeItems = [
    { text: "Atelier Vaucanson", tag: "Haute Horlogerie" },
    { text: "Large Format Cinema", tag: "ARRI LF" },
    { text: "Maison De L'Ombre", tag: "Milan Fashion" },
    { text: "ACES 1.3 Color Science", tag: "DaVinci" },
    { text: "Veloce Motors", tag: "Automotive" },
    { text: "16mm & 35mm Celluloid", tag: "Kodak Vision3" },
    { text: "Kéré Architects", tag: "Architecture" },
    { text: "Anamorphic 2X Optics", tag: "Atlas Orion" },
    { text: "Kavalier Records", tag: "Director Cut" },
    { text: "Maison Botanique", tag: "Perfumery" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full border-b border-white/10 bg-[#08080A] select-none overflow-hidden py-16 md:py-24"
    >
      {/* Background Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #FFFFFF 0, #FFFFFF 1px, transparent 0, transparent 50%)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-[1px] bg-[#B8860B]" />
          <span className="font-outfit text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#B8860B] font-bold">
            By the Numbers // Studio Metrics
          </span>
        </div>
      </div>

      {/* 1. Camera Readouts Row (4 Telemetry Stats with Hairline Dividers) */}
      <div className="max-w-[1440px] mx-auto border-y border-white/10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <AnimatedStat
            code="TEL_01 // EXP"
            number={9}
            suffix="+"
            label="Years Behind Lens"
            sublabel="Since 2017 · Narrative & Commercial"
          />
          <AnimatedStat
            code="TEL_02 // PROJ"
            number={140}
            suffix="+"
            label="Projects Delivered"
            sublabel="Across 14 countries globally"
          />
          <AnimatedStat
            code="TEL_03 // POST"
            number={1250}
            suffix="h+"
            label="Footage Graded"
            sublabel="Master ACES color timing"
          />
          <AnimatedStat
            code="TEL_04 // CLIENT"
            number={100}
            suffix="%"
            label="Client Satisfaction"
            sublabel="Zero creative compromises"
          />
        </div>
      </div>

      {/* 2. Full-Width Velocity-Reactive Marquee */}
      <div className="py-6 md:py-8 bg-background relative overflow-hidden flex items-center border-b border-hairline">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-6 mx-6 md:mx-8 font-mono group"
            >
              <span className="text-xs md:text-sm text-primary tracking-[0.2em] uppercase font-light group-hover:text-tungsten transition-colors">
                {item.text}
              </span>
              <span className="text-[10px] text-muted uppercase tracking-widest px-2 py-0.5 border border-hairline bg-surface">
                {item.tag}
              </span>
              <span className="text-tungsten text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
