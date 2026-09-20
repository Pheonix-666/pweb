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
      className={`group relative overflow-hidden border border-hairline bg-surface flex flex-col justify-between hover:border-tungsten transition-colors duration-500 ${
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

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

        {/* Top Badges: Category & Year */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="timecode-badge text-[10px]">
            {project.category === "film" ? (
              <Film className="w-3 h-3 text-rec" />
            ) : (
              <Scissors className="w-3 h-3 text-primary" />
            )}
            <span className="uppercase">{project.category}</span>
          </span>

          <span className="font-mono text-[10px] bg-background/80 px-2.5 py-1 border border-hairline text-muted">
            {project.year}
          </span>
        </div>

        {/* Duration Badge */}
        {project.video?.duration && (
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-background/90 border border-hairline font-mono text-[10px] text-tungsten tracking-widest uppercase">
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>{project.video.duration}</span>
          </div>
        )}
      </div>

      {/* Caption & Project Info */}
      <div className="p-5 md:p-6 space-y-3 bg-surface group-hover:bg-elevated/80 transition-colors">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted uppercase tracking-widest">
          <span>{project.client}</span>
          <span className="text-tungsten">[{project.tags[0]}]</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl md:text-3xl text-primary group-hover:text-tungsten transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-tungsten group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
      className={`group relative overflow-hidden border border-hairline bg-surface flex flex-col justify-between hover:border-tungsten transition-colors duration-500 ${
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

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="timecode-badge text-[10px]">
            <Camera className="w-3 h-3 text-tungsten" />
            <span className="uppercase">PHOTOGRAPHY</span>
          </span>

          <span className="font-mono text-[10px] bg-background/80 px-2.5 py-1 border border-hairline text-muted">
            {project.year}
          </span>
        </div>
      </div>

      {/* Caption & Project Info */}
      <div className="p-5 md:p-6 space-y-3 bg-surface group-hover:bg-elevated/80 transition-colors">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted uppercase tracking-widest">
          <span>{project.client}</span>
          <span className="text-tungsten">[{project.tags[0]}]</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl md:text-3xl text-primary group-hover:text-tungsten transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-tungsten group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

  // Sync state when URL query changes
  useEffect(() => {
    if (typeParam) {
      setActiveCategory(typeParam);
    }
  }, [typeParam]);

  // Listen to custom window filter-work events from DisciplinesSection
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
    <section id="work" className="py-24 md:py-36 border-b border-hairline relative bg-background select-none">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Section Header with Live Project Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div>
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-tungsten inline-block" />
              ARCHIVE MATRIX
              <span className="text-muted ml-2">[{filteredProjects.length.toString().padStart(2, "0")} PROJECTS]</span>
            </div>
            <h2 className="font-serif heading-display-lg text-primary">
              Selected <span className="italic text-tungsten font-light">Work.</span>
            </h2>
          </div>

          {/* Filter Bar with Animated Underline */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 bg-surface p-1.5 border border-hairline">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  data-cursor="hover"
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? "text-primary font-medium" : "text-muted hover:text-primary"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{cat.label}</span>
                    <span className="text-[10px] text-tungsten opacity-70">
                      [{cat.count.toString().padStart(2, "0")}]
                    </span>
                  </span>

                  {/* Animated Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute inset-0 bg-elevated border border-hairline z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Masonry Grid with Mixed Aspect Ratios */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className={project.spanClass || "col-span-1"}
              >
                {project.category === "photography" ? (
                  <PhotoCard project={project} />
                ) : (
                  <VideoHoverCard project={project} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function WorkSection() {
  return (
    <Suspense
      fallback={
        <div className="py-24 max-w-[1440px] mx-auto px-5 md:px-10 text-center font-mono text-xs text-muted">
          INITIALIZING REEL ARCHIVE...
        </div>
      }
    >
      <WorkSectionContent />
    </Suspense>
  );
}
