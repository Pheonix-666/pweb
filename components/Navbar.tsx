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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-6 px-6 sm:px-10 md:px-14 lg:px-20 ${
          isScrolled
            ? "bg-[#070708]/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          {/* Left: Serif Logo Wordmark */}
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl text-white tracking-normal hover:text-[#C89B53] transition-colors"
          >
            {siteConfig.name}
          </Link>

          {/* Centre: Nav links matching reference */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs lg:text-[13px] font-sans text-white/70 hover:text-white transition-colors tracking-wide"
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
              className="hidden sm:inline-flex items-center justify-center px-5 py-1.5 rounded-[4px] border border-white/30 hover:border-white text-white text-xs lg:text-[13px] font-sans font-normal tracking-wide transition-all duration-300"
            >
              Inquire
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-[4px] border border-white/20 text-white hover:border-white transition-colors"
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#070708]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-2xl font-serif text-white hover:text-[#C89B53] transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="inline-block px-6 py-2.5 rounded-[4px] border border-white/30 text-white text-sm font-sans tracking-wide"
                >
                  Inquire
                </a>
              </motion.div>
            </div>

            <div className="text-xs font-sans text-white/50 border-t border-white/10 pt-4 flex justify-between">
              <span>{siteConfig.location}</span>
              <span>{siteConfig.contact.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
