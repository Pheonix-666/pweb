"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
  Award,
  Film,
  Camera,
  Scissors,
  Sparkles,
  ChevronDown,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/data/site";

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

const AWARDS = [
  { laurel: "WINNER", title: "Best Brand Visual", event: "Paris Craft Film Festival", year: "2024" },
  { laurel: "NOMINEE", title: "Best Creative Editing", event: "UK Music Video Awards", year: "2024" },
  { laurel: "FEATURED", title: "Building of the Year", event: "ArchDaily Architectural Monograph", year: "2024" },
  { laurel: "SELECTION", title: "Official Selection", event: "Reykjavík International Film Festival", year: "2024" },
  { laurel: "HONOR", title: "Craft Excellence", event: "Milan Design Week Spatial Installation", year: "2023" },
];

const BTS_ITEMS = [
  {
    title: "ARRI Alexa Mini LF On-Set Rig",
    role: "Alpine Hypercar Chase Rig",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    type: "STILL",
  },
  {
    title: "DaVinci Resolve Color Grading Suite",
    role: "Sony BVM-HX310 4K Reference",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    type: "STILL",
  },
  {
    title: "Pursuit Crane Tech on Location",
    role: "MotoCrane Ultra High-Speed Pass",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop",
    type: "STILL",
  },
  {
    title: "16mm Celluloid Camera Loading",
    role: "Arriflex 16SR3 Kodak 500T",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    type: "STILL",
  },
  {
    title: "Medium Format Fashion Studio",
    role: "Broncolor Parabolic Sculpting",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    type: "STILL",
  },
];

export default function ProofSection() {
  // Testimonials Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance testimonials every 6 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % siteConfig.testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % siteConfig.testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : siteConfig.testimonials.length - 1
    );
  };

  // Trigger contact form pre-selection
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
      {/* 1. CLIENT LOGO STRIP (Greyscale, Colour on hover) */}
      <div className="border-b border-hairline py-12 bg-surface">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 space-y-6">
          <div className="font-mono text-[10px] text-tungsten tracking-widest uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-tungsten inline-block" />
            TRUSTED BY DIRECTORS, FASHION HOUSES & COMMISSIONS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {siteConfig.clients.map((client, i) => (
              <div
                key={i}
                className="p-4 border border-hairline bg-elevated/60 hover:bg-elevated hover:border-tungsten transition-all duration-300 flex flex-col justify-center text-center group cursor-default"
              >
                <span className="font-sans font-medium text-xs text-primary/70 group-hover:text-primary transition-colors">
                  {client.name}
                </span>
                <span className="font-mono text-[9px] text-muted group-hover:text-tungsten transition-colors">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TESTIMONIALS (Large Serif Quote Carousel with Autoplay & Pause on Hover) */}
      <div
        className="max-w-[1440px] mx-auto px-5 md:px-10 py-24 md:py-36 border-b border-hairline"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div>
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-tungsten inline-block" />
              DIRECTOR & CLIENT ENDORSEMENTS
            </div>
            <h2 className="font-serif heading-display-lg text-primary">
              Words from the <span className="italic text-tungsten font-light">Set.</span>
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevTestimonial}
              data-cursor="hover"
              className="p-3 border border-hairline bg-surface hover:border-tungsten text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="font-mono text-xs text-tungsten tracking-widest px-2">
              {(testimonialIndex + 1).toString().padStart(2, "0")} / {siteConfig.testimonials.length.toString().padStart(2, "0")}
            </div>
            <button
              onClick={handleNextTestimonial}
              data-cursor="hover"
              className="p-3 border border-hairline bg-surface hover:border-tungsten text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="mt-14 relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 md:w-12 md:h-12 text-tungsten/60 flex-shrink-0 mt-1" />
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-normal leading-relaxed italic max-w-5xl">
                  &ldquo;{siteConfig.testimonials[testimonialIndex].quote}&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-hairline pl-12 md:pl-16">
                <div>
                  <div className="font-sans text-base text-primary font-medium">
                    {siteConfig.testimonials[testimonialIndex].author}
                  </div>
                  <div className="font-mono text-xs text-tungsten">
                    {siteConfig.testimonials[testimonialIndex].role} · {siteConfig.testimonials[testimonialIndex].company}
                  </div>
                </div>

                <div className="font-mono text-xs text-muted">
                  PROJECT: <span className="text-primary font-medium">{siteConfig.testimonials[testimonialIndex].project}</span> ({siteConfig.testimonials[testimonialIndex].location})
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. SERVICES & PACKAGES (3 Cards with Turnaround & "Get a quote" Form Sync) */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-24 md:py-36 border-b border-hairline">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            COMMISSION PACKAGES & RATES
          </div>
          <h2 className="font-serif heading-display-lg text-primary">
            Clear Scope. <span className="italic text-tungsten font-light">Turnaround Precision.</span>
          </h2>
          <p className="text-fluid-body text-muted font-light max-w-2xl mx-auto">
            Choose a standardized production package or commission a custom multi-camera campaign.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 border flex flex-col justify-between space-y-8 transition-colors duration-300 relative ${
                pkg.featured
                  ? "bg-elevated border-tungsten shadow-2xl"
                  : "bg-surface border-hairline hover:border-tungsten/60"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 right-6 bg-tungsten text-background font-mono text-[10px] uppercase tracking-widest px-3 py-0.5 font-bold">
                  FLAGSHIP CAMPAIGN
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-hairline pb-4">
                  <span className="text-tungsten font-semibold">{pkg.tier}</span>
                  <span>TURNAROUND: {pkg.turnaround}</span>
                </div>

                <div>
                  <h3 className="font-serif text-3xl text-primary mb-2">{pkg.title}</h3>
                  <p className="text-xs text-muted font-light leading-relaxed">{pkg.description}</p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2.5 pt-4 border-t border-hairline">
                  <div className="font-mono text-[10px] text-tungsten uppercase tracking-widest">
                    INCLUDED DELIVERABLES:
                  </div>
                  <ul className="space-y-2">
                    {pkg.deliverables.map((item, i) => (
                      <li key={i} className="text-xs text-primary/90 flex items-start gap-2.5 font-sans">
                        <Check className="w-3.5 h-3.5 text-tungsten flex-shrink-0 mt-0.5" />
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
                className={`w-full py-4 text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  pkg.featured
                    ? "bg-tungsten hover:bg-tungsten-hover text-background"
                    : "bg-elevated hover:bg-primary hover:text-background text-primary border border-hairline"
                }`}
              >
                <span>Get a Quote for {pkg.title.split(" ")[0]}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. GEAR / KIT SPEC-SHEET TABLE */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-24 md:py-36 border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div>
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-tungsten inline-block" />
              TECHNICAL ARSENAL SPEC-SHEET
            </div>
            <h2 className="font-serif heading-display-lg text-primary">
              Production <span className="italic text-tungsten font-light">Hardware</span> & Glass.
            </h2>
          </div>
          <div className="font-mono text-xs text-muted">
            OWNED & FLIGHT-READY · WORLDWIDE ATA CARNET
          </div>
        </div>

        {/* Minimal Spec-Sheet Table */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-hairline bg-surface text-muted text-[10px] tracking-widest uppercase">
                <th className="py-4 px-6">CATEGORY</th>
                <th className="py-4 px-6">PRIMARY SYSTEM / MODEL</th>
                <th className="py-4 px-6">TECHNICAL SPECIFICATION</th>
                <th className="py-4 px-6 text-right">PRODUCTION ROLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {siteConfig.gearKit.flatMap((cat) =>
                cat.items.map((item, idx) => (
                  <tr
                    key={item.name}
                    className="hover:bg-elevated/60 transition-colors group"
                  >
                    <td className="py-4 px-6 text-tungsten font-medium">
                      {idx === 0 ? cat.category : ""}
                    </td>
                    <td className="py-4 px-6 text-primary font-sans font-medium text-sm group-hover:text-tungsten transition-colors">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-muted font-mono text-xs">
                      {item.specs}
                    </td>
                    <td className="py-4 px-6 text-right text-primary/80 font-mono text-xs">
                      {item.role}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. AWARDS & PRESS STRIP */}
      <div className="py-16 bg-surface border-b border-hairline">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 space-y-8">
          <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            INTERNATIONAL RECOGNITION & CRAFT HONORS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="p-5 border border-hairline bg-elevated/70 space-y-2 hover:border-tungsten transition-colors"
              >
                <div className="font-mono text-[10px] font-bold text-tungsten tracking-widest uppercase">
                  [ {award.laurel} — {award.year} ]
                </div>
                <div className="font-serif text-lg text-primary">{award.title}</div>
                <div className="font-mono text-[11px] text-muted">{award.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. BEHIND-THE-SCENES (BTS) DRAG-SCROLL STRIP */}
      <div className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 mb-10 flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-2">
              {"// ON-LOCATION RESIDENCY"}
            </div>
            <h2 className="font-serif heading-display-md text-primary">
              Behind the <span className="italic text-tungsten font-light">Scenes.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-muted hidden sm:block">
            DRAG TO EXPLORE PRODUCTION RUSHES
          </div>
        </div>

        {/* Drag Scroll Strip */}
        <div
          data-cursor="drag"
          className="flex gap-6 overflow-x-auto pb-6 px-5 md:px-10 scrollbar-none cursor-grab active:cursor-grabbing"
        >
          {BTS_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="w-[320px] md:w-[420px] flex-shrink-0 border border-hairline bg-surface group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-background/85 border border-hairline font-mono text-[9px] text-tungsten uppercase tracking-widest">
                  {item.type}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="font-sans text-sm text-primary font-medium">{item.title}</div>
                <div className="font-mono text-[11px] text-muted">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
