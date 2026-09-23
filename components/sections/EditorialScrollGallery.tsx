"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function EditorialScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the pinned horizontal scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Transform for main horizontal track
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-78%"]);

  // Subtle counter parallax for the two floating gallery rows
  const row1Parallax = useTransform(smoothProgress, [0, 1], ["-90px", "90px"]);
  const row2Parallax = useTransform(smoothProgress, [0, 1], ["90px", "-90px"]);

  return (
    <div className="relative bg-[#08080A] text-[#F5F5F5] select-none">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#B8860B]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] bg-[#B8860B]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* Pinned Horizontal Scroll Section */}
      <section
        id="collection"
        ref={containerRef}
        className="relative h-[400vh] bg-[#08080A]"
      >
        {/* Sticky 100vh Viewport Stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#08080A] flex items-center border-t border-b border-white/[0.06]">
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] select-none">
            <span className="font-syncopate text-[60vw] text-white whitespace-nowrap leading-none font-bold tracking-tighter">
              COLLECTION
            </span>
          </div>

          {/* Horizontal Translating Track */}
          <motion.div
            style={{ x }}
            className="flex h-full items-center w-max pl-8 sm:pl-16 md:pl-48 pr-0 gap-[20vw] md:gap-[20vw] relative z-10"
          >
            {/* 1. PHILOSOPHY 01 INTRO */}
            <div className="w-[85vw] md:w-[40vw] flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <span className="w-10 h-[1px] bg-[#B8860B]" />
                <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">
                  Philosophy 01
                </span>
              </div>

              <h2 className="font-syncopate text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-white mb-8 md:mb-12 leading-[0.85] md:leading-[0.8] tracking-tighter uppercase font-bold">
                The Art of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-[#B8860B]">
                  Restraint.
                </span>
              </h2>

              <p className="font-outfit text-base md:text-xl text-white/50 max-w-sm md:max-w-md leading-relaxed pl-10 md:pl-12 relative border-l border-[#B8860B]/20">
                <span className="absolute -left-3 -top-2 text-[#B8860B] font-syncopate text-3xl md:text-4xl leading-none">
                  “
                </span>
                True luxury isn&apos;t about excess. It&apos;s about the perfect
                balance of space, light, and silence.
              </p>
            </div>

            {/* 2. PARALLAX FLOATING GALLERY CARDS */}
            <div className="w-fit h-screen flex flex-col justify-center gap-12 md:gap-24 shrink-0 py-12 md:py-16 pr-[15vw] md:pr-[20vw]">
              {/* Parallax Row 1 (Top Row) */}
              <motion.div
                style={{ x: row1Parallax }}
                className="parallax-row flex gap-8 md:gap-32 items-end h-[28vh] md:h-[35vh] -translate-x-16 md:-translate-x-32"
              >
                {/* Gallery Card 1 */}
                <div className="relative w-[50vw] md:w-[18vw] h-[85%] overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] shrink-0 translate-y-8 md:translate-y-12 group">
                  <Image
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
                    alt="Gallery 1"
                    fill
                    sizes="(max-width: 768px) 50vw, 18vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Gallery Card 2 */}
                <div className="relative w-[85vw] md:w-[55vw] h-full overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] shrink-0 group">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                    alt="Gallery 2"
                    fill
                    sizes="(max-width: 768px) 85vw, 55vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Gallery Card 3 */}
                <div className="relative w-[65vw] md:w-[30vw] h-[90%] overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] shrink-0 -translate-y-8 md:-translate-y-12 group">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                    alt="Gallery 3"
                    fill
                    sizes="(max-width: 768px) 65vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Parallax Row 2 (Bottom Row) */}
              <motion.div
                style={{ x: row2Parallax }}
                className="parallax-row flex gap-8 md:gap-32 items-center h-[32vh] md:h-[50vh] translate-x-16 md:translate-x-32"
              >
                {/* Gallery Card 4 */}
                <div className="relative w-[75vw] md:w-[35vw] h-full overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] shrink-0 -translate-y-10 md:-translate-y-16 group">
                  <Image
                    src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop"
                    alt="Gallery 4"
                    fill
                    sizes="(max-width: 768px) 75vw, 35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Gallery Card 5 */}
                <div className="relative w-[90vw] md:w-[60vw] h-[85%] overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] shrink-0 group">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop"
                    alt="Gallery 5"
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card 6: Dark Essence of Light Text Plaque */}
                <div className="relative w-[60vw] md:w-[25vw] h-[70%] overflow-hidden rounded-sm bg-[#101013] border border-[#B8860B]/30 shadow-[0_25px_50px_rgba(0,0,0,0.85)] flex items-center justify-center p-8 md:p-12 shrink-0 translate-y-12 md:translate-y-20 relative group hover:border-[#B8860B]/60 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <h3 className="relative z-10 font-syncopate text-lg sm:text-xl md:text-3xl text-white text-center uppercase tracking-widest leading-none font-bold">
                    Essence
                    <br />
                    <span className="text-[#B8860B]">of Light</span>
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* 3. PROCESS 02 (VISION TO REALITY) */}
            <div className="w-[85vw] md:w-[65vw] h-screen flex items-center shrink-0">
              <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                {/* Process Image */}
                <div className="relative w-full md:w-1/2 h-[45%] md:h-full overflow-hidden rounded-sm border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-neutral-900 group">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
                    alt="Architectural Process"
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Process Text */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-[1px] bg-[#B8860B]" />
                    <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">
                      Process 02
                    </span>
                  </div>

                  <h2 className="font-syncopate text-3xl sm:text-4xl md:text-7xl text-white leading-none uppercase font-bold tracking-tight">
                    Vision to
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#B8860B]">
                      Reality.
                    </span>
                  </h2>

                  <p className="font-outfit text-sm sm:text-base md:text-xl text-white/60 leading-relaxed max-w-md">
                    Every project begins with a single line. We navigate the
                    complexities of form and function to distill your
                    aspirations into a cohesive spatial narrative.
                  </p>

                  <div className="flex gap-12 md:gap-16 mt-2 md:mt-4">
                    <div>
                      <div className="font-syncopate text-2xl sm:text-3xl md:text-5xl text-white mb-1 md:mb-2 font-bold">
                        120+
                      </div>
                      <div className="font-outfit text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#B8860B] font-bold">
                        Sketches
                      </div>
                    </div>
                    <div>
                      <div className="font-syncopate text-2xl sm:text-3xl md:text-5xl text-white mb-1 md:mb-2 font-bold">
                        45
                      </div>
                      <div className="font-outfit text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#B8860B] font-bold">
                        Artisans
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. THE OUTCOME (SILENT LUXURY FULL-VIEW MASTERPIECE) */}
            <div className="w-[95vw] md:w-[100vw] h-screen flex items-center justify-center shrink-0 pl-6 sm:pl-12 md:pl-32 pr-6 md:pr-16">
              <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] overflow-hidden rounded-sm group border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.9)] bg-neutral-900">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
                  alt="Luxury Masterpiece"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-10 sm:bottom-16 md:bottom-32 left-8 sm:left-12 md:left-32 max-w-3xl z-10">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="w-10 md:w-12 h-[1px] bg-[#B8860B]" />
                    <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#F5F5F5] font-bold">
                      The Outcome
                    </span>
                  </div>

                  <h2 className="font-syncopate text-5xl sm:text-6xl md:text-[9vw] text-[#F5F5F5] leading-[0.85] md:leading-[0.8] mb-8 md:mb-12 uppercase font-bold tracking-tighter">
                    SILENT
                    <br />
                    <span className="text-[#B8860B]">LUXURY.</span>
                  </h2>

                  <a
                    href="#work"
                    className="inline-block group/btn relative px-8 sm:px-12 py-4 sm:py-6 overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-[#B8860B] transition-transform duration-700 ease-out -translate-x-full group-hover/btn:translate-x-0" />
                    <span className="relative z-10 text-white font-outfit uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold transition-colors duration-500">
                      Explore the Portfolio
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. INFINITE LUXURY MARQUEE TICKER BANNER */}
      <div className="relative w-full overflow-hidden py-5 select-none bg-[#050507] border-b border-white/[0.06]">
        <div className="flex whitespace-nowrap animate-[marquee-left_30s_linear_infinite] w-max">
          {[
            "Architectural Precision",
            "Quiet Luxury",
            "Bespoke Interiors",
            "Silent Opulence",
            "Material Curation",
            "Spatial Narratives",
            "Architectural Precision",
            "Quiet Luxury",
            "Bespoke Interiors",
            "Silent Opulence",
            "Material Curation",
            "Spatial Narratives",
            "Architectural Precision",
            "Quiet Luxury",
            "Bespoke Interiors",
            "Silent Opulence",
            "Material Curation",
            "Spatial Narratives",
          ].map((text, idx) => (
            <React.Fragment key={idx}>
              <span className="inline-flex items-center gap-6 mx-6 font-outfit text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#F5F5F5]/80">
                {text}
              </span>
              <span className="inline-flex items-center text-[#B8860B] text-xs">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
