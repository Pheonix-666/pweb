"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Film, Disc3, Sliders, Radio } from "lucide-react";

interface BTSCard {
  id: string;
  title: string;
  role: string;
  gear: string;
  specs: string;
  image: string;
  tag: string;
  scene: string;
  timecode: string;
}

const BTS_DATA: BTSCard[] = [
  {
    id: "bts-1",
    title: "Alpine Pursuit Camera Rig",
    role: "High-Speed Chase Sequence",
    gear: "ARRI Alexa Mini LF // MotoCrane Ultra",
    specs: "4.5K RAW // 120 FPS // T2.0",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=60&w=650&auto=format&fit=crop",
    tag: "PURSUIT",
    scene: "SCN 14B",
    timecode: "00:14:02:18",
  },
  {
    id: "bts-2",
    title: "ACES Master Grading Suite",
    role: "Color Science & Film Emulation",
    gear: "Sony BVM-HX310 // DaVinci Panel",
    specs: "DCI-P3 1000 Nits // ACES 1.3",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=60&w=650&auto=format&fit=crop",
    tag: "COLOR LAB",
    scene: "REEL 02",
    timecode: "00:27:44:09",
  },
  {
    id: "bts-3",
    title: "MotoCrane High-Speed Pass",
    role: "Precision Tracking Vehicle",
    gear: "Gyro-Stabilized Flight Head",
    specs: "140 KM/H // 3-Axis Active",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=60&w=650&auto=format&fit=crop",
    tag: "TRACKING",
    scene: "EXT 07",
    timecode: "00:39:18:22",
  },
  {
    id: "bts-4",
    title: "16mm Celluloid Mag Loading",
    role: "Tactile Analogue Direction",
    gear: "Arriflex 16SR3 // Super Speeds",
    specs: "Kodak 500T // 24 FPS",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=60&w=650&auto=format&fit=crop",
    tag: "CELLULOID",
    scene: "DARK 01",
    timecode: "00:48:05:04",
  },
  {
    id: "bts-5",
    title: "Medium Format Fashion Sculpt",
    role: "Chiaroscuro Light Study",
    gear: "Broncolor Para 222 // Hasselblad",
    specs: "100MP // Flash 1/8000s",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=650&auto=format&fit=crop",
    tag: "STUDIO",
    scene: "KEY 01",
    timecode: "01:02:11:15",
  },
  {
    id: "bts-6",
    title: "Anamorphic Lens Collimation",
    role: "Optical Bench Calibration",
    gear: "Atlas Orion 2X Anamorphic Set",
    specs: "Amber Flares // T1.9",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=60&w=650&auto=format&fit=crop",
    tag: "OPTICS",
    scene: "BENCH 03",
    timecode: "01:14:50:01",
  },
  {
    id: "bts-7",
    title: "Brutalist Spatial Rigging",
    role: "Architectural Sweep",
    gear: "Ronin 2 // Remote Wheels // 8K",
    specs: "Carbon Gantry // 16-Bit Lin",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=60&w=650&auto=format&fit=crop",
    tag: "RIGGING",
    scene: "ARCH 04",
    timecode: "01:29:33:12",
  },
];

export default function BehindTheScenesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [radius, setRadius] = useState(380);
  const [cardWidth, setCardWidth] = useState(310);
  const [cardHeight, setCardHeight] = useState(180);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const currentRotationRef = useRef(0);

  const totalCards = BTS_DATA.length;
  const anglePerCard = 360 / totalCards;

  // Spring animated rotation value
  const rotationAngle = useMotionValue(0);
  const smoothRotation = useSpring(rotationAngle, {
    stiffness: 50,
    damping: 28,
    mass: 0.7,
  });

  // Responsive sizing for compact widescreen proportions
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(210);
        setCardWidth(230);
        setCardHeight(138);
      } else if (width < 1024) {
        setRadius(300);
        setCardWidth(280);
        setCardHeight(165);
      } else if (width < 1440) {
        setRadius(390);
        setCardWidth(330);
        setCardHeight(192);
      } else {
        setRadius(460);
        setCardWidth(370);
        setCardHeight(215);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotateToCard = useCallback(
    (index: number) => {
      const targetAngle = -index * anglePerCard;
      currentRotationRef.current = targetAngle;
      rotationAngle.set(targetAngle);
      const normalized = ((index % totalCards) + totalCards) % totalCards;
      setCurrentIndex(normalized);
    },
    [anglePerCard, rotationAngle, totalCards]
  );

  const handleNext = useCallback(() => {
    rotateToCard(currentIndex + 1);
  }, [currentIndex, rotateToCard]);

  const handlePrev = useCallback(() => {
    rotateToCard(currentIndex - 1);
  }, [currentIndex, rotateToCard]);

  // Drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const dragSensitivity = 0.28;
    const newAngle = currentRotationRef.current + deltaX * dragSensitivity;
    rotationAngle.set(newAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const currentAngle = rotationAngle.get();
    const nearestIndex = Math.round(-currentAngle / anglePerCard);
    rotateToCard(nearestIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const activeCard = BTS_DATA[currentIndex];

  return (
    <div
      className="relative w-full py-10 sm:py-14 md:py-16 bg-[#070709] border-b border-white/[0.06] overflow-hidden select-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Subtle Ambient Vignettes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[180px] bg-[#C89B53]/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-10 relative z-10">
        {/* Compact Header Bar with Studio Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-white/[0.06] pb-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-5 h-[1px] bg-[#C89B53]" />
              <span className="font-orbitron text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#C89B53] font-bold">
                {"// PRODUCTION RUSHES // ON-LOCATION ARCHIVE"}
              </span>
            </div>
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-white font-black tracking-tight uppercase">
              BEHIND THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#C89B53]">
                SCENES.
              </span>
            </h2>
          </div>

          {/* Real-time Studio Timecode Telemetry Header */}
          <div className="flex items-center gap-4 sm:gap-6 font-mono text-[9px] sm:text-[10px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/60 border border-white/10 text-white/80">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span className="text-[#C89B53]">REC</span>
              <span className="text-white/40">|</span>
              <span>24.00 FPS</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/50">
              <span className="text-white/30">TC:</span>
              <span className="text-white/90 font-bold">{activeCard.timecode}</span>
            </div>
          </div>
        </div>

        {/* 3D CAROUSEL COMPACT STAGE */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing [perspective:1300px] [perspective-origin:center_45%] overflow-visible"
        >
          {/* Subtle Stage Base Radial Light */}
          <div
            className="absolute bottom-2 w-[70%] max-w-[650px] h-[70px] rounded-full pointer-events-none opacity-30 blur-lg"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(200, 155, 83, 0.2) 0%, rgba(200, 155, 83, 0) 70%)",
            }}
          />

          {/* 3D Rotating Cylinder */}
          <motion.div
            style={{
              rotateY: smoothRotation,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {BTS_DATA.map((item, index) => {
              const cardAngle = index * anglePerCard;
              const isCenter = index === currentIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => rotateToCard(index)}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    position: "absolute",
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible",
                  }}
                  className={`cursor-pointer transition-all duration-500 rounded-sm group ${
                    isCenter
                      ? "z-30 scale-105 ring-1 ring-[#C89B53] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(200,155,83,0.22)]"
                      : "z-10 opacity-55 hover:opacity-90 hover:scale-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  {/* Widescreen Cinema Card Frame */}
                  <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#0E0E12] border border-white/15 flex flex-col justify-between p-2.5 sm:p-3">
                    {/* Background Still Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 230px, (max-width: 1024px) 280px, 370px"
                        className={`object-cover transition-all duration-700 ${
                          isCenter
                            ? "grayscale-0 scale-105"
                            : "filter grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105"
                        }`}
                      />
                      {/* Cinema Aspect Ratio & Dark Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/30 to-black/20 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Top Metadata Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="px-1.5 py-0.5 rounded-sm bg-[#08080A] border border-white/10 font-mono text-[7px] text-[#C89B53] uppercase tracking-widest font-bold flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#C89B53]" />
                        {item.tag}
                      </div>

                      <div className="font-mono text-[7px] text-white/80 tracking-widest bg-black/70 px-1.5 py-0.5 rounded-sm border border-white/5 font-semibold">
                        {item.scene}
                      </div>
                    </div>

                    {/* Film Sprocket Perforation Dots */}
                    <div className="relative z-10 flex items-center justify-between px-1 opacity-40">
                      <div className="w-1 h-1 rounded-full bg-white/60" />
                      <div className="w-1 h-1 rounded-full bg-white/60" />
                    </div>

                    {/* Compact Bottom HUD Overlay */}
                    <div className="relative z-10 pt-1.5 border-t border-white/10 bg-[#08080A] -mx-2.5 -mb-2.5 sm:-mx-3 sm:-mb-3 p-2 sm:p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-orbitron text-[10px] sm:text-xs text-white font-bold tracking-tight truncate group-hover:text-[#C89B53] transition-colors">
                          {item.title}
                        </div>
                        <div className="font-mono text-[7px] text-[#C89B53] shrink-0 font-semibold">
                          0{index + 1}
                        </div>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[7px] text-white/50 pt-0.5">
                        <span className="truncate max-w-[150px] sm:max-w-[190px]">{item.gear}</span>
                        <span className="text-[#C89B53]/80">{item.specs.split("//")[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* BESPOKE CINEMA CONTROLLER: JOG-DIAL SCRUBBER & OPTICAL SHUTTER BRACKETS */}
        <div className="mt-4 sm:mt-6 max-w-3xl mx-auto flex flex-col items-center gap-3">
          {/* Cinema Timeline Scrubber Bar */}
          <div className="w-full liquid-glass-card px-3 sm:px-6 py-2.5 rounded-sm border border-white/10 flex items-center justify-between gap-2 sm:gap-6">
            {/* Left Optical Shutter Bracket Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Cinematic Frame"
              className="group/btn relative px-2.5 sm:px-4 py-1.5 overflow-hidden rounded-sm border border-white/15 bg-white/[0.03] hover:border-[#C89B53] hover:bg-[#C89B53]/10 transition-all duration-300 flex items-center gap-1.5 shrink-0"
            >
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C89B53] font-bold group-hover/btn:text-white transition-colors">
                [ ◀ PREV
              </span>
              <span className="hidden sm:inline font-mono text-[8px] text-white/40 group-hover/btn:text-[#C89B53]">
                RUSH ]
              </span>
            </button>

            {/* Interactive Film Frame Calibrated Scrubber */}
            <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
              {BTS_DATA.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => rotateToCard(idx)}
                    aria-label={`Select frame ${idx + 1}: ${item.title}`}
                    className={`relative flex flex-col items-center group/tab px-1.5 sm:px-2.5 py-1 rounded-sm transition-all duration-300 ${
                      isActive
                        ? "bg-[#C89B53]/15 border border-[#C89B53]/60 shadow-[0_0_12px_rgba(200,155,83,0.3)]"
                        : "hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    {/* Tick Mark */}
                    <span
                      className={`w-0.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "h-2.5 bg-[#C89B53]"
                          : "h-1 bg-white/25 group-hover/tab:bg-white/60 group-hover/tab:h-2"
                      }`}
                    />
                    {/* Frame Index */}
                    <span
                      className={`font-mono text-[8px] sm:text-[9px] tracking-wider mt-0.5 ${
                        isActive
                          ? "text-[#C89B53] font-bold"
                          : "text-white/40 group-hover/tab:text-white/80"
                      }`}
                    >
                      FR 0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Optical Shutter Bracket Button */}
            <button
              onClick={handleNext}
              aria-label="Next Cinematic Frame"
              className="group/btn relative px-2.5 sm:px-4 py-1.5 overflow-hidden rounded-sm border border-white/15 bg-white/[0.03] hover:border-[#C89B53] hover:bg-[#C89B53]/10 transition-all duration-300 flex items-center gap-1.5 shrink-0"
            >
              <span className="hidden sm:inline font-mono text-[8px] text-white/40 group-hover/btn:text-[#C89B53]">
                [ NEXT
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C89B53] font-bold group-hover/btn:text-white transition-colors">
                RUSH ▶ ]
              </span>
            </button>
          </div>

          {/* Focal Active Metadata Strip */}
          <div className="w-full flex items-center justify-between px-2 font-mono text-[8px] sm:text-[9px] text-white/50">
            <div className="flex items-center gap-2">
              <Disc3 className="w-3 h-3 text-[#C89B53] animate-[spin_8s_linear_infinite]" />
              <span className="text-white/80 font-medium truncate max-w-[200px] sm:max-w-md">
                {`ACTIVE: ${activeCard.title} // ${activeCard.role}`}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-white/40">
              <Sliders className="w-2.5 h-2.5 text-[#C89B53]" />
              <span>{activeCard.specs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
