"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ArrowRight, Eye, Film, Camera } from "lucide-react";
import { formatTimecode } from "@/lib/utils";

interface StoryFrame {
  id: string;
  number: string;
  chapter: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  image: string;
  secondaryImage?: string;
  aspect: string;
  specs: string;
  location: string;
}

const STORY_FRAMES: StoryFrame[] = [
  {
    id: "01",
    number: "01",
    chapter: "CHAPTER I // ARCHITECTURAL FORM",
    title: "Monolith & Shadow",
    subtitle: "Raw Concrete Geometry",
    quote: "“Architecture is the learned game, correct and magnificent, of forms assembled in the light.”",
    description:
      "Documenting the shifting solar angles across off-grid brutalist concrete pavilions with perspective-corrected tilt-shift glass.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
    specs: "Sony A7R V · TS-E 17mm f/4L · 61MP TIFF",
    location: "Burkina Faso Pavilion",
  },
  {
    id: "02",
    number: "02",
    chapter: "CHAPTER II // HAUTE EDITORIAL",
    title: "Tactile Silence",
    subtitle: "High Fashion Monochromatic Draping",
    quote: "“The weight of an image lives in the darkness it refuses to reveal.”",
    description:
      "A study of stark silhouettes against volcanic slate rock, captured with 100-megapixel digital medium format and parabolic studio reflectors.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
    specs: "Hasselblad H6D-100c · HC 100mm f/2.2 · Broncolor Para 222",
    location: "Milan Fashion Week",
  },
  {
    id: "03",
    number: "03",
    chapter: "CHAPTER III // HIGH-SPEED MOTION",
    title: "Alpine Velocity",
    subtitle: "The Prototype Electric GT Launch",
    quote: "“Speed is nothing without intentional framing; the camera must breathe with the machine.”",
    description:
      "Deploying a chase pursuit vehicle with stabilized roof crane at 140 km/h across Swiss mountain passes at sunrise.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[16/9]",
    specs: "RED V-Raptor 8K VV · Angénieux Optimo 12X · MotoCrane",
    location: "Furka Pass, Switzerland",
  },
  {
    id: "04",
    number: "04",
    chapter: "CHAPTER IV // CELLULOID ROMANCE",
    title: "Twilight on the Water",
    subtitle: "16mm Celluloid Destination Feature",
    quote: "“Celluloid grain breathes life into memory in a way digital perfection never can.”",
    description:
      "Intimate dawn boat arrivals and candlelit banquet vows on Lake Como documented on Kodak 500T 16mm celluloid film.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[16/10]",
    specs: "Arriflex 16SR3 · Kodak Vision3 500T · Atlas Orion 2X",
    location: "Villa Balbiano, Lake Como",
  },
  {
    id: "05",
    number: "05",
    chapter: "CHAPTER V // HOROLOGY PRECISION",
    title: "The Micro Heartbeat",
    subtitle: "Titanium Chronograph Macro Optics",
    quote: "“Microscopic mechanics transformed into monumental cinematic sculpture.”",
    description:
      "Motorized robotic passes using 2X periprobe macro lenses over hand-beveled tourbillon bridges and escapements.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[16/9]",
    specs: "ARRI Alexa Mini LF · Laowa 24mm T14 Probe · Motion Control",
    location: "Geneva Watch Atelier",
  },
];

export default function EditorialScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the tall pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  // Translate horizontal tracks from 0% to -80%
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-78%"]);

  // Progress line width
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="visual-story"
      ref={containerRef}
      className="relative bg-background border-b border-hairline select-none"
    >
      {/* Tall Scroll Track on Desktop (Pinned 400vh container) */}
      <div className="hidden lg:block relative h-[420vh]">
        {/* Sticky 100vh Full Viewport Stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0C] flex flex-col justify-between p-8 xl:p-12">
          {/* Subtle Background Watermark Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] overflow-hidden select-none">
            <span className="font-serif text-[38vw] text-primary whitespace-nowrap leading-none">
              STORY
            </span>
          </div>

          {/* Top HUD Header Row */}
          <div className="relative z-20 flex items-center justify-between border-b border-hairline pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-tungsten animate-pulse" />
              <span className="text-tungsten font-semibold tracking-widest uppercase">
                EDITORIAL NARRATIVE // HORIZONTAL REEL
              </span>
              <span className="text-muted hidden xl:inline">
                [SCROLL VERTICALLY TO NAVIGATE CHRONOLOGY]
              </span>
            </div>

            <div className="flex items-center gap-6 text-muted text-[11px]">
              <span>5 CURATED CHAPTERS</span>
              <span className="text-white/20">|</span>
              <span>DIRECTOR: Rahul Singh</span>
            </div>
          </div>

          {/* Main Horizontal Moving Track Stage */}
          <div className="relative z-10 flex-grow flex items-center overflow-hidden my-auto py-6">
            <motion.div style={{ x }} className="flex items-center gap-16 xl:gap-24 pl-6 pr-48 w-max">
              {/* Intro Title Card */}
              <div className="w-[360px] xl:w-[420px] flex-shrink-0 space-y-6 pr-6">
                <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-tungsten inline-block" />
                  VISUAL ESSAY
                </div>

                <h2 className="font-serif text-4xl xl:text-6xl text-primary font-normal leading-[1.05]">
                  Stories Carved in <span className="italic text-tungsten font-light">Shadow.</span>
                </h2>

                <p className="font-sans text-xs xl:text-sm text-muted font-light leading-relaxed">
                  A scroll-driven journey through light, geometry, speed, and tactile medium format stills. Each chapter represents a distinct milestone in our visual philosophy.
                </p>

                <div className="inline-flex items-center gap-2 font-mono text-xs text-tungsten tracking-widest pt-4">
                  <span>ADVANCE STORYLINE</span>
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </div>
              </div>

              {/* Story Frames Sequence */}
              {STORY_FRAMES.map((frame) => (
                <div
                  key={frame.id}
                  className="w-[720px] xl:w-[860px] flex-shrink-0 border border-hairline bg-surface p-6 xl:p-8 flex flex-col justify-between space-y-6 group hover:border-tungsten/60 transition-colors duration-500 shadow-2xl"
                >
                  {/* Frame Top Metadata */}
                  <div className="flex items-center justify-between border-b border-hairline pb-4 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-tungsten font-bold">{frame.number}</span>
                      <span className="text-white/20">|</span>
                      <span className="text-muted tracking-widest">{frame.chapter}</span>
                    </div>
                    <span className="text-primary/70 text-[11px]">{frame.location}</span>
                  </div>

                  {/* Visual Media Composition (Primary Still + Secondary Inset) */}
                  <div className="relative w-full h-[320px] xl:h-[380px] bg-black overflow-hidden border border-hairline">
                    <Image
                      src={frame.image}
                      alt={frame.title}
                      fill
                      sizes="(max-width: 1440px) 70vw, 860px"
                      className="object-cover filter grayscale-[15%] contrast-115 group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

                    {/* Secondary Detail Inset Image */}
                    {frame.secondaryImage && (
                      <div className="absolute bottom-4 right-4 w-32 xl:w-44 aspect-[4/3] border border-hairline-light bg-black shadow-2xl overflow-hidden hidden sm:block">
                        <Image
                          src={frame.secondaryImage}
                          alt={`${frame.title} Detail`}
                          fill
                          className="object-cover filter contrast-125"
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 font-mono text-[8px] text-tungsten uppercase tracking-widest">
                          DETAIL
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Frame Narrative & Spec Footer */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-2">
                      <h3 className="font-serif text-3xl xl:text-4xl text-primary font-normal">
                        {frame.title}{" "}
                        <span className="italic text-tungsten font-light text-2xl xl:text-3xl">
                          — {frame.subtitle}
                        </span>
                      </h3>
                    </div>

                    <p className="font-serif text-sm xl:text-base text-primary/80 italic font-light leading-relaxed">
                      {frame.quote}
                    </p>

                    <p className="font-sans text-xs text-muted leading-relaxed font-light">
                      {frame.description}
                    </p>

                    <div className="pt-3 border-t border-hairline flex items-center justify-between font-mono text-[10px] text-muted">
                      <span>SPECS: <span className="text-primary">{frame.specs}</span></span>
                      <span className="text-tungsten">FRAME ARCHIVE [2024–2025]</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Running Timeline Progress Line */}
          <div className="relative z-20 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs text-muted">
            <div className="flex items-center gap-4">
              <span>PROGRESSION:</span>
              <div className="w-48 xl:w-72 h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                  style={{ width: progressWidth }}
                  className="h-full bg-tungsten"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span>HORIZONTAL DRIFT RATE: 1.0X</span>
              <span>·</span>
              <span className="text-tungsten">ACES 1.3 REC.709</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Fallback Presentation (Vertical Editorial Flow) */}
      <div className="block lg:hidden px-5 py-20 space-y-16">
        <div className="space-y-3 border-b border-hairline pb-8">
          <div className="font-mono text-xs text-tungsten tracking-widest uppercase">
            {"//"} VISUAL ESSAY & STORY
          </div>
          <h2 className="font-serif heading-display-lg text-primary">
            Stories Carved in <span className="italic text-tungsten font-light">Shadow.</span>
          </h2>
          <p className="text-sm text-muted font-light leading-relaxed">
            A continuous editorial narrative through architectural monoliths, high-speed alpine pursuits, and intimate celluloid cinema.
          </p>
        </div>

        <div className="space-y-16">
          {STORY_FRAMES.map((frame) => (
            <article key={frame.id} className="space-y-6 border border-hairline bg-surface p-6">
              <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono text-xs">
                <span className="text-tungsten font-semibold">CHAPTER {frame.number}</span>
                <span className="text-muted text-[10px]">{frame.location}</span>
              </div>

              <div className="relative aspect-[16/10] w-full border border-hairline overflow-hidden bg-black">
                <Image
                  src={frame.image}
                  alt={frame.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-primary">{frame.title}</h3>
                <p className="font-serif text-sm text-tungsten italic">{frame.quote}</p>
                <p className="text-xs text-muted leading-relaxed font-light">{frame.description}</p>
                <div className="font-mono text-[10px] text-muted pt-2 border-t border-hairline">
                  {frame.specs}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
