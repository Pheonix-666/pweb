"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Film, Camera, Scissors } from "lucide-react";
import { projects, Project } from "@/data/projects";

interface VideoCardProps {
  project: Project;
}

function VideoHoverCard({ project }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="play"
      className={`group relative overflow-hidden liquid-glass-card flex flex-col justify-between rounded-sm ${
        project.spanClass || "col-span-1"
      }`}
    >
      {/* Media Canvas Container */}
      <div className={`relative w-full ${project.aspectClass || "aspect-[16/9]"} overflow-hidden bg-black`}>
        {/* Poster Image */}
        <Image
          src={project.thumb}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-500 filter grayscale-[20%] contrast-110 group-hover:scale-105 transition-transform duration-700 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Hover Autoplay Video */}
        {project.video?.mp4 && (
          <video
            ref={videoRef}
            src={project.video.mp4}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent pointer-events-none" />

        {/* Top Badges: Category & Year */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="timecode-badge text-[9px] sm:text-[10px]">
            {project.category === "film" ? (
              <Film className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rec" />
            ) : (
              <Scissors className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
            )}
            <span className="uppercase">{project.category}</span>
          </span>

          <span className="font-mono text-[9px] sm:text-[10px] bg-[#0d0d11]/70 backdrop-blur-md px-2.5 py-1 border border-white/10 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            {project.year}
          </span>
        </div>

        {/* Duration Badge */}
        {project.video?.duration && (
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 bg-[#0d0d11]/80 backdrop-blur-md border border-white/10 font-mono text-[9px] sm:text-[10px] text-tungsten tracking-widest uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
            <span>{project.video.duration}</span>
          </div>
        )}
      </div>

      {/* Caption & Project Info */}
      <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3 bg-[#101014]/60 backdrop-blur-lg border-t border-white/[0.06]">
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted uppercase tracking-widest">
          <span>{project.client}</span>
          <span className="text-[#C89B53]">[{project.tags[0]}]</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary group-hover:text-[#C89B53] transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted group-hover:text-[#C89B53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function PhotoCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className={`group relative overflow-hidden liquid-glass-card flex flex-col justify-between rounded-sm ${
        project.spanClass || "col-span-1"
      }`}
    >
      {/* Media Canvas Container */}
      <div className={`relative w-full ${project.aspectClass || "aspect-[4/5]"} overflow-hidden bg-black`}>
        <Image
          src={project.thumb}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[25%] contrast-115 group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="timecode-badge text-[9px] sm:text-[10px]">
            <Camera className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-tungsten" />
            <span className="uppercase">PHOTOGRAPHY</span>
          </span>

          <span className="font-mono text-[9px] sm:text-[10px] bg-[#0d0d11]/70 backdrop-blur-md px-2.5 py-1 border border-white/10 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            {project.year}
          </span>
        </div>
      </div>

      {/* Caption & Project Info */}
      <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3 bg-[#101014]/60 backdrop-blur-lg border-t border-white/[0.06]">
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted uppercase tracking-widest">
          <span>{project.client}</span>
          <span className="text-[#C89B53]">[{project.tags[0]}]</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary group-hover:text-[#C89B53] transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted group-hover:text-[#C89B53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function WorkSectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const typeParam = searchParams.get("type") || "all";
  const [activeCategory, setActiveCategory] = useState<string>(typeParam);

  const handleCategoryChange = React.useCallback(
    (category: string) => {
      setActiveCategory(category);
      const params = new URLSearchParams(searchParams.toString());
      if (category === "all") {
        params.delete("type");
      } else {
        params.set("type", category);
      }
      const query = params.toString() ? `?${params.toString()}` : "";
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    if (typeParam) {
      setActiveCategory(typeParam);
    }
  }, [typeParam]);

  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      if (customEvent.detail?.category) {
        handleCategoryChange(customEvent.detail.category);
      }
    };

    window.addEventListener("filter-work", handleFilterEvent);
    return () => window.removeEventListener("filter-work", handleFilterEvent);
  }, [handleCategoryChange]);

  const categories = [
    { id: "all", label: "All Selected", count: projects.length },
    { id: "photography", label: "Photography", count: projects.filter((p) => p.category === "photography").length },
    { id: "film", label: "Film & Cinema", count: projects.filter((p) => p.category === "film").length },
    { id: "edit", label: "Editing & Grade", count: projects.filter((p) => p.category === "edit").length },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-16 sm:py-24 md:py-36 border-b border-white/10 relative bg-[#08080A] select-none">
      {/* Subtle liquid glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C89B53]/[0.025] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header with Live Project Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-8 h-[1px] bg-[#C89B53]" />
              <span className="font-outfit text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#C89B53] font-bold">
                Archive Matrix // [{filteredProjects.length.toString().padStart(2, "0")} Curated Works]
              </span>
            </div>
            <h2 className="font-syncopate text-3xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#C89B53]">Work.</span>
            </h2>
          </div>

          {/* Liquid Glass Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 p-1.5 rounded-[6px] bg-[#111116]/60 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  data-cursor="hover"
                  className={`whitespace-nowrap px-4 py-2 rounded-[4px] font-outfit text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-[#C89B53] text-black font-bold shadow-[0_0_20px_rgba(200,155,83,0.35)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1.5 opacity-60 text-[10px]">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 sm:mt-14">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                {project.category === "photography" ? (
                  <PhotoCard project={project} />
                ) : (
                  <VideoHoverCard project={project} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function WorkSection() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-32 flex items-center justify-center text-xs font-mono text-muted uppercase tracking-widest">
          Loading archive matrix...
        </div>
      }
    >
      <WorkSectionContent />
    </Suspense>
  );
}
