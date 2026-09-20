export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
}

export interface PricingPackage {
  id: string;
  tier: string;
  name: string;
  description: string;
  idealFor: string;
  timeline: string;
  deliverables: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  project: string;
}

export interface ClientLogo {
  name: string;
  category: string;
}

export interface GearCategory {
  category: string;
  items: {
    name: string;
    specs: string;
    role: string;
  }[];
}

export interface SiteConfig {
  name: string;
  title: string;
  studioName: string;
  tagline: string;
  heroHeadline: string;
  heroDescription: string;
  location: string;
  availability: {
    status: "available" | "limited" | "booked";
    label: string;
    currentLocation: string;
    nextAvailableMonth: string;
  };
  stats: {
    value: string;
    label: string;
    detail: string;
  }[];
  services: ServiceItem[];
  packages: PricingPackage[];
  clients: ClientLogo[];
  testimonials: Testimonial[];
  gearKit: GearCategory[];
  socials: {
    platform: string;
    label: string;
    href: string;
    handle: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    timezone: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Rahul Singh",
  title: "Cinematographer, Photographer & Editor",
  studioName: "STUDIO Rahul Singh",
  tagline: "Visual narratives carved in light, motion and precision rhythm.",
  heroHeadline: "Crafting atmospheric cinema, editorial imagery & visceral edits.",
  heroDescription:
    "An independent creative visual studio partnering with luxury brands, directors, and forward-thinking artists globally. From raw conceptual framing to master color conformed delivery.",
  location: "Mumbai & Worldwide",
  availability: {
    status: "available",
    label: "Available for worldwide commissions (Q3/Q4)",
    currentLocation: "Available on-location worldwide",
    nextAvailableMonth: "Immediate availability for select productions",
  },
  stats: [
    {
      value: "09+",
      label: "Years in Cinema",
      detail: "Narrative, commercial & documentary",
    },
    {
      value: "140+",
      label: "Projects Delivered",
      detail: "Global brand films & campaigns",
    },
    {
      value: "18",
      label: "International Laurels",
      detail: "Film festivals & craft awards",
    },
    {
      value: "8K",
      label: "Mastering Standard",
      detail: "High dynamic range & ACES pipeline",
    },
  ],
  services: [
    {
      id: "cinematography",
      number: "01",
      title: "Cinematography & Direction",
      tagline: "Sculpting light and dynamic camera movement for cinema.",
      description:
        "Full-spectrum Director of Photography services for commercials, feature films, high-end weddings, and music videos. Specializing in anamorphic optics, macro probe systems, and precision motion control.",
      capabilities: [
        "Director of Photography (DP)",
        "Anamorphic & Large Format Framing",
        "Robotic & Vehicle Pursuit Rigging",
        "Atmospheric Chiaroscuro Lighting Design",
        "16mm & 35mm Celluloid Filming",
      ],
      deliverables: [
        "4K/8K RAW Master Capture",
        "LUT Development & On-Set DIT",
        "Director's Cut Framing",
        "Cinematic Showreels & Cutdowns",
      ],
    },
    {
      id: "photography",
      number: "02",
      title: "Editorial & Commercial Stills",
      tagline: "Timeless medium format still imagery with tactile depth.",
      description:
        "High-concept fashion lookbooks, luxury architectural monographs, and precision still life product campaigns. Every frame is treated with painterly lighting and archival-grade color tonality.",
      capabilities: [
        "Medium Format Digital & Film",
        "Fashion & High-End Portraiture",
        "Still Life & Luxury Product Stills",
        "Architectural & Interior Perspectives",
        "Location & Natural Element Scouting",
      ],
      deliverables: [
        "100MP High-Resolution TIFF Masters",
        "Fine-Art Retouching & Color Grading",
        "Web & Print Ready Optimization",
        "Curated Editorial Contact Sheets",
      ],
    },
    {
      id: "editing",
      number: "03",
      title: "Film Editing & Finishing",
      tagline: "Kinetic pacing, psychological rhythm, and seamless sound design.",
      description:
        "Offline narrative editing, dynamic commercial montages, conform, and master grade. Transforming raw rushes into emotionally compelling, tightly paced visual rhythm.",
      capabilities: [
        "Offline Narrative & Commercial Editing",
        "High-Energy Music Video Pacing",
        "DaVinci Resolve ACES Color Grading",
        "Bespoke Sound Design & Mix Sync",
        "VFX Cleanup & Motion Graphic Integration",
      ],
      deliverables: [
        "ProRes 4444 XQ Masters",
        "Social Multi-Format Aspect Cuts (9:16, 4:5, 1:1)",
        "DCP Cinema Projection Masters",
        "Archival Project Project Bundles",
      ],
    },
  ],
  packages: [
    {
      id: "editorial-campaign",
      tier: "TIER I",
      name: "Commercial Visual Campaign",
      description:
        "Complete bespoke end-to-end visual suite for product launches, brand anthems, or lookbook campaigns.",
      idealFor: "Luxury Brands, Fashion Houses & Emerging Tech",
      timeline: "3 to 4 Weeks",
      deliverables: [
        "1x Hero 60s Brand Film (4K HDR)",
        "3x Kinetic 15s Social Cutdowns",
        "15x High-Resolution Edited Editorial Stills",
        "Custom Color Grade (ACES Pipeline)",
        "Full Commercial Usage License",
      ],
      featured: true,
    },
    {
      id: "destination-cinema",
      tier: "TIER II",
      name: "Destination Cinematic Feature",
      description:
        "Comprehensive multi-day documentary & cinematic coverage for private commissions, weddings, and global events.",
      idealFor: "Luxury Destination Weddings & Private Events",
      timeline: "4 to 6 Weeks",
      deliverables: [
        "1x 15-20 Min Cinematic Feature Film",
        "1x 3-4 Min Teaser Highlight Reel",
        "Full Speeches & Ceremony Multi-Cam Edits",
        "Kodak 16mm Celluloid Footage Inclusion",
        "Bespoke Leather USB & Private 4K Stream",
      ],
    },
    {
      id: "post-finishing",
      tier: "TIER III",
      name: "Master Post-Production & Edit",
      description:
        "Dedicated offline edit, rhythm polish, color grade, and sound design for pre-shot raw footage.",
      idealFor: "Directors, Agencies & Production Companies",
      timeline: "1 to 2 Weeks",
      deliverables: [
        "Full Offline Narrative / Commercial Edit",
        "DaVinci Resolve Master Color Grade",
        "Audio Foley, Sound FX & Mix Pass",
        "Multiple Aspect Ratio Delivery (16:9, 9:16, 4:5)",
        "3 Comprehensive Revision Rounds",
      ],
    },
  ],
  clients: [
    { name: "Atelier Vaucanson", category: "Haute Horlogerie" },
    { name: "Maison De L'Ombre", category: "High Fashion" },
    { name: "Veloce Motors", category: "Automotive" },
    { name: "Kéré Architecture", category: "Architecture" },
    { name: "Kavalier Records", category: "Music & Entertainment" },
    { name: "Maison Botanique", category: "Luxury Perfumery" },
    { name: "Apex Performance", category: "Athletic Lifestyle" },
    { name: "Vogue Scandinavia", category: "Editorial" },
  ],
  testimonials: [
    {
      id: "1",
      quote:
        "Rahul’s eye for lighting and camera movement elevated our watch campaign into pure cinema. The precision and mood in every single frame are unmatched.",
      author: "Henri Laurent",
      role: "Global Creative Director",
      company: "Atelier Vaucanson",
      location: "Geneva",
      project: "Kairos Chronograph Film",
    },
    {
      id: "2",
      quote:
        "Working with Rahul felt effortless. He brought a deep architectural understanding of light and stillness to our collection that exceeded all editorial expectations.",
      author: "Elena Rostova",
      role: "Editor-in-Chief",
      company: "L'Ombre Magazine",
      location: "Milan",
      project: "Solitude & Form Editorial",
    },
    {
      id: "3",
      quote:
        "In the editing suite, Rahul is a rhythm virtuoso. He unlocked dynamics in our performance rushes that turned a standard music video into an award-winning visual masterpiece.",
      author: "Zack Vance",
      role: "Music Video Director",
      company: "Kavalier Records",
      location: "London / Berlin",
      project: "Neon Noir Director's Cut",
    },
  ],
  gearKit: [
    {
      category: "Cinematography & Cameras",
      items: [
        {
          name: "ARRI Alexa Mini LF",
          specs: "Large Format 4.5K Open Gate, ARRIRAW & ProRes",
          role: "Principal Cinema Camera",
        },
        {
          name: "Sony FX9 Full-Frame",
          specs: "6K Full Frame Sensor, Dual Base ISO, Fast Autofocus",
          role: "Documentary & B-Camera",
        },
        {
          name: "Arriflex 16SR3",
          specs: "Super 16mm Film Camera, PL Mount, Crystal Sync",
          role: "Celluloid Analog Production",
        },
        {
          name: "Hasselblad H6D-100c",
          specs: "100-Megapixel Medium Format Sensor, 16-Bit Color",
          role: "High-End Editorial Stills",
        },
      ],
    },
    {
      category: "Optics & Glass",
      items: [
        {
          name: "Atlas Orion Anamorphic Set",
          specs: "32mm, 50mm, 80mm T2.0 2X Squeeze",
          role: "Cinematic Oval Bokeh & Flares",
        },
        {
          name: "Laowa 24mm T14 2X Periprobe",
          specs: "90° & Direct Probe, 2:1 Macro, Built-in LED Ring",
          role: "Micro Product & Horology",
        },
        {
          name: "Leica Summicron-C Primes",
          specs: "18mm, 25mm, 35mm, 50mm, 75mm, 100mm T2.0",
          role: "Clean Organic Skin Tones",
        },
        {
          name: "Canon TS-E Tilt-Shift Set",
          specs: "17mm f/4L & 24mm f/3.5L II",
          role: "Architectural Perspective Control",
        },
      ],
    },
    {
      category: "Lighting & Grip",
      items: [
        {
          name: "Aputure Electro Storm & 600c Pro",
          specs: "High-output RGBWW & Spotlights with Fresnels",
          role: "Atmospheric & Key Lighting",
        },
        {
          name: "Broncolor Para 222 FB & Siros 800L",
          specs: "Giant Parabolic Reflector & Studio Battery Strobes",
          role: "High-Fashion Sculpting",
        },
        {
          name: "DJI Ronin 2 3-Axis Gimbal & Ready Rig",
          specs: "Payload up to 30 lbs with Pro Arm Support",
          role: "Fluid Cinema Motion",
        },
        {
          name: "Astera Titan Tube Set (8x)",
          specs: "Wireless DMX Pixel Tubes, Ultra-High CRI 96+",
          role: "Practical Ambient Accents",
        },
      ],
    },
    {
      category: "Post-Production & Grading",
      items: [
        {
          name: "Apple Mac Studio M2 Ultra",
          specs: "24-Core CPU, 76-Core GPU, 128GB Unified Memory",
          role: "Real-time 8K RAW Processing",
        },
        {
          name: "Sony BVM-HX310 4K HDR Monitor",
          specs: "31-inch True Dual-Layer LCD, 1,000,000:1 Contrast",
          role: "Reference Grade Critical Monitoring",
        },
        {
          name: "DaVinci Resolve Mini Panel",
          specs: "Hardware Precision Color Grading Surface",
          role: "Tactile ACES Color Timing",
        },
        {
          name: "Genelec 8040B Smart Active Monitors",
          specs: "SAM Precision Studio Monitors with GLM Calibration",
          role: "Critical Audio Foley & Mixing",
        },
      ],
    },
  ],
  socials: [
    {
      platform: "Instagram",
      label: "@rahulsingh.cinema",
      href: "https://instagram.com",
      handle: "@rahulsingh.cinema",
    },
    {
      platform: "Vimeo",
      label: "vimeo.com/rahulsingh",
      href: "https://vimeo.com",
      handle: "rahulsingh",
    },
    {
      platform: "YouTube",
      label: "Rahul Singh Cinema",
      href: "https://youtube.com",
      handle: "@rahulsinghfilm",
    },
    {
      platform: "Behance",
      label: "behance.net/rahulsingh",
      href: "https://behance.net",
      handle: "rahulsingh",
    },
  ],
  contact: {
    email: "contact@rahulsingh.studio",
    phone: "+91 98200 12345",
    location: "Studio 4B, Film City Enclave, Mumbai, India",
    timezone: "IST (UTC+5:30) / Global Mobility",
  },
};
