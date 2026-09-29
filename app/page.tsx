import HeroSection from "@/components/sections/HeroSection";
import EditorialScrollGallery from "@/components/sections/EditorialScrollGallery";
import DisciplinesSection from "@/components/sections/DisciplinesSection";
import WorkSection from "@/components/sections/WorkSection";
import ProofSection from "@/components/sections/ProofSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. SCROLL-DRIVEN HORIZONTAL EDITORIAL GALLERY */}
      <EditorialScrollGallery />

      {/* 3. THREE DISCIPLINES */}
      <DisciplinesSection />


      {/* 5. SELECTED WORK */}
      <WorkSection />

      {/* 6. PROOF */}
      <ProofSection />

      {/* 7. STUDIO MANIFESTO & PHILOSOPHY */}
      <AboutSection />

      {/* 8. INITIATE COMMISSION & BOOKING FORM */}
      <ContactSection />

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
