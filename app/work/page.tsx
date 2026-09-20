import React from "react";
import type { Metadata } from "next";
import WorkSection from "@/components/sections/WorkSection";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Selected Works & Archives — ${siteConfig.name}`,
  description:
    "Explore the complete directorial, cinematographic, editorial, and fashion photography archive of Rahul Singh Studio.",
};

export default function WorkPage() {
  return (
    <div className="pt-24 min-h-screen flex flex-col justify-between bg-background">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 pt-10 pb-4">
        <div className="font-mono text-xs text-tungsten tracking-widest uppercase mb-2">
          {"// COMPLETE PRODUCTION ARCHIVE"}
        </div>
        <h1 className="font-serif heading-display-xl text-primary">
          Film, Editorial & <span className="italic text-tungsten font-light">Motion.</span>
        </h1>
        <p className="text-fluid-body text-muted max-w-2xl font-light mt-4">
          A comprehensive catalogue of commercial brand films, international fashion lookbooks, luxury destination cinema, and precision offline edits.
        </p>
      </div>

      <WorkSection />
      <Footer />
    </div>
  );
}
