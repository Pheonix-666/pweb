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
          className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#070708] p-6 md:p-12 text-[#F2F0EB] select-none pointer-events-auto"
        >
          {/* Top HUD */}
          <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-white/50 tracking-widest uppercase">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-pulse" />
              <span className="font-semibold text-white/80">REC · 8K PRORES RAW</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-white/40">
              <span>FPS 24.00</span>
              <span>SHUTTER 180°</span>
              <span>ISO 800</span>
            </div>
            <div className="tracking-[0.2em] font-medium">
              STARLOOP <span className="text-[#C89B53]">STUDIO</span>
            </div>
          </div>

          {/* Center Timer & Conforming display */}
          <div className="flex flex-col items-center justify-center gap-5 my-auto">
            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.35em] text-[#C89B53] uppercase font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C89B53] animate-ping" />
              INITIALIZING TIMELINE
            </div>

            {/* Big Cinematic Timecode & Percentage */}
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl tracking-wider text-white font-light tabular-nums drop-shadow-[0_0_25px_rgba(200,155,83,0.2)]">
              {timecode}
            </div>

            {/* Progress Bar */}
            <div className="w-56 sm:w-80 md:w-96 h-[2px] bg-white/10 relative overflow-hidden rounded-full mt-2">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C89B53] to-[#E5C178]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-56 sm:w-80 md:w-96 font-mono text-[11px] text-white/40 tracking-widest mt-1">
              <span>BUFFERING ASSETS</span>
              <span className="text-[#C89B53] font-medium">{progress}%</span>
            </div>
          </div>

          {/* Bottom HUD Metadata */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/30 border-t border-white/[0.08] pt-4 tracking-widest">
            <span className="hidden sm:inline">COLOR PIPELINE: <span className="text-white/60">ACEScc v1.3</span></span>
            <span>REEL: <span className="text-white/60">A001_C001_MASTER</span></span>
            <span>STATUS: <span className="text-[#C89B53] font-medium">{progress === 100 ? "READY" : "LOADING..."}</span></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
