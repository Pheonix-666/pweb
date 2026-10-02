"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";

interface NavLinkItem {
  name: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Recognition", href: "#proof" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 sm:py-6 px-6 sm:px-8 md:px-12 lg:px-16 ${
          isScrolled
            ? "liquid-glass-nav"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          {/* Left: Starloop Octagonal Logo Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-orbitron font-bold text-base sm:text-lg text-primary tracking-wider uppercase group transition-colors"
          >
            {/* Octagonal Logo Badge in Metallic Gold */}
            <div className="relative flex items-center justify-center">
              <svg width="19" height="19" viewBox="0 0 24 24" className="fill-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] flex-shrink-0 transition-transform group-hover:scale-105">
                <polygon points="7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-primary font-black tracking-widest">STARLOOP</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#E5C178] text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] hidden sm:inline-block">
                ENTERTAINMENT
              </span>
            </div>
          </Link>

          {/* Centre: Nav links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs lg:text-[13px] font-sans text-muted hover:text-primary transition-colors tracking-wide font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Minimal Inquire Button */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2 rounded-[4px] border border-white/15 hover:border-[#A855F7]/60 text-primary text-xs lg:text-[13px] font-orbitron uppercase font-medium tracking-wider transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md"
            >
              Inquire
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-[4px] border border-white/20 text-primary hover:border-white transition-colors bg-white/[0.04] backdrop-blur-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-2xl font-orbitron uppercase text-primary hover:text-[#A855F7] transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="inline-block px-6 py-3 rounded-[4px] border border-white/25 text-primary text-xs font-orbitron uppercase tracking-wider bg-white/[0.06] backdrop-blur-md"
                >
                  Inquire
                </a>
              </motion.div>
            </div>

            <div className="text-xs font-sans text-muted border-t border-hairline pt-4 flex justify-between">
              <span>{siteConfig.location}</span>
              <span>{siteConfig.contact.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
