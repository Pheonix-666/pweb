
import type { Metadata, Viewport } from "next";
import { instrumentSerif, interTight, jetbrainsMono } from "./fonts";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.heroHeadline + " " + siteConfig.heroDescription,
  keywords: [
    "Cinematographer",
    "Director of Photography",
    "Film Editor",
    "DaVinci Resolve Colorist",
    "Commercial Film Production",
    "Mumbai Cinematographer",
    "Luxury Fashion Editorial",
  ],
  authors: [{ name: siteConfig.name, url: "https://rahulsingh.studio" }],
  creator: siteConfig.name,
  publisher: siteConfig.studioName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulsingh.studio",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.heroHeadline,
    siteName: siteConfig.studioName,
    images: [
      {
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Visual Studio Showreel`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.heroHeadline,
    creator: "@rahulsingh",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.studioName,
    alternateName: siteConfig.name,
    url: "https://rahulsingh.studio",
    logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    description: siteConfig.heroDescription,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.location,
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    sameAs: siteConfig.socials.map((s) => s.href),
    priceRange: "$$$$",
  };

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-primary font-sans selection:bg-tungsten selection:text-background min-h-screen relative overflow-x-hidden antialiased">
        <SmoothScrollProvider>
          <Preloader />
          <GrainOverlay />
          <Cursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
