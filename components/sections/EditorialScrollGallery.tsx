"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EditorialScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(0);

  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const distance = Math.max(0, trackWidth - windowWidth);
        setMaxDistance(distance);
      }
    };

    updateDistance();
    // Run after images/layout settle
    const timer = setTimeout(updateDistance, 300);
    window.addEventListener("resize", updateDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  // Scroll progress for the pinned horizontal scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // When maxDistance is measured, translate exactly to bring Section 4 dead-center at 0.85, then hold stationary till 1.0
  const x = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [`0px`, `-${maxDistance || 2400}px`, `-${maxDistance || 2400}px`]
  );

  // 3D perspective tilt — track starts slightly angled back, flattens as you scroll
  const trackRotateX = useTransform(scrollYProgress, [0, 0.35, 1], [5, 1.5, 0]);

  // Row parallaxes — gentle range for smooth velocity
  const row1Parallax = useTransform(scrollYProgress, [0, 0.85, 1], ["-50px", "65px", "65px"]);
  const row2Parallax = useTransform(scrollYProgress, [0, 0.85, 1], ["65px", "-65px", "-65px"]);
  const row3Parallax = useTransform(scrollYProgress, [0, 0.85, 1], ["-75px", "85px", "85px"]);

  // Subtle scale-up from slightly small to fill — reinforces depth
  const trackScale = useTransform(scrollYProgress, [0, 0.25], [0.97, 1]);

  return (
    <div className="relative z-20 bg-background text-primary select-none shadow-[0_-60px_140px_rgba(0,0,0,0.8),0_-20px_50px_rgba(0,0,0,0.6)]">

      {/* Pinned Horizontal Scroll Section */}
      <section
        id="collection"
        ref={containerRef}
        className="relative h-[480vh] sm:h-[620vh] md:h-[750vh] bg-background"
      >
        {/* Sticky Viewport Stage — perspective wrapper for 3D depth */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background flex items-center border-t border-hairline [perspective:1200px] [perspective-origin:50%_55%]">
          {/* Background Watermark — hidden on mobile */}
          <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <span className="font-orbitron text-[35vw] md:text-[45vw] text-primary whitespace-nowrap leading-none font-black tracking-tighter">
              CINEMA
            </span>
          </div>

          {/* Horizontal Translating Track — 3D tilted */}
          <motion.div
            ref={trackRef}
            style={{ x, rotateX: trackRotateX, scale: trackScale }}
            className="flex h-full items-center w-max pl-6 sm:pl-12 md:pl-24 pr-0 gap-[10vw] sm:gap-[14vw] md:gap-[16vw] relative z-10 will-change-transform [transform-style:preserve-3d]"
          >
            {/* 1. ESSAY 01: THE ANATOMY OF SHADOW */}
            <div className="w-[85vw] sm:w-[60vw] md:w-[40vw] max-w-[65ch] flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 md:mb-8">
                <span className="w-8 md:w-10 h-[1px] bg-[#A855F7]" />
                <span className="font-orbitron text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#A855F7] font-bold">
                  Essay 01 // Vision
                </span>
              </div>

              <h2 className="font-orbitron text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-primary mb-6 md:mb-8 leading-[0.95] tracking-tight uppercase font-black">
                The Art of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-200 to-[#A855F7]">
                  Shadow.
                </span>
              </h2>

              <p className="font-outfit text-sm sm:text-base md:text-xl text-muted max-w-[65ch] leading-relaxed pl-6 sm:pl-8 md:pl-12 relative border-l border-[#A855F7]/30">
                <span className="absolute -left-2.5 sm:-left-3 -top-2 text-[#A855F7] font-serif text-2xl sm:text-3xl md:text-4xl leading-none">
                  “
                </span>
                True cinematic mastery is not how much light you throw into the frame, but what you choose to leave in absolute darkness.
              </p>
            </div>

            {/* 2. PARALLAX FLOATING GALLERY (3 ROWS — DEPTH-STACKED IN 3D) */}
            <div className="w-fit h-[100svh] flex flex-col justify-center shrink-0 py-2 sm:py-4 md:py-4 pr-[15vw] md:pr-[24vw] relative z-10 [transform-style:preserve-3d]">
              {/* Row 1 */}
              <motion.div
                style={{ x: row1Parallax, rotateX: 4, translateZ: -30 }}
                className="parallax-row flex gap-8 sm:gap-16 md:gap-24 items-end h-[24vh] sm:h-[28vh] md:h-[31vh] -translate-x-6 md:-translate-x-16 relative z-10 [transform-style:preserve-3d]"
              >
                {/* Frame Card 1: Horology Macro */}
                <div className="relative w-[52vw] sm:w-[34vw] md:w-[19vw] h-[85%] overflow-hidden rounded-sm bg-surface border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] shrink-0 translate-y-6 md:translate-y-12 z-10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=60&w=600&auto=format&fit=crop"
                    alt="Horology Macro Still"
                    fill
                    sizes="(max-width: 768px) 52vw, 19vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    4.5K OPEN GATE
                  </div>
                </div>

                {/* Frame Card 2: Editorial Fashion Medium Format */}
                <div className="relative w-[75vw] sm:w-[60vw] md:w-[45vw] h-full overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_40px_90px_rgba(0,0,0,0.85)] shrink-0 translate-y-4 md:translate-y-8 z-20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=60&w=700&auto=format&fit=crop"
                    alt="Medium Format Fashion Editorial"
                    fill
                    sizes="(max-width: 768px) 75vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-primary/90 uppercase tracking-widest font-medium">
                    HASSELBLAD 100MP // MAISON DE L&apos;OMBRE
                  </div>
                </div>

                {/* Frame Card 3: Anamorphic Neon Flare */}
                <div className="relative w-[54vw] sm:w-[40vw] md:w-[26vw] h-[90%] overflow-hidden rounded-sm bg-surface border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] shrink-0 translate-y-6 md:translate-y-10 z-10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=60&w=600&auto=format&fit=crop"
                    alt="Anamorphic Music Video Still"
                    fill
                    sizes="(max-width: 768px) 54vw, 26vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    ATLAS ORION 2X ANAMORPHIC
                  </div>
                </div>

                {/* Frame Card 4: Architecture Spatial Rig */}
                <div className="relative w-[65vw] sm:w-[50vw] md:w-[35vw] h-full overflow-hidden rounded-sm bg-surface border border-white/15 shadow-[0_35px_80px_rgba(0,0,0,0.8)] shrink-0 translate-y-4 md:translate-y-8 z-20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=60&w=700&auto=format&fit=crop"
                    alt="Brutalist Spatial Rig"
                    fill
                    sizes="(max-width: 768px) 65vw, 35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    SPATIAL RIG // 8K ARCHITECTURE
                  </div>
                </div>

                {/* Frame Card 5: Celluloid Film 16mm Loading */}
                <div className="relative w-[50vw] sm:w-[36vw] md:w-[24vw] h-[88%] overflow-hidden rounded-sm bg-surface border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] shrink-0 translate-y-6 md:translate-y-12 z-10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=60&w=700&auto=format&fit=crop"
                    alt="Celluloid Film Camera"
                    fill
                    sizes="(max-width: 768px) 50vw, 24vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-primary/90 uppercase tracking-widest font-medium">
                    16MM KODAK 500T CELLULOID
                  </div>
                </div>
              </motion.div>

              {/* Row 2 */}
              <motion.div
                style={{ x: row2Parallax, rotateX: 0, translateZ: 0 }}
                className="parallax-row flex gap-8 sm:gap-16 md:gap-24 items-center h-[30vh] sm:h-[36vh] md:h-[42vh] translate-x-8 md:translate-x-24 -my-6 sm:-my-8 md:-my-12 relative z-30 [transform-style:preserve-3d]"
              >
                {/* Frame Card 6: Hypercar Chase Track */}
                <div className="relative w-[70vw] sm:w-[54vw] md:w-[38vw] h-full overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_45px_110px_rgba(0,0,0,0.9)] shrink-0 -translate-y-8 md:-translate-y-12 z-20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=60&w=700&auto=format&fit=crop"
                    alt="Hypercar Pursuit Still"
                    fill
                    sizes="(max-width: 768px) 70vw, 38vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-primary/90 uppercase tracking-widest font-medium">
                    VELOCE GT // 120 FPS HIGH SPEED
                  </div>
                </div>

                {/* Frame Card 7: Nordic Monograph */}
                <div className="relative w-[78vw] sm:w-[65vw] md:w-[52vw] h-[92%] overflow-hidden rounded-sm bg-surface border border-white/25 shadow-[0_50px_120px_rgba(0,0,0,0.9)] shrink-0 translate-y-6 md:translate-y-12 z-30 group">
                  <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=60&w=700&auto=format&fit=crop"
                    alt="Nordic Documentary Still"
                    fill
                    sizes="(max-width: 768px) 78vw, 52vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-primary/90 uppercase tracking-widest font-medium">
                    ICELANDIC MONOGRAPH // EXPEDITION
                  </div>
                </div>

                {/* Frame Card 8: Violet Optical Plaque */}
                <div className="relative w-[48vw] sm:w-[34vw] md:w-[24vw] h-[78%] overflow-hidden rounded-sm bg-surface border border-[#A855F7]/40 shadow-[0_35px_80px_rgba(0,0,0,0.85)] flex items-center justify-center p-6 sm:p-8 md:p-10 shrink-0 -translate-y-6 md:-translate-y-8 z-20 group hover:border-[#A855F7]/70 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/15 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                  <h3 className="relative z-10 font-orbitron text-xs sm:text-sm md:text-xl text-primary text-center uppercase tracking-wider leading-tight font-bold">
                    Optics &
                    <br />
                    <span className="text-[#A855F7]">Celluloid</span>
                  </h3>
                </div>

                {/* Frame Card 9: High-Speed Pursuit MotoCrane */}
                <div className="relative w-[70vw] sm:w-[56vw] md:w-[40vw] h-full overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_45px_110px_rgba(0,0,0,0.9)] shrink-0 translate-y-8 md:translate-y-12 z-30 group">
                  <Image
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=700&auto=format&fit=crop"
                    alt="MotoCrane Pursuit Pass"
                    fill
                    sizes="(max-width: 768px) 70vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    MOTOCRANE ULTRA // PURSUIT PASS
                  </div>
                </div>

                {/* Frame Card 10: Luxury Perfumery Flacon */}
                <div className="relative w-[50vw] sm:w-[36vw] md:w-[26vw] h-[85%] overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_35px_80px_rgba(0,0,0,0.85)] shrink-0 -translate-y-8 md:-translate-y-12 z-20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=60&w=600&auto=format&fit=crop"
                    alt="Amber Flacon Lighting"
                    fill
                    sizes="(max-width: 768px) 50vw, 26vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-primary/90 uppercase tracking-widest font-medium">
                    MAISON BOTANIQUE // AMBER FLACON
                  </div>
                </div>

                {/* Frame Card 11: Noir Luxury Sculpture Still */}
                <div className="relative w-[72vw] sm:w-[58vw] md:w-[42vw] h-[92%] overflow-hidden rounded-sm bg-surface border border-white/25 shadow-[0_45px_110px_rgba(0,0,0,0.9)] shrink-0 translate-y-6 md:translate-y-10 z-30 group">
                  <Image
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=60&w=700&auto=format&fit=crop"
                    alt="Noir Cosmetic Lighting on Stone"
                    fill
                    sizes="(max-width: 768px) 72vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    CHIAROSCURO SCULPTURAL STILL
                  </div>
                </div>
              </motion.div>

              {/* Row 3 */}
              <motion.div
                style={{ x: row3Parallax, rotateX: -4, translateZ: 30 }}
                className="parallax-row flex gap-8 sm:gap-16 md:gap-24 items-start h-[24vh] sm:h-[28vh] md:h-[31vh] -translate-x-12 md:-translate-x-24 relative z-20 [transform-style:preserve-3d]"
              >
                {/* Frame Card 12: DaVinci ACES Color Rig */}
                <div className="relative w-[66vw] sm:w-[50vw] md:w-[36vw] h-full overflow-hidden rounded-sm bg-surface border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] shrink-0 -translate-y-6 md:-translate-y-12 z-10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=60&w=700&auto=format&fit=crop"
                    alt="DaVinci Resolve Color Grading Suite"
                    fill
                    sizes="(max-width: 768px) 66vw, 36vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    DAVINCI ACES 1.3 // SONY BVM-HX310
                  </div>
                </div>

                {/* Frame Card 13: High-Concept Chiaroscuro Portrait */}
                <div className="relative w-[50vw] sm:w-[36vw] md:w-[24vw] h-[92%] overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_40px_90px_rgba(0,0,0,0.85)] shrink-0 -translate-y-4 md:-translate-y-8 z-20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=700&auto=format&fit=crop"
                    alt="High-Concept Chiaroscuro Portrait"
                    fill
                    sizes="(max-width: 768px) 50vw, 24vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-primary/90 uppercase tracking-widest font-medium">
                    KODAK TRI-X 400 // CHIAROSCURO
                  </div>
                </div>

                {/* Frame Card 14: On-Location ARRI Alexa Rig */}
                <div className="relative w-[68vw] sm:w-[52vw] md:w-[38vw] h-[90%] overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_35px_80px_rgba(0,0,0,0.8)] shrink-0 -translate-y-6 md:-translate-y-8 z-10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=60&w=700&auto=format&fit=crop"
                    alt="Cinema Rig On Location"
                    fill
                    sizes="(max-width: 768px) 68vw, 38vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    ARRI ALEXA MINI LF // ON-SET RIG
                  </div>
                </div>

                {/* Frame Card 15: Broncolor Parabolic Studio */}
                <div className="relative w-[54vw] sm:w-[40vw] md:w-[28vw] h-full overflow-hidden rounded-sm bg-surface border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] shrink-0 -translate-y-4 md:-translate-y-8 z-20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=60&w=650&auto=format&fit=crop"
                    alt="Medium Format Product Studio"
                    fill
                    sizes="(max-width: 768px) 54vw, 28vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[8px] sm:text-[9px] text-primary/90 uppercase tracking-widest font-medium">
                    BRONCOLOR PARABOLIC // 100MP
                  </div>
                </div>

                {/* Frame Card 16: Night City Anamorphic Master */}
                <div className="relative w-[74vw] sm:w-[58vw] md:w-[42vw] h-[90%] overflow-hidden rounded-sm bg-surface border border-white/20 shadow-[0_40px_90px_rgba(0,0,0,0.85)] shrink-0 -translate-y-6 md:-translate-y-12 z-10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=60&w=700&auto=format&fit=crop"
                    alt="Night Anamorphic Master"
                    fill
                    sizes="(max-width: 768px) 74vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    NEON NOIR // MASTER FINISH
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 3. ESSAY 02: CELLULOID RHYTHM */}
            <div className="w-[85vw] sm:w-[75vw] md:w-[65vw] h-[100svh] flex items-center shrink-0">
              <div className="relative w-full h-[65vh] sm:h-[70vh] md:h-[75vh] flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-16 items-center justify-center">
                {/* Process Image */}
                <div className="relative w-full md:w-1/2 h-[42%] md:h-full overflow-hidden rounded-sm border border-hairline shadow-[0_40px_100px_rgba(0,0,0,0.7)] bg-surface group">
                  <Image
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=60&w=700&auto=format&fit=crop"
                    alt="Celluloid Film Camera Direction"
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] text-[#A855F7] uppercase tracking-widest font-semibold">
                    ARRIFLEX 16SR3 // T1.3 ZEISS SUPER SPEED
                  </div>
                </div>

                {/* Process Text */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-8 max-w-[65ch]">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="w-8 md:w-10 h-[1px] bg-[#A855F7]" />
                    <span className="font-orbitron text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#A855F7] font-bold">
                      Process 02 // Pacing
                    </span>
                  </div>

                  <h2 className="font-orbitron text-2xl sm:text-4xl md:text-6xl text-primary leading-none uppercase font-black tracking-tight">
                    Rhythm to
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-200 to-[#A855F7]">
                      Reel.
                    </span>
                  </h2>

                  <p className="font-outfit text-xs sm:text-sm md:text-xl text-muted leading-relaxed max-w-[65ch]">
                    Every cut is an emotional compression of time. We fuse large-format anamorphic framing with visceral editing rhythm and hardware-calibrated ACES 1.3 color grading.
                  </p>

                  <div className="flex gap-8 sm:gap-12 md:gap-16 mt-2 md:mt-4">
                    <div>
                      <div className="font-orbitron text-xl sm:text-3xl md:text-4xl text-primary mb-1 font-bold">
                        17+
                      </div>
                      <div className="font-orbitron text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#A855F7] font-semibold">
                        Stops Dynamic Range
                      </div>
                    </div>
                    <div>
                      <div className="font-orbitron text-xl sm:text-3xl md:text-4xl text-primary mb-1 font-bold">
                        24FPS
                      </div>
                      <div className="font-orbitron text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#A855F7] font-semibold">
                        Pure Cinema Cadence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. THE OUTCOME: VISCERAL CINEMA MASTERPIECE */}
            <div className="w-[100vw] h-[100svh] flex items-center justify-center shrink-0 px-4 sm:px-8 md:px-16">
              <div className="relative w-full max-w-[1300px] h-[68vh] sm:h-[75vh] md:h-[82vh] overflow-hidden rounded-sm group border border-hairline shadow-[0_50px_150px_rgba(0,0,0,0.8)] bg-surface">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=60&w=900&auto=format&fit=crop"
                  alt="Cinematic Masterpiece"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 sm:bottom-12 md:bottom-24 left-6 sm:left-10 md:left-20 max-w-[65ch] z-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
                    <span className="w-6 sm:w-12 h-[1px] bg-[#A855F7]" />
                    <span className="font-orbitron text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary font-bold">
                      The Culmination
                    </span>
                  </div>

                  <h2 className="font-orbitron text-2xl sm:text-5xl md:text-[6vw] text-primary leading-[0.95] mb-4 sm:mb-8 uppercase font-black tracking-tight">
                    VISCERAL
                    <br />
                    <span className="text-[#A855F7]">CINEMA.</span>
                  </h2>

                  <a
                    href="#work"
                    className="inline-block group/btn relative px-6 sm:px-10 py-3 sm:py-5 overflow-hidden border border-white/20 bg-surface/80 backdrop-blur-md cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-[#A855F7] transition-transform duration-700 ease-out -translate-x-full group-hover/btn:translate-x-0" />
                    <span className="relative z-10 text-primary group-hover/btn:text-background font-orbitron uppercase tracking-[0.25em] text-[8px] sm:text-xs font-bold transition-colors duration-500">
                      Explore Selected Works
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
