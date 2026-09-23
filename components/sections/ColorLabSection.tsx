"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sliders, Activity, Eye, Disc, ChevronRight } from "lucide-react";

interface ColorLook {
  id: string;
  name: string;
  category: string;
  pipeline: string;
  description: string;
  cssFilter: string;
  colorTemp: string;
  contrast: string;
  saturation: string;
  gamma: string;
  rgbBalance: { r: number; g: number; b: number };
  sampleRaw: string;
  sampleGraded: string;
  shotName: string;
}

const COLOR_LOOKS: ColorLook[] = [
  {
    id: "kodak-2383",
    name: "Kodak 2383 Print Stock",
    category: "35mm Photochemical Emulation",
    pipeline: "ACEScc 1.3 ➔ Kodak 2383 D65",
    description: "Subtle highlight roll-off, warm skin luminosity, rich deep cyan-teal shadow separation, and authentic 35mm density.",
    cssFilter: "contrast(1.18) saturate(1.15) sepia(0.08) hue-rotate(-5deg) brightness(0.95)",
    colorTemp: "5600K ➔ 4800K",
    contrast: "1.18 : 1",
    saturation: "115%",
    gamma: "2.40 (Cineon)",
    rgbBalance: { r: 94, g: 82, b: 76 },
    sampleRaw: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    sampleGraded: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    shotName: "Kairos Chronograph // Haute Horlogerie 4.5K",
  },
  {
    id: "arri-logc",
    name: "ARRI LogC4 (Raw Sensor)",
    category: "Uncorrected 17-Stop Sensor Raw",
    pipeline: "ARRI Alexa 35 / Mini LF Raw Sensor",
    description: "Uncompressed wide dynamic range capture prior to IDT conform. Preserves all 17+ stops of sensor latitude in specular highlights.",
    cssFilter: "contrast(0.68) saturate(0.65) brightness(1.22) grayscale(0.15)",
    colorTemp: "5600K Native",
    contrast: "0.68 : 1 (Log)",
    saturation: "65%",
    gamma: "LogC4 Curve",
    rgbBalance: { r: 60, g: 60, b: 60 },
    sampleRaw: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    sampleGraded: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    shotName: "Solitude & Form // Medium Format Editorial",
  },
  {
    id: "vision3-500t",
    name: "Kodak 16mm Vision3 500T",
    category: "Tungsten Celluloid Film",
    pipeline: "Photochemical 16mm Scan ➔ ACES",
    description: "Golden tungsten flare bloom, organic celluloid halation in specular edges, and tactile optical grain texture.",
    cssFilter: "contrast(1.24) saturate(1.2) sepia(0.2) hue-rotate(-12deg) brightness(0.92)",
    colorTemp: "3200K Tungsten",
    contrast: "1.24 : 1",
    saturation: "120%",
    gamma: "2.35 Master",
    rgbBalance: { r: 105, g: 78, b: 65 },
    sampleRaw: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    sampleGraded: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    shotName: "Neon Odyssey // Anamorphic Music Video",
  },
  {
    id: "bleach-bypass",
    name: "Bleach Bypass Chiaroscuro",
    category: "Silver Retention Process",
    pipeline: "ENR Chemical Bleach Bypass Matrix",
    description: "Intense black crush, stark desaturation of secondary hues, and sculptural silver luminance for high-tension cinematic scenes.",
    cssFilter: "contrast(1.45) saturate(0.55) brightness(0.88)",
    colorTemp: "6200K Industrial",
    contrast: "1.45 : 1 (Hard)",
    saturation: "55%",
    gamma: "2.55 Linear",
    rgbBalance: { r: 75, g: 75, b: 78 },
    sampleRaw: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    sampleGraded: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    shotName: "Apex Machine // Veloce GT Commercial",
  },
  {
    id: "tri-x-monochrome",
    name: "Kodak Tri-X 400 Monochrome",
    category: "Fine-Art Silver Gelatin",
    pipeline: "B&W Spectral Tone Curve ➔ D96",
    description: "Deep velvety shadows, crisp micro-contrast across highlights, and timeless architectural black & white tonal gradation.",
    cssFilter: "grayscale(1) contrast(1.35) brightness(0.95)",
    colorTemp: "Monochrome",
    contrast: "1.35 : 1",
    saturation: "0%",
    gamma: "2.45 Master",
    rgbBalance: { r: 50, g: 50, b: 50 },
    sampleRaw: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    sampleGraded: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    shotName: "Monolith Residence // Architectural Essay",
  },
];

export default function ColorLabSection() {
  const [activeLookId, setActiveLookId] = useState<string>("kodak-2383");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeScopeTab, setActiveScopeTab] = useState<"parade" | "waveform" | "vectorscope">("parade");
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLook = COLOR_LOOKS.find((l) => l.id === activeLookId) || COLOR_LOOKS[0];

  const updateSliderPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPos(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPos(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <section id="color-lab" className="py-24 md:py-36 bg-[#060608] border-b border-white/10 select-none relative overflow-hidden">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#B8860B]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-[#E5484D]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B8860B]" />
              <span className="font-outfit text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#B8860B] font-bold">
                The Color Suite // ACES 1.3 & DaVinci Resolve Master Grading
              </span>
            </div>
            <h2 className="font-syncopate text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
              Look <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#B8860B]">Lab.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-white/50">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
              <Disc className="w-3.5 h-3.5 text-[#B8860B] animate-spin" />
              ACEScc 1.3 DaVinci Intermediate
            </span>
            <span className="text-[#B8860B]">Rec.709 D65 Calibrated</span>
          </div>
        </div>

        {/* Main Color Lab Stage (Split-screen wiper + Scopes & Telemetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          {/* Left / Center 8 Columns: Interactive Before / After Wiper Canvas */}
          <div className="lg:col-span-8 space-y-4">
            {/* Wiper Canvas */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              data-cursor="drag"
              className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] bg-black cursor-ew-resize touch-none"
            >
              {/* Graded Image Layer (Full base) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={activeLook.sampleGraded}
                  alt={activeLook.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                  className="object-cover transition-all duration-700"
                  style={{ filter: activeLook.cssFilter }}
                />
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#B8860B]/50 font-outfit text-[10px] uppercase tracking-[0.25em] text-[#B8860B] font-bold rounded-full">
                  GRADED // {activeLook.name.toUpperCase()}
                </div>
              </div>

              {/* RAW Uncorrected Layer (Clipped to slider position) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative w-full h-full min-w-full">
                  <Image
                    src={activeLook.sampleRaw}
                    alt="RAW Uncorrected Sensor"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover filter contrast-[0.72] saturate-[0.6] brightness-[1.18] grayscale-[0.2]"
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 font-outfit text-[10px] uppercase tracking-[0.25em] text-white/70 font-bold rounded-full">
                    RAW LOG // ARRI SENSOR
                  </div>
                </div>
              </div>

              {/* Vertical Drag Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none z-20 flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-black/90 border border-white/80 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center text-white text-[9px] font-mono tracking-tighter">
                  ◀▶
                </div>
              </div>

              {/* Bottom Shot Metadata Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none px-4 py-2 bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/70 rounded-sm">
                <span className="text-white font-medium">{activeLook.shotName}</span>
                <span className="text-[#B8860B]">DRAG SLIDER TO INSPECT LATITUDE</span>
              </div>
            </div>

            {/* LUT Preset Selector Carousel */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
              {COLOR_LOOKS.map((look) => {
                const isActive = activeLookId === look.id;
                return (
                  <button
                    key={look.id}
                    onClick={() => setActiveLookId(look.id)}
                    data-cursor="hover"
                    className={`p-3.5 text-left rounded-sm border transition-all duration-300 flex flex-col justify-between space-y-2 ${
                      isActive
                        ? "bg-[#16161A] border-[#B8860B] shadow-[0_0_20px_rgba(184,134,11,0.2)]"
                        : "bg-[#0E0E11] border-white/10 hover:border-white/30 text-white/60 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#B8860B]">
                      <span>{look.category.split(" ")[0]}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />}
                    </div>
                    <div className="font-outfit text-xs font-bold text-white tracking-wide leading-tight">
                      {look.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 4 Columns: DaVinci Resolve Optical Scopes & Telemetry Deck */}
          <div className="lg:col-span-4 space-y-4">
            {/* Scopes Display Deck */}
            <div className="p-5 bg-[#0C0C0F] border border-white/10 rounded-sm space-y-4 shadow-xl">
              {/* Scope Switcher Tabs */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-[#B8860B] font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  SCOPES (SIMULATED)
                </span>

                <div className="flex items-center gap-1">
                  {(["parade", "waveform", "vectorscope"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveScopeTab(tab)}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        activeScopeTab === tab
                          ? "bg-[#B8860B] text-black font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {tab === "parade" ? "RGB" : tab === "waveform" ? "WAVE" : "VECT"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scopes Canvas Graphic */}
              <div className="relative h-40 w-full bg-black/90 border border-white/10 rounded-sm p-3 flex flex-col justify-between overflow-hidden">
                {activeScopeTab === "parade" && (
                  <div className="grid grid-cols-3 gap-2 h-full items-end pt-2 pb-1">
                    {/* Red channel parade */}
                    <div className="flex flex-col justify-end h-full relative border-r border-white/10 pr-1">
                      <span className="text-[9px] font-mono text-rec mb-1">R</span>
                      <div className="w-full flex items-end gap-1 h-3/4">
                        {[60, 85, 92, 70, 95, 80, 88].map((val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-red-950 via-red-600 to-red-400 opacity-80"
                            style={{ height: `${(val * (activeLook.rgbBalance.r / 80))}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Green channel parade */}
                    <div className="flex flex-col justify-end h-full relative border-r border-white/10 pr-1">
                      <span className="text-[9px] font-mono text-status-green mb-1">G</span>
                      <div className="w-full flex items-end gap-1 h-3/4">
                        {[50, 75, 80, 65, 78, 70, 75].map((val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-emerald-950 via-emerald-500 to-emerald-300 opacity-80"
                            style={{ height: `${(val * (activeLook.rgbBalance.g / 80))}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Blue channel parade */}
                    <div className="flex flex-col justify-end h-full relative">
                      <span className="text-[9px] font-mono text-cyan-400 mb-1">B</span>
                      <div className="w-full flex items-end gap-1 h-3/4">
                        {[40, 60, 70, 80, 65, 72, 60].map((val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-cyan-950 via-cyan-500 to-cyan-300 opacity-80"
                            style={{ height: `${(val * (activeLook.rgbBalance.b / 80))}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeScopeTab === "waveform" && (
                  <div className="relative h-full flex flex-col justify-between py-1">
                    <div className="flex justify-between font-mono text-[8px] text-white/30 border-b border-white/5 pb-0.5">
                      <span>100 IRE (PEAK)</span>
                      <span>1023</span>
                    </div>
                    <div className="w-full h-20 flex items-center justify-around opacity-85">
                      {[30, 45, 75, 90, 60, 40, 85, 70, 50, 95, 65, 55].map((v, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-full bg-gradient-to-t from-[#B8860B]/20 via-[#B8860B] to-white"
                          style={{ height: `${v}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between font-mono text-[8px] text-white/30 border-t border-white/5 pt-0.5">
                      <span>0 IRE (PEDESTAL)</span>
                      <span>64</span>
                    </div>
                  </div>
                )}

                {activeScopeTab === "vectorscope" && (
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-white/20 relative flex items-center justify-center">
                      <div className="absolute w-full h-[1px] bg-white/10" />
                      <div className="absolute h-full w-[1px] bg-white/10" />
                      {/* Skin-tone axis indicator */}
                      <div className="absolute w-28 h-[1px] bg-[#B8860B]/60 rotate-[-35deg]" />
                      <div className="w-12 h-12 rounded-full bg-[#B8860B]/20 blur-sm animate-pulse" />
                    </div>
                    <span className="absolute bottom-1 right-2 font-mono text-[8px] text-[#B8860B]">
                      SKIN AXIS: OK
                    </span>
                  </div>
                )}
              </div>

              {/* Look Parameters Matrix */}
              <div className="space-y-3 pt-2">
                <div className="text-[10px] font-mono text-[#B8860B] uppercase tracking-widest">
                  CURRENT PIPELINE PARAMETERS
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-black/50 border border-white/5 space-y-0.5">
                    <div className="text-[9px] text-white/40 uppercase">COLOR TEMP</div>
                    <div className="text-white font-medium">{activeLook.colorTemp}</div>
                  </div>

                  <div className="p-2.5 bg-black/50 border border-white/5 space-y-0.5">
                    <div className="text-[9px] text-white/40 uppercase">GAMMA FORMULA</div>
                    <div className="text-white font-medium">{activeLook.gamma}</div>
                  </div>

                  <div className="p-2.5 bg-black/50 border border-white/5 space-y-0.5">
                    <div className="text-[9px] text-white/40 uppercase">CONTRAST RATIO</div>
                    <div className="text-[#B8860B] font-medium">{activeLook.contrast}</div>
                  </div>

                  <div className="p-2.5 bg-black/50 border border-white/5 space-y-0.5">
                    <div className="text-[9px] text-white/40 uppercase">CHROMINANCE</div>
                    <div className="text-white font-medium">{activeLook.saturation}</div>
                  </div>
                </div>

                <p className="text-xs font-outfit text-white/60 leading-relaxed pt-1">
                  {activeLook.description}
                </p>
              </div>
            </div>

            {/* Inquire for Color Grading Services CTA */}
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-between p-4 rounded-sm border border-[#B8860B]/40 bg-gradient-to-r from-[#B8860B]/15 to-transparent hover:border-[#B8860B] text-white transition-all duration-300 font-outfit text-xs uppercase tracking-[0.2em] font-bold group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <span>Book Master Color Grading Suite</span>
              <ChevronRight className="w-4 h-4 text-[#B8860B] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
