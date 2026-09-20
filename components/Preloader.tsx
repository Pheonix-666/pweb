"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [frames, setFrames] = useState(0);

  // Target: 2 seconds @ 24fps = 48 frames (00:00:02:00)
  const TOTAL_FRAMES = 48;

  useEffect(() => {
    // Check if user has already seen preloader in this browser session
    const hasLoaded = sessionStorage.getItem("rahul_studio_preloader_seen");
    if (hasLoaded === "true") {
      setLoading(false);
      return;
    }

    let currentFrame = 0;
    const intervalTime = 38; // ~1.8 seconds total count time

    const timer = setInterval(() => {
      currentFrame += 1;
      setFrames(currentFrame);

      if (currentFrame >= TOTAL_FRAMES) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("rahul_studio_preloader_seen", "true");
        }, 350);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Format frame count to SMPTE timecode: 00:00:SS:FF
  const formatTimecode = (totalFrames: number) => {
    const fps = 24;
    const seconds = Math.floor(totalFrames / fps);
    const remainingFrames = totalFrames % fps;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `00:${pad(minutes)}:${pad(remainingSeconds)}:${pad(remainingFrames)}`;
  };

  const progressPercentage = Math.min(100, Math.round((frames / TOTAL_FRAMES) * 100));

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0A0A0A] p-6 md:p-12 text-[#F2F0EB] select-none"
        >
          {/* Top metadata row */}
          <div className="flex items-center justify-between font-mono text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-rec animate-pulse-rec" />
              <span className="tracking-widest uppercase">REC [PRORES RAW 8K]</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>FPS: 24.00</span>
              <span>SHUTTER: 1/48</span>
              <span>EI: 800</span>
            </div>
            <div className="tracking-widest">
              RAHUL VERMA <span className="text-tungsten">STUDIO</span>
            </div>
          </div>

          {/* Central Timecode & Progress */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="font-mono text-xs tracking-widest text-muted uppercase mb-3">
              INITIALIZING TIMELINE
            </div>

            {/* Big Cinematic Timecode Display */}
            <div className="font-mono text-4xl sm:text-6xl md:text-8xl tracking-wider text-primary font-light tabular-nums">
              {formatTimecode(frames)}
            </div>

            {/* Progress line indicator */}
            <div className="w-48 sm:w-72 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
              <motion.div
                className="h-full bg-tungsten"
                style={{ width: `${progressPercentage}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="font-mono text-[10px] tracking-widest text-muted mt-3">
              {progressPercentage}% CONFORMED
            </div>
          </div>

          {/* Bottom metadata row */}
          <div className="flex items-center justify-between font-mono text-xs text-muted border-t border-hairline pt-4">
            <div className="text-[11px] tracking-widest">
              COLOR PIPELINE: <span className="text-primary">ACEScc (v1.3)</span>
            </div>
            <div className="text-[11px] tracking-widest text-right">
              REEL: <span className="text-primary">A001_C001</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
