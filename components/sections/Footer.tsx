"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Film, Clock, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatTimecode } from "@/lib/utils";

export default function Footer() {
  const [frames, setFrames] = useState(0);
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    // Timecode tick
    const tcTimer = setInterval(() => {
      setFrames((prev) => (prev + 1) % 86400);
    }, 1000 / 24);

    // Live Local Time Clock (Mumbai / IST)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const clockTimer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(tcTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surface border-t border-hairline py-20 text-primary select-none">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 space-y-16">
        {/* Main Footer Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-hairline items-start">
          {/* Left Column: Giant Studio Wordmark */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 border border-hairline bg-elevated">
                <Film className="w-4 h-4 text-tungsten" />
              </span>
              <span className="font-serif text-3xl md:text-4xl tracking-tight text-primary">
                {siteConfig.studioName}
              </span>
            </div>
            <p className="font-mono text-xs text-muted max-w-md leading-relaxed">
              {siteConfig.tagline} An independent creative visual atelier specializing in large-format cinematography, medium-format editorial portraiture, and surgical rhythm editing.
            </p>

            {/* Live Clock Strip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-elevated border border-hairline font-mono text-xs text-muted">
              <Clock className="w-3.5 h-3.5 text-tungsten animate-pulse" />
              <span>MUMBAI STUDIO TIME:</span>
              <span className="text-primary font-bold tabular-nums">
                {localTime ? `${localTime} IST` : "CALIBRATING..."}
              </span>
            </div>
          </div>

          {/* Quick Directory Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase">
              {"// DIRECTORY"}
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#work" className="text-muted hover:text-primary transition-colors">
                  [ 01 ] Selected Work
                </a>
              </li>
              <li>
                <a href="#craft" className="text-muted hover:text-primary transition-colors">
                  [ 02 ] Edit Timeline & Craft
                </a>
              </li>
              <li>
                <a href="#proof" className="text-muted hover:text-primary transition-colors">
                  [ 03 ] Proof, Arsenal & Rates
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted hover:text-primary transition-colors">
                  [ 04 ] Studio Manifesto
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted hover:text-primary transition-colors">
                  [ 05 ] Initiate Commission
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Back to Top */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase">
              {"// ARCHIVAL FEEDS"}
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-elevated border border-hairline hover:border-tungsten text-muted hover:text-primary transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                data-cursor="hover"
                className="w-full p-3 border border-hairline bg-elevated hover:border-tungsten transition-colors text-primary flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest"
                aria-label="Back to top"
              >
                <span>RETURN TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 text-tungsten" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Telemetry Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted">
          <div>
            © {new Date().getFullYear()} {siteConfig.studioName}. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span>TC: <span className="text-tungsten tabular-nums">{formatTimecode(frames)}</span></span>
            <span>·</span>
            <span>24.00 FPS</span>
            <span>·</span>
            <span>ACES 1.3 P3-D65</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
