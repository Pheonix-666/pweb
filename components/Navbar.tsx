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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-hairline py-3.5 shadow-2xl"
            : "bg-transparent py-5 md:py-7 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Left: Logo Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-primary text-sm md:text-base font-medium tracking-tight"
            data-cursor="hover"
          >
            <span className="flex items-center justify-center w-6 h-6 border border-hairline bg-surface group-hover:border-tungsten transition-colors">
              <Film className="w-3.5 h-3.5 text-tungsten" />
            </span>
            <span className="font-semibold tracking-wider font-sans uppercase text-xs md:text-sm">
              Rahul Singh
            </span>
            <span className="text-[10px] font-mono tracking-widest text-muted hidden sm:inline-block border-l border-hairline pl-2 ml-0.5">
              STUDIO
            </span>
          </Link>

          {/* Centre: Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 border border-hairline bg-surface/80 px-6 py-2 rounded-none backdrop-blur-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs font-mono uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-1.5 py-1 relative group"
                data-cursor="hover"
              >
                <span className="text-[9px] text-tungsten opacity-60 group-hover:opacity-100 transition-opacity">
                  {link.labelNumber}
                </span>
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-tungsten transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Booking Status & CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Pulsing Green Available Badge */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted tracking-wider bg-surface/50 border border-hairline px-3 py-1.5">
              <span className="status-indicator" />
              <span className="text-primary/90">Available for bookings</span>
            </div>

            {/* Book A Shoot Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="group relative inline-flex items-center gap-2 bg-primary hover:bg-tungsten text-background text-xs font-mono font-medium uppercase tracking-wider px-4 py-2.5 transition-colors duration-200"
              data-cursor="hover"
            >
              <span>Book a Shoot</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="text-[11px] font-mono tracking-wider bg-primary text-background px-3 py-1.5 font-medium"
            >
              Book
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-hairline bg-surface text-primary hover:border-tungsten transition-colors"
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
