"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [frames, setFrames] = useState(0);

  // 1 second total: 24 frames @ ~42ms each = ~1008ms
  const TOTAL_FRAMES = 24;
  const INTERVAL_MS = 42;

  useEffect(() => {
    // Only show once per session
    const hasLoaded = sessionStorage.getItem("starloop_preloader_seen");
    if (hasLoaded === "true") {
      setLoading(false);
      return;
    }

    // Lock scroll while preloader is visible
    document.documentElement.style.overflow = "hidden";

    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame += 1;
      setFrames(currentFrame);

      if (currentFrame >= TOTAL_FRAMES) {
        clearInterval(timer);
        // Short pause at 100% before sliding away
        setTimeout(() => {
          setLoading(false);
          document.documentElement.style.overflow = "";
          sessionStorage.setItem("starloop_preloader_seen", "true");
        }, 200);
      }
    }, INTERVAL_MS);

    return () => {
      clearInterval(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const progressPercentage = Math.min(100, Math.round((frames / TOTAL_FRAMES) * 100));

  // SMPTE timecode: 00:00:SS:FF
  const formatTimecode = (f: number) => {
    const fps = 24;
    const seconds = Math.floor(f / fps);
    const ff = f % fps;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `00:00:${pad(seconds)}:${pad(ff)}`;
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#070708] p-6 md:p-12 text-[#F2F0EB] select-none"
        >
          {/* Top row */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/40">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] animate-pulse" />
              <span className="tracking-[0.25em] uppercase">REC · PRORES RAW</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 tracking-widest">
              <span>FPS 24.00</span>
              <span>ISO 800</span>
            </div>
            <div className="tracking-[0.2em] uppercase">
              Starloop <span className="text-[#C89B53]">Studio</span>
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center gap-6 my-auto">
            <div className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-white/30 uppercase">
              Initializing Timeline
            </div>

            {/* Timecode */}
            <div className="font-mono text-4xl sm:text-6xl md:text-8xl tracking-widest text-white font-light tabular-nums">
              {formatTimecode(frames)}
            </div>

            {/* Progress bar */}
            <div className="w-40 sm:w-64 md:w-80 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#C89B53]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white/30">
              {progressPercentage}% CONFORMED
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-white/25 border-t border-white/[0.06] pt-4 tracking-widest">
            <span>COLOR PIPELINE: <span className="text-white/50">ACEScc v1.3</span></span>
            <span>REEL: <span className="text-white/50">A001_C001</span></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
