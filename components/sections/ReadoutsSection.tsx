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
      className="p-6 md:p-10 border-r border-hairline last:border-r-0 flex flex-col justify-between space-y-6 group hover:bg-elevated/40 transition-colors"
    >
      {/* Top telemetry code */}
      <div className="flex items-center justify-between font-mono text-[10px] text-muted uppercase tracking-widest">
        <span className="text-tungsten font-semibold">{code}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-tungsten/40 group-hover:bg-tungsten transition-colors" />
      </div>

      {/* Main Counter Display */}
      <div className="space-y-2">
        <div className="font-mono text-4xl sm:text-5xl lg:text-6xl text-primary font-light tracking-tight tabular-nums flex items-baseline">
          <span>{prefix}</span>
          <span>{displayValue.toLocaleString()}</span>
          <span className="text-tungsten text-3xl sm:text-4xl font-serif ml-1">{suffix}</span>
        </div>

        <div className="w-6 h-[1.5px] bg-tungsten transition-all duration-500 group-hover:w-16" />
      </div>

      {/* Label and subtext */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
          {label}
        </div>
        <div className="font-sans text-xs text-muted font-light mt-1">
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

  // Transform velocity into directional multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
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
      className="relative w-full border-b border-hairline bg-surface select-none overflow-hidden"
    >
      {/* 1. Camera Readouts Row (4 Telemetry Stats with Hairline Dividers) */}
      <div className="max-w-[1440px] mx-auto border-b border-hairline">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
          <AnimatedStat
            code="TEL_01 // EXP"
            number={9}
            suffix="+"
            label="Years Behind Lens"
            sublabel="Narrative cinema, high fashion & commercial"
          />
          <AnimatedStat
            code="TEL_02 // PROJ"
            number={140}
            suffix="+"
            label="Projects Delivered"
            sublabel="Global brand films, lookbooks & features"
          />
          <AnimatedStat
            code="TEL_03 // POST"
            number={1250}
            suffix="h+"
            label="Footage Graded"
            sublabel="Master ACES color timing & finishing"
          />
          <AnimatedStat
            code="TEL_04 // CLIENT"
            number={45}
            suffix="+"
            label="Brands & Clients"
            sublabel="Worldwide luxury commissions & studios"
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
