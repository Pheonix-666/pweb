"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 1.0 second duration with high-precision frame tick
  useEffect(() => {
    // Lock body scroll while loader is visible
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const duration = 1000; // 1000ms = 1 sec
    const startTime = performance.now();

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Format percentage into SMPTE timecode simulation (00:00:00:00 to 00:00:01:00)
  const currentFrames = Math.floor((progress / 100) * 24);
  const seconds = progress >= 100 ? 1 : 0;
  const frames = progress >= 100 ? 0 : currentFrames;
  const pad = (n: number) => n.toString().padStart(2, "0");
  const timecode = `00:00:${pad(seconds)}:${pad(frames)}`;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#06050A] p-6 md:p-12 text-[#F3E8FF] select-none pointer-events-auto"
        >
          {/* Top HUD */}
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#94A3B8]/60 tracking-widest uppercase">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-pulse" />
              <span className="font-semibold text-[#F3E8FF]/80">REC · 8K PRORES RAW</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-[#94A3B8]/40">
              <span>FPS 24.00</span>
              <span>SHUTTER 180°</span>
              <span>ISO 800</span>
            </div>
            <div className="flex items-center gap-2 tracking-[0.2em] font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" className="fill-[#D4AF37] flex-shrink-0">
                <polygon points="7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7" />
              </svg>
              <span>STARLOOP</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#E5C178] font-bold">
                ENTERTAINMENT
              </span>
            </div>
          </div>

          {/* Center Timer & Conforming display */}
          <div className="flex flex-col items-center justify-center gap-5 my-auto">
            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.35em] text-[#A855F7] uppercase font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-ping" />
              INITIALIZING TIMELINE
            </div>

            {/* Big Cinematic Timecode & Percentage */}
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#F3E8FF] font-light tabular-nums drop-shadow-[0_0_20px_rgba(168,85,247,0.12)]">
              {timecode}
            </div>

            {/* Progress Bar */}
            <div className="w-56 sm:w-80 md:w-96 h-[2px] bg-white/10 relative overflow-hidden rounded-full mt-2">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#A855F7] to-[#C084FC]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-56 sm:w-80 md:w-96 font-mono text-[11px] text-[#94A3B8]/60 tracking-widest mt-1">
              <span>BUFFERING ASSETS</span>
              <span className="text-[#A855F7] font-medium">{progress}%</span>
            </div>
          </div>

          {/* Bottom HUD Metadata */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#94A3B8]/40 border-t border-white/[0.06] pt-4 tracking-widest">
            <span className="hidden sm:inline">COLOR PIPELINE: <span className="text-[#F3E8FF]/70">ACEScc v1.3</span></span>
            <span>REEL: <span className="text-[#F3E8FF]/70">A001_C001_MASTER</span></span>
            <span>STATUS: <span className="text-[#A855F7] font-medium">{progress === 100 ? "READY" : "LOADING..."}</span></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
