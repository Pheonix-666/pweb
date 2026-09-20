"use client";

import React from "react";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none opacity-[0.055]"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "contrast(180%) brightness(120%)" }}
      >
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#film-grain-noise)"
          className="animate-grain"
        />
      </svg>
    </div>
  );
}
