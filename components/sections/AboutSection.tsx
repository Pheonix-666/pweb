"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, Film, Sparkles, Award } from "lucide-react";
import { siteConfig } from "@/data/site";

const CAREER_TIMELINE = [
  {
    year: "2016",
    milestone: "Studio Inception",
    detail: "Founded independent creative studio focusing on 16mm celluloid & medium format editorial portraiture.",
  },
  {
    year: "2019",
    milestone: "European & Nordic Expansion",
    detail: "Directed luxury destination cinema in Lake Como and landscape observational documentary in Iceland.",
  },
  {
    year: "2022",
    milestone: "8K Large Format & ACES Pipeline",
    detail: "Standardized all commercial productions to ARRIRAW / REDCODE 8K with hardware-calibrated ACES 1.3 color suite.",
  },
  {
    year: "2024",
    milestone: "Commercial Horology & Automotive",
    detail: "Lead DP on global campaigns for Atelier Vaucanson and Veloce Electric GT. Winner of Paris Craft Film Festival.",
  },
];

const SOCIAL_LINKS = [
  { platform: "Instagram", handle: "@rahulverma.cinema", href: "https://instagram.com" },
  { platform: "Vimeo", handle: "vimeo.com/rahulverma", href: "https://vimeo.com" },
  { platform: "YouTube", handle: "Rahul Singh Cinema", href: "https://youtube.com" },
  { platform: "Behance", handle: "behance.net/rahulverma", href: "https://behance.net" },
  { platform: "LinkedIn", handle: "linkedin.com/in/rahulverma", href: "https://linkedin.com" },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll for portrait
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Parallax on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 md:py-36 border-b border-hairline bg-background select-none relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div>
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-tungsten inline-block" />
              STUDIO MANIFESTO & PROFILE
            </div>
            <h2 className="font-serif heading-display-lg text-primary">
              Behind the <span className="italic text-tungsten font-light">Vision.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-muted">
            FOUNDED 2016 · MUMBAI / WORLDWIDE MOBILITY
          </div>
        </div>

        {/* Split Parallax Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mt-16 items-start">
          {/* Left Column: Large Portrait with Parallax */}
          <div className="lg:col-span-5 relative aspect-[4/5] border border-hairline bg-surface overflow-hidden group">
            <motion.div style={{ y: portraitY }} className="relative w-full h-[115%] -top-[7%]">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
                alt="Rahul Singh - Director, Cinematographer & Editor"
                fill
                priority
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Bottom HUD Name Card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-surface/90 border border-hairline backdrop-blur-md">
              <div className="flex items-center justify-between font-mono text-[10px] text-tungsten uppercase tracking-widest mb-1">
                <span>PRINCIPAL ARTIST</span>
                <span className="timecode-badge text-[9px]">DP / EDITOR</span>
              </div>
              <div className="font-serif text-2xl text-primary">{siteConfig.name}</div>
              <div className="font-mono text-xs text-muted mt-0.5">{siteConfig.title}</div>
            </div>
          </div>

          {/* Right Column: Bio, "Currently" Block, Mini Timeline, Socials */}
          <div className="lg:col-span-7 space-y-12">
            {/* First-person Bio */}
            <div className="space-y-6">
              <p className="font-serif text-2xl sm:text-3xl text-primary font-normal leading-snug">
                “I believe cinematic imagery shouldn&apos;t just document a moment; it must sculpt an emotional atmosphere through deliberate shadow and psychological rhythm.”
              </p>
              <p className="text-sm md:text-base text-primary/80 font-light leading-relaxed">
                As a director, cinematographer, and finishing colorist, I operate as an all-inclusive creative studio. By bridging the gap between on-set camera direction and surgical post-production rhythm, every production maintains unbroken artistic integrity from the initial treatment to the final ProRes 4444 XQ master.
              </p>
            </div>

            {/* "Currently" Telemetry Block */}
            <div className="p-6 md:p-8 border border-hairline bg-surface space-y-4">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                {"// CURRENT PRODUCTION STATUS"}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="space-y-1 p-3 bg-elevated border border-hairline">
                  <span className="text-[10px] text-muted uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-tungsten" /> BASED IN:
                  </span>
                  <span className="text-primary font-medium block">{siteConfig.location}</span>
                </div>

                <div className="space-y-1 p-3 bg-elevated border border-hairline">
                  <span className="text-[10px] text-muted uppercase flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-status-green" /> AVAILABLE FROM:
                  </span>
                  <span className="text-status-green font-medium block">Select Q3/Q4 Dates</span>
                </div>

                <div className="space-y-1 p-3 bg-elevated border border-hairline">
                  <span className="text-[10px] text-muted uppercase flex items-center gap-1.5">
                    <Film className="w-3 h-3 text-rec" /> CURRENT SHOOT:
                  </span>
                  <span className="text-primary font-medium block truncate">Luxury Horology Film</span>
                </div>
              </div>
            </div>

            {/* Mini Career Timeline */}
            <div className="space-y-6 pt-4">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                {"// CAREER TIMELINE & EVOLUTION"}
              </div>

              <div className="relative border-l border-hairline ml-3 space-y-8 pl-6">
                {CAREER_TIMELINE.map((item) => (
                  <div key={item.year} className="relative space-y-1">
                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-tungsten border-2 border-background" />
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-tungsten font-semibold">{item.year}</span>
                      <span className="text-white/20">|</span>
                      <span className="text-primary font-medium">{item.milestone}</span>
                    </div>
                    <p className="text-xs text-muted font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Ecosystem Links */}
            <div className="space-y-4 pt-6 border-t border-hairline">
              <div className="font-mono text-xs text-muted tracking-widest uppercase">
                {"// SOCIAL ECOSYSTEM & ARCHIVES"}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="p-3.5 border border-hairline bg-surface hover:border-tungsten transition-all duration-300 flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-mono text-xs text-primary group-hover:text-tungsten transition-colors font-medium">
                        {social.platform}
                      </div>
                      <div className="font-mono text-[9px] text-muted truncate max-w-[120px]">
                        {social.handle}
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-tungsten group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
