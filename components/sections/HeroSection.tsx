"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking across the pinned 320vh hero stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ---------------------------------------------------------------
  // All transforms complete by ~0.60 scroll progress, holding steady
  // from 0.60 to 1.0. This creates a dedicated 0.5s resting buffer
  // at the end of the hero before the next section rises above it.
  // ---------------------------------------------------------------

  // SCREEN 1 (Left-Center): fly forward and exit left
  const screen1Scale = useTransform(scrollYProgress, [0, 0.12, 0.28, 0.40], [0.88, 1.04, 1.7, 2.3]);
  const screen1Opacity = useTransform(scrollYProgress, [0, 0.10, 0.24, 0.36], [0.9, 1, 0.6, 0]);
  const screen1X = useTransform(scrollYProgress, [0, 0.12, 0.34], [0, -18, -130]);
  const screen1Y = useTransform(scrollYProgress, [0, 0.12, 0.34], [0, -8, -70]);

  // SCREEN 2 (Right): emerge from deep background
  const screen2Scale = useTransform(scrollYProgress, [0.10, 0.26, 0.42, 0.55, 0.62], [0.2, 0.62, 1.06, 1.75, 2.4]);
  const screen2Opacity = useTransform(scrollYProgress, [0.10, 0.22, 0.38, 0.50, 0.58], [0, 0.65, 1, 0.7, 0]);
  const screen2X = useTransform(scrollYProgress, [0.10, 0.26, 0.42, 0.58], [150, 75, 0, 85]);
  const screen2Y = useTransform(scrollYProgress, [0.10, 0.26, 0.42, 0.58], [70, 35, 0, -55]);

  // SCREEN 3 (Left/Bottom): surges to front and holds stationary from 0.60 to 1.0 (0.5s buffer)
  const screen3Scale = useTransform(scrollYProgress, [0.30, 0.45, 0.60, 1], [0.2, 0.62, 1.1, 1.1]);
  const screen3Opacity = useTransform(scrollYProgress, [0.30, 0.42, 0.56, 1], [0, 0.7, 1, 1]);
  const screen3X = useTransform(scrollYProgress, [0.30, 0.45, 0.60, 1], [-145, -72, 0, 0]);
  const screen3Y = useTransform(scrollYProgress, [0.30, 0.45, 0.60, 1], [130, 65, 0, 0]);

  // Micro tiles — raw scroll, completed before hold
  const tile1Opacity = useTransform(scrollYProgress, [0, 0.20, 0.42, 0.55], [0.3, 0.85, 0.4, 0]);
  const tile1X = useTransform(scrollYProgress, [0, 0.60], [40, -110]);
  const tile1Y = useTransform(scrollYProgress, [0, 0.60], [20, 75]);
  const tile1Scale = useTransform(scrollYProgress, [0, 0.28, 0.55], [0.55, 1.05, 1.8]);

  const tile2Opacity = useTransform(scrollYProgress, [0.12, 0.30, 0.50, 0.62], [0, 0.8, 0.55, 0]);
  const tile2X = useTransform(scrollYProgress, [0, 0.60], [-28, 100]);
  const tile2Y = useTransform(scrollYProgress, [0, 0.60], [38, -75]);
  const tile2Scale = useTransform(scrollYProgress, [0.12, 0.40, 0.60], [0.32, 0.95, 1.6]);

  const tile3Opacity = useTransform(scrollYProgress, [0.24, 0.42, 0.60, 1], [0, 0.75, 0.65, 0.65]);
  const tile3Y = useTransform(scrollYProgress, [0, 0.60], [95, -85]);
  const tile3Scale = useTransform(scrollYProgress, [0.24, 0.50, 0.60], [0.28, 0.88, 1.35]);

  // Background typography — raw scroll
  const typoScale = useTransform(scrollYProgress, [0, 0.60], [0.96, 1.16]);
  const typoOpacity = useTransform(scrollYProgress, [0, 0.50, 0.60, 1], [0.9, 0.65, 0.45, 0.45]);
  const typoY = useTransform(scrollYProgress, [0, 0.60], [0, -28]);

  // Phase label fades
  const phaseTextOpacity1 = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 1, 0]);
  const phaseTextOpacity2 = useTransform(scrollYProgress, [0.24, 0.36, 0.48], [0, 1, 0]);
  const phaseTextOpacity3 = useTransform(scrollYProgress, [0.46, 0.58, 1], [0, 1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full h-[380vh] md:h-[420vh] bg-background text-primary select-none"
    >
      {/* Pinned 100svh Viewport Stage with 3D Perspective */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background flex flex-col justify-between [perspective:1400px]">
        {/* 1. TOP HEADER & TELEMETRY NAV */}
        <div className="relative z-50 w-full max-w-[1560px] mx-auto px-4 sm:px-8 md:px-12 pt-4 sm:pt-8 flex items-center justify-between pointer-events-auto">
          {/* Top Left: Logo mark */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center bg-white/[0.03] backdrop-blur-md shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              <svg width="13" height="13" viewBox="0 0 24 24" className="fill-[#D4AF37]">
                <polygon points="7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7" />
              </svg>
            </div>
            <div className="flex items-center gap-1 font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase hidden xs:inline-flex">
              <span className="text-primary font-black">STARLOOP</span>
              <span className="text-[#D4AF37] text-[9px] font-semibold tracking-widest hidden sm:inline">ENT.</span>
            </div>
          </div>

          {/* Top Center: Pill Toggle (CREATE / EXPLORE) */}
          <div className="flex items-center bg-surface/90 border border-white/15 p-1 rounded-full backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            <button className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-primary text-background font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-transform active:scale-95">
              CREATE
            </button>
            <button className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-muted hover:text-primary font-mono text-[9px] sm:text-xs uppercase tracking-wider transition-colors">
              EXPLORE
            </button>
          </div>

          {/* Top Right: Telemetry label */}
          <div className="font-mono text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted">
            <span className="hidden sm:inline">SMART </span>CINEMA SUITE
          </div>
        </div>

        {/* 2. CENTER 3D CANVAS: GIANT OCTAGONAL TYPOGRAPHY & FLY-THROUGH SCREENS */}
        <div className="relative flex-1 w-full max-w-[1560px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-center [transform-style:preserve-3d]">
          {/* (A) GIANT GEOMETRIC OCTAGONAL OUTLINE BACKGROUND GRAPHIC */}
          <motion.div
            style={{ scale: typoScale, opacity: typoOpacity, y: typoY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <div className="relative flex items-center gap-4 sm:gap-8 md:gap-12">
              {/* Octagon Glyph 1 (O / Starloop Octagon) */}
              <svg
                viewBox="0 0 260 260"
                className="w-[28vw] sm:w-[24vw] md:w-[22vw] max-w-[340px] text-primary fill-none stroke-primary stroke-[20] sm:stroke-[26] opacity-30"
              >
                {/* Outer Chamfered Octagon */}
                <polygon points="76,12 184,12 248,76 248,184 184,248 76,248 12,184 12,76" />
                {/* Inner Cutout */}
                <polygon
                  points="90,52 170,52 208,90 208,170 170,208 90,208 52,170 52,90"
                  className="fill-background stroke-none"
                />
              </svg>

              {/* Copyright circle badge */}
              <div className="absolute left-[24vw] sm:left-[21vw] bottom-[18%] z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-primary/40 flex items-center justify-center font-mono text-[10px] sm:text-xs text-muted">
                ©
              </div>

              {/* Octagon Glyph 2 (U / V ribbon) */}
              <svg
                viewBox="0 0 260 260"
                className="w-[28vw] sm:w-[24vw] md:w-[22vw] max-w-[340px] text-primary fill-none stroke-primary stroke-[20] sm:stroke-[26] opacity-30"
              >
                <path
                  d="M24,20 L24,180 L84,240 L176,240 L236,180 L236,20"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>

              {/* Octagon Glyph 3 (A / Arch Ribbon) */}
              <svg
                viewBox="0 0 260 260"
                className="w-[28vw] sm:w-[24vw] md:w-[22vw] max-w-[340px] text-primary fill-none stroke-primary stroke-[20] sm:stroke-[26] opacity-30"
              >
                <path
                  d="M24,240 L24,100 L94,24 L166,24 L236,100 L236,240"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
          </motion.div>

          {/* (B) 3D FLYING WORK SCREENS (Emerging from Background, Growing in Opacity & Zooming Towards Camera) */}
          <div className="relative w-full h-[65vh] sm:h-[72vh] md:h-[78vh] flex items-center justify-center [transform-style:preserve-3d]">
            {/* SCREEN 1: Left-Center Work Screen */}
            <motion.div
              style={{
                scale: screen1Scale,
                x: screen1X,
                y: screen1Y,
                opacity: screen1Opacity,
              }}
              className="absolute left-[4%] sm:left-[10%] md:left-[14%] top-[10%] sm:top-[14%] w-[58vw] sm:w-[38vw] md:w-[26vw] max-w-[390px] aspect-[4/5] rounded-[1.8rem] sm:rounded-[2.4rem] md:rounded-[3rem] overflow-hidden bg-surface border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] z-20 will-change-transform"
            >
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=70&w=700&auto=format&fit=crop"
                  alt="Sculptural Luxury Product Still"
                  fill
                  priority
                  sizes="(max-width: 768px) 58vw, 26vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/20 pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-widest text-primary/90">
                  <span>DISCIPLINE // 01</span>
                  <span className="text-[#A855F7] font-semibold">100MP STILL</span>
                </div>
              </div>
            </motion.div>

            {/* SCREEN 2: Right Work Screen */}
            <motion.div
              style={{
                scale: screen2Scale,
                x: screen2X,
                y: screen2Y,
                opacity: screen2Opacity,
              }}
              className="absolute right-[4%] sm:right-[8%] md:right-[12%] top-[14%] sm:top-[18%] w-[62vw] sm:w-[42vw] md:w-[30vw] max-w-[440px] aspect-[4/5] rounded-[1.8rem] sm:rounded-[2.4rem] md:rounded-[3rem] overflow-hidden bg-surface border border-white/25 shadow-[0_40px_120px_rgba(0,0,0,0.85)] z-30 will-change-transform"
            >
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=70&w=800&auto=format&fit=crop"
                  alt="Haute Horlogerie Submerged Watch"
                  fill
                  sizes="(max-width: 768px) 62vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/25 pointer-events-none" />

                {/* Top overlay badge in card */}
                <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md border border-white/20 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-primary font-medium">
                    Brand & Commercial
                  </span>
                  <a
                    href="#contact"
                    className="px-3 py-1 rounded-full bg-primary text-background font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <span>COMMISSION</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Bottom Card Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-orbitron text-xs sm:text-sm text-primary font-bold mb-1">
                    VAUCANSON // HOROLOGY
                  </div>
                  <div className="font-mono text-[9px] text-[#A855F7] tracking-widest font-semibold">
                    ARRI 4.5K OPEN GATE
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SCREEN 3: Center-Left Screen */}
            <motion.div
              style={{
                scale: screen3Scale,
                x: screen3X,
                y: screen3Y,
                opacity: screen3Opacity,
              }}
              className="absolute left-[14%] sm:left-[20%] md:left-[24%] bottom-[4%] sm:bottom-[8%] w-[60vw] sm:w-[40vw] md:w-[28vw] max-w-[420px] aspect-[4/5] rounded-[1.8rem] sm:rounded-[2.4rem] md:rounded-[3rem] overflow-hidden bg-surface border border-white/25 shadow-[0_50px_140px_rgba(0,0,0,0.9)] z-40 will-change-transform"
            >
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=70&w=800&auto=format&fit=crop"
                  alt="Noir Cosmetic Lighting on Stone"
                  fill
                  sizes="(max-width: 768px) 60vw, 28vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/25 pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-orbitron text-xs sm:text-sm text-primary font-bold mb-1">
                    MAISON NOIR // ESSENCE
                  </div>
                  <div className="font-mono text-[9px] text-[#A855F7] tracking-widest font-semibold">
                    HASSELBLAD 100MP MEDIUM FORMAT
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECONDARY 3D FLOATING TILES */}
            {/* Tile 1: Amber Bottle */}
            <motion.div
              style={{ scale: tile1Scale, opacity: tile1Opacity, x: tile1X, y: tile1Y }}
              className="absolute left-[36%] sm:left-[42%] top-[6%] sm:top-[10%] w-[20vw] sm:w-[14vw] md:w-[9vw] max-w-[130px] aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-elevated border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 pointer-events-none"
            >
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"
                alt="Amber Flacon Still"
                fill
                sizes="130px"
                className="object-cover"
              />
            </motion.div>

            {/* Tile 2: Hypercar Still */}
            <motion.div
              style={{ scale: tile2Scale, opacity: tile2Opacity, x: tile2X, y: tile2Y }}
              className="absolute right-[20%] sm:right-[24%] top-[10%] sm:top-[14%] w-[22vw] sm:w-[16vw] md:w-[10vw] max-w-[150px] aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-elevated border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 pointer-events-none"
            >
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop"
                alt="Hypercar Pursuit Still"
                fill
                sizes="150px"
                className="object-cover"
              />
            </motion.div>

            {/* Tile 3: Anamorphic Flare */}
            <motion.div
              style={{ scale: tile3Scale, opacity: tile3Opacity, y: tile3Y }}
              className="absolute left-[22%] sm:left-[28%] bottom-[10%] sm:bottom-[14%] w-[22vw] sm:w-[15vw] md:w-[9vw] max-w-[140px] aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-elevated border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 pointer-events-none"
            >
              <Image
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"
                alt="Neon Anamorphic Flare"
                fill
                sizes="140px"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* (C) EDITORIAL LABELS */}
          {/* Left Text */}
          <div className="absolute left-6 sm:left-8 md:left-12 top-[28%] z-20 pointer-events-none hidden md:block max-w-[130px]">
            <div className="font-mono text-[10px] text-muted uppercase leading-snug">
              Instant
              <br />
              Image
              <br />
              Creation
            </div>
          </div>

          {/* Center-Top Text */}
          <div className="absolute left-[46%] top-[24%] z-20 pointer-events-none hidden lg:block max-w-[120px]">
            <div className="font-mono text-[10px] text-muted uppercase leading-snug">
              Bring
              <br />
              product
              <br />
              concepts
            </div>
          </div>

          {/* Right Text & CTA */}
          <div className="absolute right-4 sm:right-8 md:right-12 top-[16%] sm:top-[24%] z-30 flex flex-col items-end sm:items-start gap-2 sm:gap-4 pointer-events-auto">
            <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-muted uppercase leading-tight text-right sm:text-left">
              Brand &
              <br />
              Marketing
              <br />
              Studio
            </div>
            <a
              href="#contact"
              className="hidden sm:flex px-4 sm:px-6 py-2 rounded-full bg-primary text-background font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider items-center gap-2 hover:bg-slate-100 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <span>GET STARTED WITH STARLOOP</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3. BOTTOM FOOTER BAR */}
        <div className="relative z-50 w-full max-w-[1560px] mx-auto px-6 sm:px-8 md:px-12 pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-auto">
          {/* Bottom Left: Tag Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 rounded-full border border-white/15 bg-surface/80 backdrop-blur-md flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-primary uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
              <span>CREATIVITY</span>
            </div>
            <div className="px-3 py-1 rounded-full border border-white/10 bg-surface/60 backdrop-blur-md font-mono text-[8px] sm:text-[9px] text-muted uppercase tracking-wider">
              Large-Format Precision
            </div>
            <div className="px-3 py-1 rounded-full border border-white/10 bg-surface/60 backdrop-blur-md font-mono text-[8px] sm:text-[9px] text-muted uppercase tracking-wider hidden sm:inline-block">
              ACES 1.3
            </div>
            <div className="px-3 py-1 rounded-full border border-white/10 bg-surface/60 backdrop-blur-md font-mono text-[8px] sm:text-[9px] text-muted uppercase tracking-wider hidden md:inline-block">
              Endless Customization
            </div>
          </div>

          {/* Bottom Right: Dynamic Scrolled Headline & Version Meta */}
          <div className="text-left sm:text-right max-w-[65ch]">
            <div className="relative h-12 sm:h-14 overflow-hidden mb-2">
              <motion.h2
                style={{ opacity: phaseTextOpacity1 }}
                className="absolute inset-0 font-sans text-sm sm:text-lg md:text-xl font-normal text-primary leading-snug"
              >
                Instantly Elevate
                <br />
                <span className="font-semibold text-primary">
                  Stunning Cinematic Visuals
                </span>
              </motion.h2>

              <motion.h2
                style={{ opacity: phaseTextOpacity2 }}
                className="absolute inset-0 font-sans text-sm sm:text-lg md:text-xl font-normal text-primary leading-snug"
              >
                Sculpted Atmosphere
                <br />
                <span className="font-semibold text-primary">
                  Precision Camera & Optics
                </span>
              </motion.h2>

              <motion.h2
                style={{ opacity: phaseTextOpacity3 }}
                className="absolute inset-0 font-sans text-sm sm:text-lg md:text-xl font-normal text-primary leading-snug"
              >
                Visceral Final Masters
                <br />
                <span className="font-semibold text-primary">
                  For Global Screen Standards
                </span>
              </motion.h2>
            </div>

            <div className="flex items-center sm:justify-end gap-3 font-mono text-[8px] sm:text-[9px] text-muted uppercase tracking-widest">
              <span>/</span>
              <span className="text-[#D4AF37] font-semibold">STARLOOP</span>
              <span>The Future of Visual Craft</span>
              <span className="text-muted/40">|</span>
              <span className="text-primary font-medium">Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

