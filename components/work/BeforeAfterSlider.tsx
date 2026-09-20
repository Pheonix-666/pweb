"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  rawImage: string;
  gradedImage: string;
  labelRaw?: string;
  labelGraded?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  rawImage,
  gradedImage,
  labelRaw = "RAW FLAT LOG",
  labelGraded = "ACES MASTER COLOR GRADE",
  aspectRatio = "aspect-[16/9]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-tungsten" />
          <span className="uppercase tracking-widest text-primary font-medium">
            {"// COLOR CONFORM COMPARISON"}
          </span>
        </div>
        <div className="text-[11px] text-tungsten tracking-wider hidden sm:block">
          DRAG TO INSPECT CHROMA & DYNAMIC RANGE
        </div>
      </div>

      {/* Main Interactive Split Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className={`relative w-full ${aspectRatio} overflow-hidden border border-hairline-light bg-black cursor-ew-resize select-none shadow-2xl`}
      >
        {/* Graded Image (Full Background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={gradedImage}
            alt="Master Graded Frame"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-background/85 border border-tungsten/60 font-mono text-[10px] tracking-widest text-tungsten uppercase backdrop-blur-sm">
            {labelGraded}
          </div>
        </div>

        {/* Raw Log Image (Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <Image
            src={rawImage}
            alt="Raw Flat Log Frame"
            fill
            className="object-cover filter contrast-75 brightness-110"
            priority
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/85 border border-hairline font-mono text-[10px] tracking-widest text-muted uppercase backdrop-blur-sm">
            {labelRaw}
          </div>
        </div>

        {/* Center Draggable Hairline & Knob */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-tungsten z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background border-2 border-tungsten shadow-[0_0_15px_rgba(232,163,61,0.5)] flex items-center justify-center text-tungsten">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
