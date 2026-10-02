"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface DisciplineData {
  id: "adfilms" | "documentary" | "bts";
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
    id: "adfilms",
    number: "01",
    title: "Ad Films",
    subtitle: "Brand & Commercial Production",
    description:
      "High-impact commercial films built for brands that demand attention. From concept to final delivery we craft story-driven ad films that connect emotionally, drive recall, and perform across every platform.",
    included: [
      "TVC & Digital Ad Films",
      "Product & Brand Campaign Films",
      "Corporate & Institutional Films",
      "Social Media Reels & Shorts",
      "Testimonial & Narrative Spots",
    ],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=65&w=900&auto=format&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    accent: "#E8A33D",
  },
  {
    id: "documentary",
    number: "02",
    title: "Documentary",
    subtitle: "Long-Form & Short-Form Non-Fiction",
    description:
      "Real stories told with cinematic precision. We develop, shoot, and edit documentaries that humanise subjects, expose untold perspectives, and leave lasting impressions on audiences.",
    included: [
      "Short-Form & Feature Documentaries",
      "Brand & Social Impact Docs",
      "Event & Festival Coverage",
      "Talking Head & Interview Series",
      "Travel & Expedition Films",
    ],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=65&w=900&auto=format&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    accent: "#E5484D",
  },
  {
    id: "bts",
    number: "03",
    title: "Behind the Scenes",
    subtitle: "Horizontal & Vertical Formats",
    description:
      "The making-of content audiences crave. We capture raw, authentic behind-the-scenes footage in both horizontal (cinematic) and vertical (social-first) formats — giving your audience a window into the process.",
    included: [
      "Horizontal BTS — Widescreen Cinematic",
      "Vertical BTS — Reels, Shorts & Stories",
      "On-Set Day-in-the-Life Coverage",
      "Crew & Cast Feature Pieces",
      "Multi-Platform Simultaneous Delivery",
    ],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=65&w=900&auto=format&fit=crop",
    accent: "#30A46C",
  },
];

export default function DisciplinesSection() {
  const [activeId, setActiveId] = useState<string>("adfilms");

  const handleSelectWork = (categoryId: string) => {
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
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 border-b border-hairline flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-8">
        <div className="max-w-[65ch]">
          <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-tungsten inline-block" />
            CORE CAPABILITIES
          </div>
          <h2 className="font-serif heading-display-lg text-primary">
            Three Services. <span className="italic text-tungsten font-light">One Studio.</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-[65ch] tracking-wider">
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
              onClick={() => setActiveId(discipline.id)}
              onMouseEnter={() => setActiveId(discipline.id)}
              className={`relative h-full transition-all duration-700 ease-out cursor-pointer overflow-hidden border-r border-hairline last:border-r-0 ${
                isActive ? "flex-[3]" : "flex-[1] opacity-75 hover:opacity-100"
              }`}
            >
              {/* Background Media */}
              <div className="absolute inset-0 w-full h-full">
                {isActive && discipline.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1]"
                  >
                    <source src={discipline.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={discipline.image}
                    alt={discipline.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover filter brightness-[0.5] contrast-[1.1] transition-transform duration-700 hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              {/* Panel Content Container */}
              <div className="relative z-10 h-full p-8 xl:p-12 flex flex-col justify-between">
                {/* Top Discipline Tag */}
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span className="text-tungsten font-semibold text-sm">
                    {discipline.number}
                  </span>
                  <span className="uppercase tracking-widest hidden xl:inline">
                    {discipline.subtitle}
                  </span>
                </div>

                {/* Bottom Main Details */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 max-w-[65ch]"
                    >
                      <div>
                        <h3 className="font-serif text-4xl xl:text-5xl text-primary mb-2">
                          {discipline.title}
                        </h3>
                        <p className="font-mono text-xs text-tungsten tracking-wide font-medium">
                          {discipline.subtitle}
                        </p>
                      </div>

                      <p className="font-sans text-sm xl:text-base text-primary/90 font-light leading-relaxed max-w-[65ch]">
                        {discipline.description}
                      </p>

                      {/* BTS: Special Format Badges for Horizontal & Vertical */}
                      {discipline.id === "bts" && (
                        <div className="flex gap-4 pt-2">
                          <div className="flex-1 border border-[#A855F7]/40 bg-[#A855F7]/[0.08] p-4 rounded-sm">
                            <div className="font-mono text-[9px] uppercase tracking-widest text-[#A855F7] mb-1 font-semibold">Format 01</div>
                            <div className="font-serif text-base text-primary font-medium">Horizontal</div>
                            <div className="font-mono text-xs text-muted mt-1">16:9 · Cinematic · 4K</div>
                          </div>
                          <div className="flex-1 border border-[#A855F7]/40 bg-[#A855F7]/[0.08] p-4 rounded-sm">
                            <div className="font-mono text-[9px] uppercase tracking-widest text-[#A855F7] mb-1 font-semibold">Format 02</div>
                            <div className="font-serif text-base text-primary font-medium">Vertical</div>
                            <div className="font-mono text-xs text-muted mt-1">9:16 · Reels · Stories</div>
                          </div>
                        </div>
                      )}

                      {/* Included List */}
                      <div className="space-y-3 pt-4 border-t border-hairline">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-tungsten font-semibold">
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

      {/* Mobile & Tablet View: Stacked Cards Accordion */}
      <div className="lg:hidden flex flex-col divide-y divide-hairline">
        {DISCIPLINES.map((discipline) => {
          const isExpanded = activeId === discipline.id;

          return (
            <div
              key={discipline.id}
              onClick={() => setActiveId(isExpanded ? "" : discipline.id)}
              className="relative overflow-hidden bg-surface p-6 sm:p-8 space-y-4 sm:space-y-6 cursor-pointer"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-tungsten font-semibold">
                    {discipline.number}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-primary">{discipline.title}</h3>
                </div>
                <div className="font-mono text-xs text-tungsten font-bold">
                  {isExpanded ? "[ − ]" : "[ + ]"}
                </div>
              </div>

              {/* Media preview */}
              <div className="relative aspect-[16/9] w-full border border-hairline overflow-hidden rounded-sm">
                <Image
                  src={discipline.image}
                  alt={discipline.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover brightness-75"
                />
              </div>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-2 max-w-[65ch]"
                >
                  <p className="text-xs sm:text-sm text-primary/90 leading-relaxed font-light max-w-[65ch]">
                    {discipline.description}
                  </p>

                  {/* BTS: Format Badges for mobile */}
                  {discipline.id === "bts" && (
                    <div className="flex gap-3">
                      <div className="flex-1 border border-[#A855F7]/40 bg-[#A855F7]/[0.08] p-3 rounded-sm">
                        <div className="font-mono text-[8px] uppercase tracking-widest text-[#A855F7] font-semibold">Format 01</div>
                        <div className="font-sans text-sm text-primary font-medium mt-0.5">Horizontal</div>
                        <div className="font-mono text-[9px] text-muted">16:9 · Cinematic</div>
                      </div>
                      <div className="flex-1 border border-[#A855F7]/40 bg-[#A855F7]/[0.08] p-3 rounded-sm">
                        <div className="font-mono text-[8px] uppercase tracking-widest text-[#A855F7] font-semibold">Format 02</div>
                        <div className="font-sans text-sm text-primary font-medium mt-0.5">Vertical</div>
                        <div className="font-mono text-[9px] text-muted">9:16 · Reels</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-4 border-t border-hairline">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-tungsten font-semibold">
                      WHAT IS INCLUDED:
                    </div>
                    <ul className="space-y-2">
                      {discipline.included.map((item, i) => (
                        <li key={i} className="text-xs text-muted flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-tungsten flex-shrink-0" />
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
                    className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-background font-mono text-xs uppercase tracking-wider font-semibold"
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
