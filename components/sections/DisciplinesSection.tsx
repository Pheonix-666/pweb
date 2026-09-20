"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Camera, Film, Scissors, Check, Sparkles } from "lucide-react";

interface DisciplineData {
  id: "photography" | "film" | "edit";
  number: string;
  title: string;
  subtitle: string;
  description: string;
  included: string[];
  image: string;
  video?: string;
  accent: string;
}

const DISCIPLINES: DisciplineData[] = [
  {
    id: "photography",
    number: "01",
    title: "Photography",
    subtitle: "Tactile Medium Format & Stills",
    description:
      "Capturing evocative, timeless imagery for luxury brands, architecture, and high-fashion editorials with sculptural lighting and medium-format depth.",
    included: [
      "Brand & Fashion Campaigns",
      "Architectural Monographs",
      "Still Life & Luxury Products",
      "Editorial & Celebrity Portraits",
      "Fine-Art Medium Format Prints",
    ],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    accent: "#E8A33D",
  },
  {
    id: "film",
    number: "02",
    title: "Cinematography",
    subtitle: "Large Format & Anamorphic Direction",
    description:
      "Sculpting moving frames with cinematic chiaroscuro, precision camera movement, 16mm celluloid grain, and bespoke anamorphic optics.",
    included: [
      "Commercial & Brand Anthems",
      "Narrative Shorts & Feature Films",
      "Luxury Destination Weddings",
      "Documentaries & Expeditions",
      "Vehicle Chase & Crane Cinematography",
    ],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    accent: "#E5484D",
  },
  {
    id: "edit",
    number: "03",
    title: "Editing & Colour",
    subtitle: "Visceral Rhythm & ACES Grading",
    description:
      "Transforming raw multi-cam rushes into tightly wound, emotionally captivating visual narratives with surgical rhythm and ACES master color grading.",
    included: [
      "Offline Narrative & Commercial Editing",
      "High-Octane Music Video Cuts",
      "DaVinci Resolve ACES Color Timing",
      "Bespoke Sound Design & Foley Sync",
      "Multi-Aspect Social Adaptations",
    ],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    accent: "#30A46C",
  },
];

export default function DisciplinesSection() {
  // Desktop active hovered panel (defaults to middle Cinematography)
  const [activeId, setActiveId] = useState<string>("film");

  const handleSelectWork = (categoryId: string) => {
    // Dispatch custom event to notify WorkSection
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("filter-work", { detail: { category: categoryId } })
      );

      const workElem = document.getElementById("work");
      if (workElem) {
        workElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="disciplines" className="relative w-full border-b border-hairline bg-background select-none overflow-hidden">
      {/* Section Header Top Bar */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-10 md:py-14 border-b border-hairline flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-tungsten inline-block" />
            CORE CAPABILITIES
          </div>
          <h2 className="font-serif heading-display-lg text-primary">
            Three Disciplines. <span className="italic text-tungsten font-light">One Studio.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-md tracking-wider">
          HOVER OR TAP A DISCIPLINE TO UNVEIL THE METHODOLOGY, HARDWARE & DELIVERABLES.
        </p>
      </div>

      {/* Desktop View: 3 Expanding Panels (60% / 20% / 20%) */}
      <div className="hidden lg:flex w-full h-[720px] bg-surface overflow-hidden">
        {DISCIPLINES.map((discipline) => {
          const isActive = activeId === discipline.id;

          return (
            <motion.div
              key={discipline.id}
              layout
              onMouseEnter={() => setActiveId(discipline.id)}
              onFocus={() => setActiveId(discipline.id)}
              tabIndex={0}
              className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-hairline last:border-r-0 cursor-pointer overflow-hidden flex flex-col justify-between p-8 xl:p-12 ${
                isActive ? "flex-[3] bg-elevated" : "flex-[1] bg-surface hover:bg-elevated/70"
              }`}
            >
              {/* Background Media (Image or Video) */}
              <div className="absolute inset-0 z-0">
                {discipline.video && isActive ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.4] contrast-125 transition-opacity duration-700"
                    poster={discipline.image}
                  >
                    <source src={discipline.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={discipline.image}
                    alt={discipline.title}
                    fill
                    className={`object-cover filter contrast-125 transition-all duration-700 ${
                      isActive
                        ? "brightness-[0.35] scale-105"
                        : "brightness-[0.2] grayscale scale-100 opacity-60"
                    }`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              {/* Top Panel Meta */}
              <div className="relative z-10 flex items-center justify-between border-b border-hairline pb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm tracking-widest text-tungsten font-semibold">
                    {discipline.number}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {discipline.subtitle}
                  </span>
                </div>

                <div className="p-2 border border-hairline bg-surface/80 text-primary">
                  {discipline.id === "photography" ? (
                    <Camera className="w-4 h-4 text-tungsten" />
                  ) : discipline.id === "film" ? (
                    <Film className="w-4 h-4 text-rec" />
                  ) : (
                    <Scissors className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>

              {/* Panel Content (Morphs between Compact Title & Full Expanded Details) */}
              <div className="relative z-10 mt-auto pt-6 space-y-6">
                <h3 className="font-serif text-4xl xl:text-5xl text-primary font-normal tracking-tight">
                  {discipline.title}
                </h3>

                {/* Expanded Details */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <p className="text-sm text-primary/80 font-light leading-relaxed max-w-xl">
                        {discipline.description}
                      </p>

                      {/* Included List */}
                      <div className="space-y-2.5 pt-4 border-t border-hairline">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-tungsten">
                          WHAT IS INCLUDED:
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                          {discipline.included.map((item, i) => (
                            <div
                              key={i}
                              className="text-xs text-primary/90 flex items-center gap-2 font-sans"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-tungsten flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* See Work Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectWork(discipline.id);
                        }}
                        data-cursor="hover"
                        className="group inline-flex items-center gap-3 px-6 py-3 bg-primary hover:bg-tungsten text-background font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                      >
                        <span>See {discipline.title} Work</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-mono text-muted tracking-widest uppercase flex items-center gap-2"
                    >
                      <span>Click to expand</span>
                      <span>›</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile View: Stacked Cards Accordion */}
      <div className="lg:hidden flex flex-col divide-y divide-hairline">
        {DISCIPLINES.map((discipline) => {
          const isExpanded = activeId === discipline.id;

          return (
            <div
              key={discipline.id}
              onClick={() => setActiveId(isExpanded ? "" : discipline.id)}
              className="relative overflow-hidden bg-surface p-6 sm:p-8 space-y-6"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-tungsten font-semibold">
                    {discipline.number}
                  </span>
                  <h3 className="font-serif text-3xl text-primary">{discipline.title}</h3>
                </div>
                <div className="font-mono text-xs text-tungsten">
                  {isExpanded ? "[ − ]" : "[ + ]"}
                </div>
              </div>

              {/* Media preview */}
              <div className="relative aspect-[16/9] w-full border border-hairline overflow-hidden">
                <Image
                  src={discipline.image}
                  alt={discipline.title}
                  fill
                  className="object-cover brightness-75"
                />
              </div>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 pt-2"
                >
                  <p className="text-xs text-primary/80 leading-relaxed font-light">
                    {discipline.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-hairline">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-tungsten">
                      WHAT IS INCLUDED:
                    </div>
                    <ul className="space-y-1.5">
                      {discipline.included.map((item, i) => (
                        <li key={i} className="text-xs text-muted flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-tungsten" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectWork(discipline.id);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-background font-mono text-xs uppercase tracking-wider font-semibold"
                  >
                    <span>See {discipline.title} Work</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
