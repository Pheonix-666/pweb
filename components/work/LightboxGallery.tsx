"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";

interface LightboxGalleryProps {
  images: string[];
  title: string;
}

export default function LightboxGallery({ images, title }: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  }, [selectedIndex, images.length]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Gallery Section Header */}
      <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-tungsten" />
          <span className="uppercase tracking-widest text-primary font-medium">
            {"// PRODUCTION STILLS & CONTACT FRAMES"}
          </span>
        </div>
        <div className="text-[11px] text-tungsten tracking-wider">
          [{images.length.toString().padStart(2, "0")} ARCHIVAL FRAMES]
        </div>
      </div>

      {/* Grid Thumbnail List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => handleOpen(idx)}
            data-cursor="view"
            className="group relative aspect-[16/10] overflow-hidden border border-hairline bg-surface cursor-pointer"
          >
            <Image
              src={imgUrl}
              alt={`${title} Frame ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
              <span className="font-mono text-[10px] text-tungsten tracking-widest uppercase">
                FRAME [{(idx + 1).toString().padStart(2, "0")}]
              </span>
              <Maximize2 className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100000] bg-background/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 select-none"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-tungsten">{"///"}</span>
                <span className="text-primary font-medium uppercase">{title}</span>
                <span className="text-muted hidden sm:inline">[STILL FRAME ARCHIVE]</span>
              </div>

              {/* Frame Counter & Close */}
              <div className="flex items-center gap-6">
                <div className="font-mono text-xs text-tungsten tracking-widest">
                  {(selectedIndex + 1).toString().padStart(2, "0")} / {images.length.toString().padStart(2, "0")}
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 border border-hairline bg-surface hover:border-tungsten text-primary transition-colors flex items-center gap-2 font-mono text-xs uppercase"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">ESC</span>
                </button>
              </div>
            </div>

            {/* Central Stage with Navigation */}
            <div className="relative w-full h-[75vh] max-h-[850px] my-auto flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-20 p-3 border border-hairline bg-surface/80 hover:border-tungsten text-primary transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full max-w-6xl overflow-hidden border border-hairline-light">
                <Image
                  src={images[selectedIndex]}
                  alt={`${title} High Resolution Frame ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-20 p-3 border border-hairline bg-surface/80 hover:border-tungsten text-primary transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom HUD metadata */}
            <div className="flex items-center justify-between font-mono text-[11px] text-muted border-t border-hairline pt-4">
              <span>COLOR PROFILE: ACEScc 1.3 · 16-BIT TIFF ARCHIVE</span>
              <span className="text-tungsten hidden sm:inline">USE ARROW KEYS OR SWIPE TO NAVIGATE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
