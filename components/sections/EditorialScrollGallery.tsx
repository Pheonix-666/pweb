"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Film, Camera, Sparkles, ArrowUpRight } from "lucide-react";

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
            <span className="font-syncopate text-[55vw] text-white whitespace-nowrap leading-none font-bold tracking-tighter">
              CINEMA
            </span>
          </div>

          {/* Horizontal Translating Track */}
          <motion.div
            style={{ x }}
            className="flex h-full items-center w-max pl-8 sm:pl-16 md:pl-48 pr-0 gap-[20vw] md:gap-[20vw] relative z-10"
          >
            {/* 1. ESSAY 01: THE ANATOMY OF SHADOW */}
            <div className="w-[85vw] md:w-[40vw] flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <span className="w-10 h-[1px] bg-[#B8860B]" />
                <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">
                  Essay 01 // Vision
                </span>
              </div>

              <h2 className="font-syncopate text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-white mb-8 md:mb-12 leading-[0.85] md:leading-[0.8] tracking-tighter uppercase font-bold">
                The Art of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-[#B8860B]">
                  Shadow.
                </span>
              </h2>

              <p className="font-outfit text-base md:text-xl text-white/50 max-w-sm md:max-w-md leading-relaxed pl-10 md:pl-12 relative border-l border-[#B8860B]/20">
                <span className="absolute -left-3 -top-2 text-[#B8860B] font-syncopate text-3xl md:text-4xl leading-none">
                  “
                </span>
                True cinematic mastery is not how much light you throw into the frame, but what you choose to leave in absolute darkness.
              </p>
            </div>

            {/* 2. PARALLAX FLOATING CINEMATOGRAPHY STILLS */}
            <div className="w-fit h-screen flex flex-col justify-center gap-12 md:gap-24 shrink-0 py-12 md:py-16 pr-[15vw] md:pr-[20vw]">
              {/* Parallax Row 1 (Top Row) */}
              <motion.div
                style={{ x: row1Parallax }}
                className="parallax-row flex gap-8 md:gap-32 items-end h-[28vh] md:h-[35vh] -translate-x-16 md:-translate-x-32"
              >
                {/* Frame Card 1: Horology Macro */}
                <div className="relative w-[50vw] md:w-[18vw] h-[85%] overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] shrink-0 translate-y-8 md:translate-y-12 group">
                  <Image
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
                    alt="Horology Macro Still"
                    fill
                    sizes="(max-width: 768px) 50vw, 18vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#B8860B] uppercase tracking-widest">
                    4.5K OPEN GATE
                  </div>
                </div>

                {/* Frame Card 2: Editorial Fashion Medium Format */}
                <div className="relative w-[85vw] md:w-[55vw] h-full overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] shrink-0 group">
                  <Image
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                    alt="Medium Format Fashion Editorial"
                    fill
                    sizes="(max-width: 768px) 85vw, 55vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/80 uppercase tracking-widest">
                    HASSELBLAD 100MP // MAISON DE L&apos;OMBRE
                  </div>
                </div>

                {/* Frame Card 3: Anamorphic Neon Flare */}
                <div className="relative w-[65vw] md:w-[30vw] h-[90%] overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] shrink-0 -translate-y-8 md:-translate-y-12 group">
                  <Image
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"
                    alt="Anamorphic Music Video Still"
                    fill
                    sizes="(max-width: 768px) 65vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#B8860B] uppercase tracking-widest">
                    ATLAS ORION 2X ANAMORPHIC
                  </div>
                </div>
              </motion.div>

              {/* Parallax Row 2 (Bottom Row) */}
              <motion.div
                style={{ x: row2Parallax }}
                className="parallax-row flex gap-8 md:gap-32 items-center h-[32vh] md:h-[50vh] translate-x-16 md:translate-x-32"
              >
                {/* Frame Card 4: Hypercar Chase Track */}
                <div className="relative w-[75vw] md:w-[35vw] h-full overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] shrink-0 -translate-y-10 md:-translate-y-16 group">
                  <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                    alt="Hypercar Pursuit Still"
                    fill
                    sizes="(max-width: 768px) 75vw, 35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/80 uppercase tracking-widest">
                    VELOCE GT // 120 FPS HIGH SPEED
                  </div>
                </div>

                {/* Frame Card 5: Nordic Monograph */}
                <div className="relative w-[90vw] md:w-[60vw] h-[85%] overflow-hidden rounded-sm bg-[#121214] border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] shrink-0 group">
                  <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop"
                    alt="Nordic Documentary Still"
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/80 uppercase tracking-widest">
                    ICELANDIC MONOGRAPH // 16MM KODAK 500T
                  </div>
                </div>

                {/* Card 6: Gold Optical Plaque */}
                <div className="relative w-[60vw] md:w-[25vw] h-[70%] overflow-hidden rounded-sm bg-[#101013] border border-[#B8860B]/30 shadow-[0_25px_50px_rgba(0,0,0,0.85)] flex items-center justify-center p-8 md:p-12 shrink-0 translate-y-12 md:translate-y-20 relative group hover:border-[#B8860B]/60 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <h3 className="relative z-10 font-syncopate text-lg sm:text-xl md:text-3xl text-white text-center uppercase tracking-widest leading-none font-bold">
                    Optics &
                    <br />
                    <span className="text-[#B8860B]">Celluloid</span>
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* 3. ESSAY 02: CELLULOID RHYTHM */}
            <div className="w-[85vw] md:w-[65vw] h-screen flex items-center shrink-0">
              <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                {/* Process Image */}
                <div className="relative w-full md:w-1/2 h-[45%] md:h-full overflow-hidden rounded-sm border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-neutral-900 group">
                  <Image
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop"
                    alt="Celluloid Film Camera Direction"
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#B8860B] uppercase tracking-widest">
                    ARRIFLEX 16SR3 // T1.3 ZEISS SUPER SPEED
                  </div>
                </div>

                {/* Process Text */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-[1px] bg-[#B8860B]" />
                    <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">
                      Process 02 // Pacing
                    </span>
                  </div>

                  <h2 className="font-syncopate text-3xl sm:text-4xl md:text-7xl text-white leading-none uppercase font-bold tracking-tight">
                    Rhythm to
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#B8860B]">
                      Reel.
                    </span>
                  </h2>

                  <p className="font-outfit text-sm sm:text-base md:text-xl text-white/60 leading-relaxed max-w-md">
                    Every cut is an emotional compression of time. We fuse large-format anamorphic framing with visceral editing rhythm and hardware-calibrated ACES 1.3 color grading.
                  </p>

                  <div className="flex gap-12 md:gap-16 mt-2 md:mt-4">
                    <div>
                      <div className="font-syncopate text-2xl sm:text-3xl md:text-5xl text-white mb-1 md:mb-2 font-bold">
                        17+
                      </div>
                      <div className="font-outfit text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#B8860B] font-bold">
                        Stops Dynamic Range
                      </div>
                    </div>
                    <div>
                      <div className="font-syncopate text-2xl sm:text-3xl md:text-5xl text-white mb-1 md:mb-2 font-bold">
                        24FPS
                      </div>
                      <div className="font-outfit text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#B8860B] font-bold">
                        Pure Cinema Cadence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. THE OUTCOME: VISCERAL CINEMA MASTERPIECE */}
            <div className="w-[95vw] md:w-[100vw] h-screen flex items-center justify-center shrink-0 pl-6 sm:pl-12 md:pl-32 pr-6 md:pr-16">
              <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[85vh] overflow-hidden rounded-sm group border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.9)] bg-neutral-900">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop"
                  alt="Cinematic Masterpiece"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-10 sm:bottom-16 md:bottom-32 left-8 sm:left-12 md:left-32 max-w-3xl z-10">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="w-10 md:w-12 h-[1px] bg-[#B8860B]" />
                    <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#F5F5F5] font-bold">
                      The Culmination
                    </span>
                  </div>

                  <h2 className="font-syncopate text-5xl sm:text-6xl md:text-[9vw] text-[#F5F5F5] leading-[0.85] md:leading-[0.8] mb-8 md:mb-12 uppercase font-bold tracking-tighter">
                    VISCERAL
                    <br />
                    <span className="text-[#B8860B]">CINEMA.</span>
                  </h2>

                  <a
                    href="#work"
                    className="inline-block group/btn relative px-8 sm:px-12 py-4 sm:py-6 overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-[#B8860B] transition-transform duration-700 ease-out -translate-x-full group-hover/btn:translate-x-0" />
                    <span className="relative z-10 text-white font-outfit uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold transition-colors duration-500">
                      Explore Selected Works
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. INFINITE CINEMA TICKER BANNER */}
      <div className="relative w-full overflow-hidden py-5 select-none bg-[#050507] border-b border-white/[0.06]">
        <div className="flex whitespace-nowrap animate-[marquee-left_30s_linear_infinite] w-max">
          {[
            "Large Format Cinema",
            "ACES 1.3 Color Suite",
            "Tactile Medium Format Stills",
            "Anamorphic 2X Optics",
            "Chiaroscuro Negative Fill",
            "16mm Kodak Vision3",
            "Haute Horlogerie Direction",
            "17+ Stops Latitude",
            "Large Format Cinema",
            "ACES 1.3 Color Suite",
            "Tactile Medium Format Stills",
            "Anamorphic 2X Optics",
            "Chiaroscuro Negative Fill",
            "16mm Kodak Vision3",
            "Haute Horlogerie Direction",
            "17+ Stops Latitude",
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
