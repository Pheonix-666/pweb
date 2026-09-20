import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Film, Camera, Scissors, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import CustomVideoPlayer from "@/components/work/CustomVideoPlayer";
import BeforeAfterSlider from "@/components/work/BeforeAfterSlider";
import LightboxGallery from "@/components/work/LightboxGallery";
import Footer from "@/components/sections/Footer";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.brief,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.brief,
      images: [{ url: project.cover }],
    },
  };
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const prevProject = projects[currentIndex > 0 ? currentIndex - 1 : projects.length - 1];
  const nextProject = projects[currentIndex < projects.length - 1 ? currentIndex + 1 : 0];

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-tungsten selection:text-background">
      {/* 1. Full-Bleed Hero Canvas */}
      <div className="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] border-b border-hairline overflow-hidden bg-black flex flex-col justify-between p-6 md:p-14">
        {/* Background Cover Image or Video */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            className="object-cover filter brightness-[0.4] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Top Back Navigation Bar */}
        <div className="relative z-10 flex items-center justify-between pt-16 md:pt-20">
          <Link
            href="/#work"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-hairline bg-surface/80 hover:border-tungsten text-xs font-mono tracking-wider uppercase text-muted hover:text-primary transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Work</span>
          </Link>

          <div className="timecode-badge text-[10px]">
            {project.category === "film" ? (
              <Film className="w-3 h-3 text-rec" />
            ) : project.category === "photography" ? (
              <Camera className="w-3 h-3 text-tungsten" />
            ) : (
              <Scissors className="w-3 h-3 text-primary" />
            )}
            <span className="uppercase">{project.category} CASE STUDY</span>
          </div>
        </div>

        {/* Hero Title and Metadata */}
        <div className="relative z-10 max-w-5xl space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-tungsten uppercase tracking-widest">
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className="text-primary">{project.tags.join(" / ")}</span>
          </div>

          <h1 className="font-serif heading-display-xl text-primary font-normal">
            {project.title.split(" ")[0]}{" "}
            <span className="italic text-tungsten font-light">
              {project.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
        </div>
      </div>

      {/* 2. Main 2-Column Content Layout */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          {/* Left Column: Sticky Sidebar (Brief, Roles, Gear, Credits) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8 border-b lg:border-b-0 lg:border-r border-hairline pb-12 lg:pb-0 lg:pr-10">
            {/* The Brief */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
                <span className="w-4 h-[1px] bg-tungsten inline-block" />
                THE BRIEF & OBJECTIVE
              </div>
              <p className="text-sm text-primary/90 leading-relaxed font-light">
                {project.brief}
              </p>
            </div>

            {/* Studio Roles */}
            <div className="space-y-3 pt-6 border-t border-hairline">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase">
                STUDIO ROLES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.roles.map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 bg-surface border border-hairline font-mono text-xs text-primary"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Production Gear */}
            <div className="space-y-3 pt-6 border-t border-hairline">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase">
                CAPTURE HARDWARE & OPTICS
              </div>
              <ul className="space-y-2">
                {project.gear.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs text-muted flex items-start gap-2"
                  >
                    <span className="text-tungsten">›</span>
                    <span className="text-primary/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Production Credits */}
            <div className="space-y-3 pt-6 border-t border-hairline">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase">
                PRODUCTION CREDITS
              </div>
              <div className="space-y-2">
                {project.credits.map((credit, i) => (
                  <div key={i} className="flex items-baseline justify-between text-xs">
                    <span className="font-mono text-[11px] text-muted uppercase">
                      {credit.role}
                    </span>
                    <span className="font-sans text-primary font-medium">
                      {credit.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column: Narrative, Video Player, Before/After & Gallery */}
          <main className="lg:col-span-8 space-y-16">
            {/* Custom Video Player (if video exists) */}
            {project.video?.mp4 && (
              <section className="space-y-4">
                <CustomVideoPlayer
                  src={project.video.mp4}
                  poster={project.video.poster || project.cover}
                  title={project.title}
                  aspectRatio={project.video.aspectRatio || "16/9"}
                />
              </section>
            )}

            {/* The Approach Narrative */}
            <section className="space-y-4">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
                <span className="w-6 h-[1px] bg-tungsten inline-block" />
                METHODOLOGY & CINEMATIC EXECUTION
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                The Creative <span className="italic text-tungsten font-light">Approach.</span>
              </h2>
              <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                {project.approach}
              </p>
            </section>

            {/* Before / After Color Grading Slider (for edit or film projects) */}
            {project.beforeAfter && (
              <section className="pt-6 border-t border-hairline">
                <BeforeAfterSlider
                  rawImage={project.beforeAfter.raw}
                  gradedImage={project.beforeAfter.graded}
                  labelRaw={project.beforeAfter.labelRaw}
                  labelGraded={project.beforeAfter.labelGraded}
                />
              </section>
            )}

            {/* The Impact & Result */}
            <section className="space-y-4 pt-6 border-t border-hairline">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
                <span className="w-6 h-[1px] bg-tungsten inline-block" />
                RECEPTION & ACCLAIM
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary">
                The Critical <span className="italic text-tungsten font-light">Impact.</span>
              </h2>
              <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                {project.result}
              </p>
            </section>

            {/* Stills Lightbox Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="pt-6 border-t border-hairline">
                <LightboxGallery images={project.gallery} title={project.title} />
              </section>
            )}
          </main>
        </div>

        {/* 3. Footer Navigation (Previous / Next Project & CTA) */}
        <div className="mt-24 pt-16 border-t border-hairline">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Previous Project */}
            <Link
              href={`/work/${prevProject.slug}`}
              data-cursor="hover"
              className="group p-6 md:p-8 border border-hairline bg-surface hover:border-tungsten transition-colors flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5 text-tungsten" />
                  PREVIOUS REEL
                </div>
                <div className="font-serif text-2xl text-primary group-hover:text-tungsten transition-colors">
                  {prevProject.title}
                </div>
              </div>
              <div className="relative w-16 h-16 border border-hairline overflow-hidden bg-black flex-shrink-0">
                <Image
                  src={prevProject.thumb}
                  alt={prevProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            {/* Next Project */}
            <Link
              href={`/work/${nextProject.slug}`}
              data-cursor="hover"
              className="group p-6 md:p-8 border border-hairline bg-surface hover:border-tungsten transition-colors flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase flex items-center gap-1 justify-end">
                  NEXT REEL
                  <ChevronRight className="w-3.5 h-3.5 text-tungsten" />
                </div>
                <div className="font-serif text-2xl text-primary group-hover:text-tungsten transition-colors text-right">
                  {nextProject.title}
                </div>
              </div>
              <div className="relative w-16 h-16 border border-hairline overflow-hidden bg-black flex-shrink-0 order-first md:order-last">
                <Image
                  src={nextProject.thumb}
                  alt={nextProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Start Similar Project CTA */}
          <div className="mt-12 p-8 md:p-12 border border-hairline bg-surface text-center space-y-4">
            <h3 className="font-serif text-3xl md:text-4xl text-primary">
              Have a visionary project in <span className="italic text-tungsten font-light">mind?</span>
            </h3>
            <p className="text-xs md:text-sm text-muted max-w-lg mx-auto font-light">
              Let&apos;s collaborate to craft high-impact cinematic visuals, editorial campaigns, or master offline edits.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-tungsten text-background font-mono text-xs uppercase tracking-widest font-semibold transition-colors duration-200"
              >
                <span>Start a Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
