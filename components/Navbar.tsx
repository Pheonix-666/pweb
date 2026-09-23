"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Film } from "lucide-react";
import { siteConfig } from "@/data/site";

interface NavLinkItem {
  name: string;
  href: string;
  labelNumber: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Work", href: "#work", labelNumber: "01" },
  { name: "Craft", href: "#craft", labelNumber: "02" },
  { name: "About", href: "#about", labelNumber: "03" },
  { name: "Contact", href: "#contact", labelNumber: "04" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-6 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Logo Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-primary text-sm md:text-base font-medium tracking-tight bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full hover:border-[#B8860B]/60 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            data-cursor="hover"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F3B353] text-[#0A0A0C] font-bold text-xs shadow-[0_0_12px_rgba(184,134,11,0.5)]">
              R
            </span>
            <span className="font-syncopate uppercase text-[11px] md:text-xs font-bold tracking-[0.2em] text-white">
              Rahul Singh
            </span>
            <span className="text-[9px] font-outfit uppercase tracking-[0.3em] text-[#B8860B] hidden sm:inline-block border-l border-white/10 pl-2 font-semibold">
              Studio
            </span>
          </Link>

          {/* Centre: Nav links (Desktop floating glass pill) */}
          <nav className="hidden md:flex items-center gap-1 border border-white/10 bg-[#0A0A0C]/80 p-1.5 rounded-full backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[10px] font-outfit uppercase tracking-[0.3em] text-white/70 hover:text-white px-5 py-2 rounded-full hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group font-semibold"
                data-cursor="hover"
              >
                <span className="text-[8px] font-syncopate text-[#B8860B] opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.labelNumber}
                </span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Right: Booking Status & CTA */}
          <div className="flex items-center gap-3">
            {/* Pulsing Green Available Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-[#0A0A0C]/80 backdrop-blur-xl font-outfit text-[10px] uppercase tracking-[0.25em] text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-[#30A46C] animate-pulse shadow-[0_0_8px_#30A46C]" />
              <span className="text-[#30A46C] font-bold">Open for Commissions</span>
            </div>

            {/* Inquire Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="relative group overflow-hidden px-5 py-2 rounded-full border border-[#B8860B]/50 bg-gradient-to-r from-[#B8860B]/20 to-transparent backdrop-blur-xl font-outfit text-[10px] uppercase tracking-[0.3em] text-[#F5F5F5] font-bold hover:border-[#B8860B] transition-all duration-300 shadow-[0_0_20px_rgba(184,134,11,0.2)]"
              data-cursor="hover"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Inquire</span>
                <ArrowUpRight className="w-3 h-3 text-[#B8860B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#B8860B] transition-transform duration-500 ease-out -translate-y-full group-hover:translate-y-0" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0A0A0C]/90 text-white p-2 backdrop-blur-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 md:hidden"
          >
            {/* Navigation links with staggered animation */}
            <div className="flex flex-col space-y-6 my-auto">
              <div className="font-mono text-xs tracking-widest text-muted uppercase mb-2">
                {"// MENU DIRECTORY"}
              </div>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex items-baseline justify-between py-2 border-b border-hairline text-2xl font-serif tracking-tight text-primary hover:text-tungsten transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-xs text-muted tracking-widest">
                      [ {link.labelNumber} ]
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom metadata & actions */}
            <div className="space-y-4 pt-6 border-t border-hairline">
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="status-indicator" />
                <span>{siteConfig.availability.label}</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="w-full flex items-center justify-center gap-2 bg-tungsten text-background text-sm font-mono uppercase tracking-wider py-3.5 font-medium"
              >
                <span>Initiate Commission</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-2">
                <span>{siteConfig.location}</span>
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
