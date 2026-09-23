import HeroSection from "@/components/sections/HeroSection";
import EditorialScrollGallery from "@/components/sections/EditorialScrollGallery";
import DisciplinesSection from "@/components/sections/DisciplinesSection";
import ColorLabSection from "@/components/sections/ColorLabSection";
import ReadoutsSection from "@/components/sections/ReadoutsSection";
import WorkSection from "@/components/sections/WorkSection";
import ProofSection from "@/components/sections/ProofSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO (100vh Full-Bleed Viewfinder HUD, Aspect Ratio Switcher, Timecode, Showreel Modal) */}
      <HeroSection />

      {/* 2. SCROLL-DRIVEN HORIZONTAL EDITORIAL GALLERY (4-Chapter Cinema Story Essay) */}
      <EditorialScrollGallery />

      {/* 3. THREE DISCIPLINES (Desktop 60%/20% Expanding Panels & Mobile Accordion) */}
      <DisciplinesSection />

      {/* 4. INTERACTIVE LOOK LAB (ACES 1.3 / DaVinci Resolve Color Grading & Scopes) */}
      <ColorLabSection />

      {/* 5. READOUTS (Camera-Display Telemetry Stats Counting Up & Velocity Marquee) */}
      <ReadoutsSection />

      {/* 6. SELECTED WORK (Editorial Masonry Grid, Video Hover Autoplay, URL Query Sync) */}
      <WorkSection />

      {/* 7. PROOF (Client Logos, Quote Carousel, Gear Spec Sheet, Packages, Awards, BTS Drag Strip) */}
      <ProofSection />

      {/* 8. STUDIO MANIFESTO & PHILOSOPHY */}
      <AboutSection />

      {/* 9. INITIATE COMMISSION & BOOKING FORM */}
      <ContactSection />

      {/* 10. FOOTER */}
      <Footer />
    </div>
  );
}
