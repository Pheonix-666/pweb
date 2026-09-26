"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Measure scroll progress through the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content transitions on scroll: fades out and moves gently upward
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -35]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const videoBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.9]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Frame-by-frame scroll-driven video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (video.readyState >= 1) {
      setIsVideoReady(true);
      video.pause();
    }

    // Unsubscribe helper for framer-motion scroll progress
    const unsubscribeScroll = scrollYProgress.on("change", (progress) => {
      if (video.duration && !isNaN(video.duration)) {
        targetTime = progress * video.duration;
      }
    });

    // Smooth lerp loop for fluid seeking without stutter
    const renderLoop = () => {
      if (video.duration && !isNaN(video.duration)) {
        // Linear interpolation for butter-smooth frame scrubbing
        const diff = targetTime - currentTime;
        if (Math.abs(diff) > 0.001) {
          currentTime += diff * 0.18;
          if (isFinite(currentTime) && currentTime >= 0 && currentTime <= video.duration) {
            video.currentTime = currentTime;
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      unsubscribeScroll();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#070708] select-none"
    >
      {/* Sticky Full-Viewport Viewfinder Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* 1. Cinematic Background Video (Driven directly by scroll position) */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        >
          {/* High-res Atmospheric Doorway Poster Fallback */}
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              isVideoReady ? "opacity-30" : "opacity-100"
            }`}
            style={{
              backgroundImage: `url('/images/hero-doorway.jpg')`,
              backgroundPosition: "center right",
            }}
          />

          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            disablePictureInPicture
            poster="/images/hero-doorway.jpg"
            className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-[0.78] contrast-[1.12]"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>

          {/* Master Cinematic Shading & Contrast Overlays */}
          {/* Left-to-right shadow gradient ensuring razor-sharp typography readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070708]/95 via-[#070708]/60 md:via-[#070708]/40 to-transparent w-full md:w-3/4" />
          
          {/* Bottom-to-top shadow gradient anchoring lower-left layout */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/40 to-transparent" />
          
          {/* Top subtle vignette for navigation visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/70 via-transparent to-transparent h-32" />
          
          {/* Deep perimeter vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,8,0.75)_100%)]" />
        </motion.div>

        {/* 2. Top Spacer (Leaves room for transparent navbar) */}
        <div className="relative z-10 w-full h-24" />

        {/* 3. Hero Editorial Content (Positioned in Bottom-Left, strictly replicating reference) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="max-w-2xl text-left"
          >
            {/* Category / Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] font-medium text-[#C89B53] mb-3 sm:mb-4"
            >
              DIRECTOR OF PHOTOGRAPHY
            </motion.p>

            {/* Large High-Contrast Serif Name */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-normal text-[#F5F2EB] tracking-tight leading-[0.92] mb-5 sm:mb-6"
            >
              Rahul Singh
            </motion.h1>

            {/* Poetic Narrative Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans text-sm sm:text-base md:text-[1.0625rem] text-[#D0CFCB]/85 font-light leading-relaxed max-w-lg md:max-w-xl text-balance"
            >
              Light is the first line of a scene. I shoot for the quiet moment
              a frame holds its breath: practical sources, long lenses,
              and the patience to wait for it to arrive.
            </motion.p>
          </motion.div>
        </div>

        {/* 4. Subtle Bottom Scroll-Driven Frame Cue */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 right-6 sm:right-10 md:right-14 lg:right-20 z-20 hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 pointer-events-none"
        >
          <span>Scroll to advance scene</span>
          <span className="w-6 h-[1px] bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
