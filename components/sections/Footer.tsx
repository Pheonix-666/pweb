"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
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
      clearInterval(clockTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-16 sm:pt-24 pb-12 sm:pb-16 text-white select-none relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C89B53]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-12 sm:space-y-16 md:space-y-20">
        {/* Giant Monolithic Studio Wordmark */}
        <div className="border-b border-white/10 pb-10 sm:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-[1px] bg-[#C89B53]" />
                <span className="font-orbitron text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C89B53] font-bold">
                  The Atelier // Global Entertainment Studio
                </span>
              </div>
              <h2 className="font-orbitron text-3xl sm:text-5xl md:text-7xl lg:text-[5.5vw] font-black uppercase tracking-wider text-white leading-none">
                STARLOOP <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#C89B53]">ENTERTAINMENT</span>
              </h2>
            </div>

            <button
              onClick={scrollToTop}
              data-cursor="hover"
              className="w-fit inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/15 bg-white/5 hover:border-[#C89B53] hover:bg-[#C89B53]/10 transition-all duration-300 font-orbitron text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white font-semibold backdrop-blur-md"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C89B53]" />
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 pb-10 sm:pb-16 border-b border-white/10">
          <div className="sm:col-span-2 md:col-span-4 space-y-4 sm:space-y-6">
            <p className="font-outfit text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm font-light">
              Curating silent stages, architectural precision, and visceral moving pictures for luxury brands and visionary directors worldwide.
            </p>

            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#121214] border border-white/10 font-outfit text-[10px] sm:text-[11px] text-white/70">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C89B53] animate-pulse" />
              <span className="uppercase tracking-wider">MUMBAI / IST:</span>
              <span className="text-white font-bold font-mono">
                {localTime ? `${localTime}` : "LIVE"}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6 space-y-3 sm:space-y-4">
            <h4 className="font-orbitron text-[#C89B53] uppercase tracking-wider text-[11px] sm:text-xs font-bold">
              Directory
            </h4>
            <div className="flex flex-col gap-2 font-outfit text-xs uppercase tracking-widest text-white/60">
              <a href="#work" className="hover:text-[#C89B53] transition-colors w-fit">
                01. Selected Works
              </a>
              <a href="#disciplines" className="hover:text-[#C89B53] transition-colors w-fit">
                02. Disciplines & Craft
              </a>
              <a href="#collection" className="hover:text-[#C89B53] transition-colors w-fit">
                03. Philosophy & Stills
              </a>
              <a href="#contact" className="hover:text-[#C89B53] transition-colors w-fit">
                04. Initiate Inquiries
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10 space-y-3 sm:space-y-4">
            <h4 className="font-orbitron text-[#C89B53] uppercase tracking-wider text-[11px] sm:text-xs font-bold">
              Socials & Feeds
            </h4>
            <div className="flex flex-col gap-2 font-outfit text-xs uppercase tracking-widest text-white/60">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C89B53] transition-colors w-fit"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Specs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-outfit text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider sm:tracking-widest">
          <div>
            © {new Date().getFullYear()} STARLOOP ENTERTAINMENT. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span>Coordinates: 34.0522° N, 118.2437° W</span>
            <span>·</span>
            <span className="text-[#C89B53]">ACES 1.3 REC.709</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
