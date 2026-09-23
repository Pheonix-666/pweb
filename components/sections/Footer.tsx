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
    <footer className="bg-[#050507] border-t border-white/10 pt-24 pb-16 text-white select-none relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#B8860B]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 space-y-20">
        {/* Giant Monolithic Studio Wordmark */}
        <div className="border-b border-white/10 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#B8860B]" />
                <span className="font-outfit text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#B8860B] font-bold">
                  The Atelier // Cinematic Visual Studio
                </span>
              </div>
              <h2 className="font-syncopate text-5xl sm:text-7xl md:text-8xl lg:text-[7vw] font-bold uppercase tracking-tighter text-white leading-none">
                Rahul <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#B8860B]">Singh</span>
              </h2>
            </div>

            <button
              onClick={scrollToTop}
              data-cursor="hover"
              className="w-fit inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 hover:border-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300 font-outfit text-xs uppercase tracking-[0.3em] text-white font-semibold backdrop-blur-md"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-4 h-4 text-[#B8860B]" />
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-4 space-y-6">
            <p className="font-outfit text-sm text-white/60 leading-relaxed max-w-sm font-light">
              Curating silent stages, architectural precision, and visceral moving pictures for luxury brands and visionary directors worldwide.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#121214] border border-white/10 font-outfit text-[11px] text-white/70">
              <Clock className="w-3.5 h-3.5 text-[#B8860B] animate-pulse" />
              <span className="uppercase tracking-wider">MUMBAI / IST:</span>
              <span className="text-white font-bold font-mono">
                {localTime ? `${localTime}` : "LIVE"}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6 space-y-4">
            <h4 className="font-syncopate text-[#B8860B] uppercase tracking-wider text-xs font-bold">
              Directory
            </h4>
            <div className="flex flex-col gap-2.5 font-outfit text-xs uppercase tracking-widest text-white/60">
              <a href="#work" className="hover:text-[#B8860B] transition-colors w-fit">
                01. Selected Works
              </a>
              <a href="#disciplines" className="hover:text-[#B8860B] transition-colors w-fit">
                02. Disciplines & Craft
              </a>
              <a href="#collection" className="hover:text-[#B8860B] transition-colors w-fit">
                03. Philosophy & Stills
              </a>
              <a href="#contact" className="hover:text-[#B8860B] transition-colors w-fit">
                04. Initiate Inquiries
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10 space-y-4">
            <h4 className="font-syncopate text-[#B8860B] uppercase tracking-wider text-xs font-bold">
              Socials & Feeds
            </h4>
            <div className="flex flex-col gap-2.5 font-outfit text-xs uppercase tracking-widest text-white/60">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8860B] transition-colors w-fit"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Specs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-outfit text-[11px] text-white/40 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} RAHUL SINGH STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span>Coordinates: 34.0522° N, 118.2437° W</span>
            <span>·</span>
            <span className="text-[#B8860B]">ACES 1.3 REC.709</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
