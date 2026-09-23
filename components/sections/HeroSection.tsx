"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, X, Volume2, VolumeX, Battery, Sparkles, Film, ArrowUpRight } from "lucide-react";
import { formatTimecode } from "@/lib/utils";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [modalMuted, setModalMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Scroll animations for background video scale down and fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.92]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.45, 0.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], [0, 50]);

  // Mouse Parallax for Viewfinder HUD
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const hudX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const hudY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const crosshairX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const crosshairY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Live running SMPTE Timecode loop (24 FPS)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedFrames((prev) => (prev + 1) % 86400);
    }, 1000 / 24);
    return () => clearInterval(timer);
  }, []);

  // Keyboard ESC and body scroll lock for Showreel modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showreelOpen) {
        setShowreelOpen(false);
      }
    };

    if (showreelOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showreelOpen]);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("work");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-background select-none"
    >
      {/* 1. Full-Bleed Background Showreel Video with Scroll Scale & Fade */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.15] grayscale-[20%]"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Vignette and Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.85)_100%)]" />
      </motion.div>

      {/* 2. Camera Viewfinder HUD Overlay with Subtle Mouse Parallax */}
      <motion.div
        style={{ x: hudX, y: hudY }}
        className="pointer-events-none absolute inset-6 md:inset-12 z-20 flex flex-col justify-between"
      >
        {/* Four Viewfinder Corner Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-white/40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-white/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-white/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-white/40" />

        {/* Top HUD Row: REC + Running Timecode & Camera Specs */}
        <div className="flex items-center justify-between font-mono text-[10px] md:text-xs text-white/70 tracking-widest uppercase pt-2 px-3">
          {/* Top-Left: REC Blinking Dot + Timecode */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rec animate-pulse-rec shadow-[0_0_8px_rgba(229,72,77,0.9)]" />
            <span className="text-primary font-semibold">REC</span>
            <span className="text-white/40">|</span>
            <span className="text-tungsten tabular-nums font-mono">{formatTimecode(elapsedFrames)}</span>
          </div>

          {/* Top-Right: Mono Optical Specs */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3 text-white/60">
            <span>4K</span>
            <span>·</span>
            <span>24FPS</span>
            <span>·</span>
            <span>180°</span>
            <span>·</span>
            <span>ISO 800</span>
            <span>·</span>
            <span className="text-tungsten">f/2.8</span>
          </div>
        </div>

        {/* Centre Viewfinder Crosshair */}
        <motion.div
          style={{ x: crosshairX, y: crosshairY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center opacity-30"
        >
          <div className="w-8 h-[1px] bg-white/60 absolute" />
          <div className="h-8 w-[1px] bg-white/60 absolute" />
          <div className="w-16 h-16 border border-white/20 rounded-full" />
        </motion.div>

        {/* Bottom HUD Row: Scroll Indicator & Battery / Reel info */}
        <div className="flex items-end justify-between font-mono text-[10px] md:text-xs text-white/70 tracking-widest uppercase pb-2 px-3">
          {/* Bottom-Left: Scroll indicator */}
          <div className="flex items-center gap-3">
            <div className="w-[1px] h-8 bg-gradient-to-b from-tungsten to-transparent animate-pulse" />
            <span className="text-white/60">Scroll</span>
          </div>

          {/* Bottom-Right: Battery Icon & Reel metadata */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-white/60">
              <Battery className="w-4 h-4 text-status-green" />
              <span>98%</span>
            </div>
            <span>·</span>
            <span className="text-tungsten font-medium">Reel 2026</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Hero Central Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6 md:space-y-8"
      >
        {/* Studio Identifier Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-[#0A0A0C]/70 backdrop-blur-xl rounded-full font-outfit text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#B8860B] font-bold shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
          <span>Cinematic Visual Studio</span>
          <span className="text-white/20">|</span>
          <span className="text-white/80 font-medium">Est. 2016 — Mumbai / London</span>
        </motion.div>

        {/* Giant Name with Italic Gold Word */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-syncopate text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white leading-[0.85] text-balance"
        >
          Rahul <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-[#B8860B]">Singh</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
          className="font-outfit text-sm sm:text-base md:text-lg text-white/70 font-light max-w-2xl text-balance leading-relaxed tracking-wide"
        >
          Curating silent narratives, tactile medium-format stills, and large-format cinematic direction under one roof.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4 pointer-events-auto"
        >
          {/* Watch Showreel CTA */}
          <button
            onClick={() => setShowreelOpen(true)}
            data-cursor="play"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B8860B] hover:bg-[#D4AF37] text-[#0A0A0C] font-outfit text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 shadow-[0_0_30px_rgba(184,134,11,0.4)] rounded-full overflow-hidden"
          >
            <span className="p-1.5 bg-[#0A0A0C] text-[#B8860B] rounded-full group-hover:scale-110 transition-transform">
              <Play className="w-3 h-3 fill-current" />
            </span>
            <span>Watch Showreel</span>
          </button>

          {/* View Work CTA */}
          <a
            href="#work"
            onClick={scrollToWork}
            data-cursor="hover"
            className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/20 bg-white/5 hover:border-[#B8860B] text-white hover:text-[#B8860B] font-outfit text-xs uppercase tracking-[0.3em] font-bold backdrop-blur-xl transition-all duration-300 rounded-full"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* 4. Fullscreen Showreel Modal Player with Audio & Focus Trap */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100000] bg-background/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div className="flex items-center gap-3 font-mono text-xs text-primary">
                <span className="w-2 h-2 rounded-full bg-rec animate-pulse-rec" />
                <span className="uppercase font-semibold tracking-widest">
                  Rahul Singh STUDIO — 4K SHOWREEL MASTER
                </span>
                <span className="text-muted hidden sm:inline">[AUDIO CONFORMED · 24FPS]</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (modalVideoRef.current) {
                      modalVideoRef.current.muted = !modalVideoRef.current.muted;
                      setModalMuted(modalVideoRef.current.muted);
                    }
                  }}
                  className="p-2 border border-hairline bg-surface hover:border-tungsten text-primary transition-colors flex items-center gap-2 font-mono text-xs"
                  aria-label="Toggle audio"
                >
                  {modalMuted ? <VolumeX className="w-4 h-4 text-rec" /> : <Volume2 className="w-4 h-4 text-tungsten" />}
                  <span className="hidden sm:inline">{modalMuted ? "MUTED" : "AUDIO ON"}</span>
                </button>

                <button
                  onClick={() => setShowreelOpen(false)}
                  className="p-2 border border-hairline bg-surface hover:border-tungsten text-primary transition-colors flex items-center gap-2 font-mono text-xs uppercase"
                  aria-label="Close showreel"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">ESC</span>
                </button>
              </div>
            </div>

            {/* Fullscreen Video Canvas */}
            <div className="relative aspect-video max-w-6xl w-full mx-auto my-auto border border-hairline-light bg-black overflow-hidden shadow-2xl">
              <video
                ref={modalVideoRef}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Modal Bottom Metadata */}
            <div className="flex items-center justify-between font-mono text-[11px] text-muted border-t border-hairline pt-4">
              <span>COLOR: ACEScc 1.3 / MASTER PRORES 4444 XQ</span>
              <span className="text-tungsten">DIRECTOR OF PHOTOGRAPHY & EDIT: Rahul Singh</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
