export type ProjectCategory = "photography" | "film" | "edit";

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectVideo {
  mp4?: string;
  vimeoId?: string;
  poster?: string;
  aspectRatio?: string;
  duration?: string;
}

export interface BeforeAfterGrade {
  raw: string;
  graded: string;
  labelRaw?: string;
  labelGraded?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number | string;
  category: ProjectCategory;
  tags: string[];
  roles: string[];
  thumb: string;
  cover: string;
  aspectClass?: string;
  spanClass?: string;
  video?: ProjectVideo;
  beforeAfter?: BeforeAfterGrade;
  gallery: string[];
  brief: string;
  approach: string;
  result: string;
  gear: string[];
  credits: ProjectCredit[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "kairos-chronograph",
    title: "Kairos Chronograph",
    client: "Atelier Vaucanson",
    year: "2024",
    category: "film",
    tags: ["Cinematography", "Commercial", "Color Grading", "Macro"],
    roles: ["Director of Photography", "Lead Colorist"],
    thumb: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[16/9]",
    spanClass: "md:col-span-2 md:row-span-1",
    video: {
      mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop",
      aspectRatio: "16:9",
      duration: "02:14",
    },
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Capture the intricate mechanical heartbeat of a limited-production titanium chronograph, marrying industrial precision with poetic chiaroscuro lighting.",
    approach:
      "Captured on ARRI Alexa Mini LF with custom probe macro lenses and vintage anamorphic primes. Employed precision robotic motion control to achieve seamless, fluid optical passes over micro-escapements and hand-beveled tourbillon bridges.",
    result:
      "Premiered during Geneva Watch Week, driving a 340% increase in pre-orders and winning Best Brand Visual at the Paris Craft Festival.",
    gear: [
      "ARRI Alexa Mini LF (Open Gate 4.5K)",
      "Laowa 24mm T14 2X Periprobe Lens",
      "Cooke Anamorphic/i Full Frame Plus",
      "Motorized Motion Control Slider",
      "Aputure 600c Pro RGB with Fresnels",
    ],
    credits: [
      { role: "Director", name: "Marc Dupond" },
      { role: "Cinematographer", name: "Rahul Singh" },
      { role: "Gaffer", name: "Søren Lind" },
      { role: "Sound Design", name: "Echoic Audio" },
    ],
    featured: true,
  },
  {
    slug: "solitude-and-form",
    title: "Solitude & Form",
    client: "Maison De L'Ombre",
    year: "2024",
    category: "photography",
    tags: ["Editorial", "Medium Format", "Studio", "Fashion"],
    roles: ["Creative Director", "Lead Photographer"],
    thumb: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[4/5]",
    spanClass: "md:col-span-1 md:row-span-2",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "A high-fashion editorial exploration examining brutalist silhouettes and stark monochromatic draping against volcanic slate rock.",
    approach:
      "Shot exclusively on Hasselblad H6D-100c digital back with Broncolor parabolic reflectors. Kept retouching purely analog-emulative to preserve tactile linen weaves and micro skin textures.",
    result:
      "Featured across 14 pages in L'Officiel Hommes Autumn Issue and exhibited at Spazio Maiocchi during Milan Design Week.",
    gear: [
      "Hasselblad H6D-100c Medium Format",
      "HC 100mm f/2.2 & HC 35-90mm Zoom",
      "Broncolor Para 222 FB & Siros 800L",
      "Phase One Capture One 23 Pro Studio",
    ],
    credits: [
      { role: "Photographer", name: "Rahul Singh" },
      { role: "Stylist", name: "Elena Rostova" },
      { role: "Hair & Makeup", name: "Kaito Tanaka" },
      { role: "Set Design", name: "Studio Obscura" },
    ],
    featured: true,
  },
  {
    slug: "neon-noir-director-cut",
    title: "Neon Noir (Director's Cut)",
    client: "Kavalier Records",
    year: "2024",
    category: "edit",
    tags: ["Music Video", "Rhythm Editing", "VFX Conform", "Sound Sync"],
    roles: ["Post-Production Supervisor", "Lead Offline Editor"],
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[16/10]",
    spanClass: "md:col-span-1 md:row-span-1",
    video: {
      mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1920&auto=format&fit=crop",
      aspectRatio: "2.39:1",
      duration: "03:45",
    },
    beforeAfter: {
      raw: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop&sat=-100&con=-20",
      graded: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
      labelRaw: "REDCODE RAW (LOG3G10 / FLAT)",
      labelGraded: "ACES 1.3 REC.709 MASTER GRADE",
    },
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Craft a relentless 4-minute hyper-stylized narrative edit syncing complex multi-cam performance with visceral pacing and optical jump cuts.",
    approach:
      "Conformed over 18 hours of multi-cam RED Monstro 8K footage in DaVinci Resolve Studio. Designed custom optical transition ramps, rhythmic flash frames, and audio-reactive glitch cues.",
    result:
      "Surpassed 8.2M views within 3 weeks of release; nominated for Best Editing at the UK Music Video Awards 2024.",
    gear: [
      "Apple Mac Studio M2 Ultra (128GB)",
      "DaVinci Resolve Studio 19",
      "Avid Pro Tools Ultimate Audio Sync",
      "Sony BVM-HX310 4K Master Monitor",
    ],
    credits: [
      { role: "Editor", name: "Rahul Singh" },
      { role: "Director", name: "Zack Vance" },
      { role: "VFX Supervisor", name: "Artemis FX" },
      { role: "Colorist", name: "Damian Gray" },
    ],
    featured: true,
  },
  {
    slug: "aurelia-and-cassian",
    title: "Aurelia & Cassian (Villa Balbiano)",
    client: "Private Commission",
    year: "2023",
    category: "film",
    tags: ["Cinematic Wedding", "Lake Como", "16mm Film", "Super 8"],
    roles: ["Director", "Principal Cinematographer"],
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[16/10]",
    spanClass: "md:col-span-1 md:row-span-1",
    video: {
      mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop",
      aspectRatio: "16:9",
      duration: "04:18",
    },
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Document a three-day celebration on Lake Como through an intimate, poetic cinematic lens combining 35mm digital cinema with authentic Kodak 16mm celluloid.",
    approach:
      "Captured dawn boat arrivals, courtyard twilight vows, and candlelit gala banquets using natural tungsten sources and anamorphic oval bokeh.",
    result:
      "Delivered a bespoke 18-minute featurette and 3-minute highlight film in 4K HDR master, praised as the benchmark in luxury destination cinema.",
    gear: [
      "Sony FX9 Full Frame 6K",
      "Arriflex 16SR3 (Kodak 500T 7219 / 250D)",
      "Atlas Orion 2X Anamorphic Primes",
      "DJI Ronin 2 3-Axis Gimbal System",
    ],
    credits: [
      { role: "Lead Cinematographer", name: "Rahul Singh" },
      { role: "2nd Camera Operator", name: "Matteo Bianchi" },
      { role: "Film Lab", name: "Cinelab London" },
      { role: "Colorist", name: "Rahul Singh" },
    ],
  },
  {
    slug: "veloce-hypercar-launch",
    title: "Veloce Electric GT Launch",
    client: "Veloce Motors",
    year: "2024",
    category: "film",
    tags: ["Automotive", "High Speed", "Tracking Car", "VFX"],
    roles: ["Camera Operator", "Ronin Crane Tech"],
    thumb: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[21/9]",
    spanClass: "md:col-span-2 md:row-span-1",
    video: {
      mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      poster: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop",
      aspectRatio: "2.35:1",
      duration: "01:15",
    },
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Capture the prototype hypercar slicing through Alpine mountain passes at sunrise, highlighting aerodynamic carbon lines and instant electric acceleration.",
    approach:
      "Deployed a Porsche Cayenne Chase Vehicle fitted with a Motocrane Ultra and stabilized RED V-Raptor 8K VV. High-speed 120fps passes at 140 km/h.",
    result:
      "Global press reveal trailer generated over 4.5M impressions across YouTube and social channels within 48 hours.",
    gear: [
      "RED V-Raptor 8K VV",
      "Angénieux Optimo Ultra 12X Zoom",
      "MotoCrane Ultra Roof Arm",
      "DJI Master Wheels",
    ],
    credits: [
      { role: "Director", name: "Lucas Vance" },
      { role: "Pursuit Crane Tech", name: "Rahul Singh" },
      { role: "Precision Driver", name: "Stefan Keller" },
    ],
  },
  {
    slug: "distilled-essence",
    title: "Distilled Essence: N° 09",
    client: "Maison Botanique",
    year: "2024",
    category: "photography",
    tags: ["Product", "Still Life", "High-End Retouching", "Luxury"],
    roles: ["Lighting Designer", "Photographer"],
    thumb: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[4/5]",
    spanClass: "md:col-span-1 md:row-span-1",
    gallery: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Develop a distinctive optical visual identity for an ultra-luxury niche fragrance inspired by amber resin, vetiver, and smoky cedarwood.",
    approach:
      "Sculpted precise caustic reflections through hand-blown glass flacons utilizing optical snoots and subtle water ripple trays, yielding natural warm chromatic refractions.",
    result:
      "Featured across luxury department store windows in Harrods London and Le Bon Marché Paris.",
    gear: [
      "Fujifilm GFX 100 II Medium Format",
      "GF 120mm f/4 Macro R LM OIS WR",
      "Profoto Pro-11 2400 AirTTL Packs",
      "Dedolight DP400 Imager Projection",
    ],
    credits: [
      { role: "Photographer & Lighting", name: "Rahul Singh" },
      { role: "Prop Stylist", name: "Camille Laurent" },
      { role: "Master Retoucher", name: "Studio Lumen" },
    ],
  },
  {
    slug: "echoes-of-reykjavik",
    title: "Echoes of Reykjavík",
    client: "Nordic Arts Council",
    year: "2023",
    category: "film",
    tags: ["Documentary", "Landscape", "Atmospheric", "Natural Light"],
    roles: ["Solo Filmmaker", "Sound Recordist", "Colorist"],
    thumb: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[16/9]",
    spanClass: "md:col-span-1 md:row-span-1",
    video: {
      mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      poster: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1920&auto=format&fit=crop",
      aspectRatio: "16:9",
      duration: "05:12",
    },
    gallery: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "A meditative 12-minute observational documentary capturing the sensory solitude of winter in southern Iceland and volcanic black sand deserts.",
    approach:
      "Operated in sub-zero blizzards with weather-sealed cinema rigs. Recorded high-fidelity ambisonic hydrophone sounds under glacial lagoons.",
    result:
      "Official selection at Reykjavik International Film Festival and Nordic Panorama 2024.",
    gear: [
      "Canon Cinema EOS C300 Mark III",
      "Canon CN-E Cinema Primes (24mm, 50mm, 85mm)",
      "Sound Devices MixPre-6 II Recorder",
      "Sennheiser MKH 416 & Ambient Hydrophones",
    ],
    credits: [
      { role: "Director & Cinematography", name: "Rahul Singh" },
      { role: "Original Score", name: "Ólafur Arnalds Ensemble" },
      { role: "Sound Mixer", name: "Rahul Singh" },
    ],
  },
  {
    slug: "monolith-architecture",
    title: "Monolith: Concrete & Shadows",
    client: "Kéré & Partners Architects",
    year: "2024",
    category: "photography",
    tags: ["Architecture", "Brutalism", "Geometry", "Monochrome"],
    roles: ["Lead Architectural Photographer"],
    thumb: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[4/5]",
    spanClass: "md:col-span-1 md:row-span-2",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Document the raw materiality, thermal mass, and shifting daylight geometry of an off-grid concrete cultural pavilion.",
    approach:
      "Mapped sun azimuth angles over a 5-day residency. Utilized 24mm and 17mm tilt-shift lenses to guarantee zero perspective convergence and edge-to-edge optical resolution.",
    result:
      "Featured in ArchDaily Building of the Year monograph and Dezeen Architecture Awards 2024.",
    gear: [
      "Sony A7R V (61MP Full Frame)",
      "Canon TS-E 17mm f/4L & TS-E 24mm f/3.5L II (via Metabones)",
      "Gitzo Systematic Carbon Fiber Tripod with Arca Swiss D4 Geared Head",
    ],
    credits: [
      { role: "Photographer", name: "Rahul Singh" },
      { role: "Architect", name: "Francis Kéré" },
    ],
  },
  {
    slug: "apex-kinetic-anthem",
    title: "Apex: Kinetic Anthem",
    client: "Apex Performance Wear",
    year: "2024",
    category: "edit",
    tags: ["Commercial Edit", "Kinetic Pacing", "Sound Design", "Split-Screen"],
    roles: ["Creative Editor", "Finishing Artist"],
    thumb: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
    aspectClass: "aspect-[16/9]",
    spanClass: "md:col-span-2 md:row-span-1",
    video: {
      mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
      aspectRatio: "16:9",
      duration: "01:00",
    },
    beforeAfter: {
      raw: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop&sat=-100&con=-30",
      graded: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      labelRaw: "SONY S-LOG3 / S-GAMUT3.CINE",
      labelGraded: "FILM PRINT EMULATION (KODAK 2383)",
    },
    gallery: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop",
    ],
    brief:
      "Edit a high-octane 60-second broadcast commercial merging athletic training footage from Tokyo, Berlin, and New York with modular typographic motion.",
    approach:
      "Constructed a multi-layered, match-cut heavy montage driven by heart-rate rhythmic spikes and industrial percussion. Custom split-screen frames and frame-rate shifts.",
    result:
      "Broadcasted internationally across ESPN and Sky Sports during Olympic qualifiers.",
    gear: [
      "Premiere Pro 2024 & DaVinci Resolve",
      "Elgato Stream Deck XL custom editing surface",
      "Genelec 8040B Studio Monitors",
    ],
    credits: [
      { role: "Editor", name: "Rahul Singh" },
      { role: "Agency", name: "Ogilvy & Mather" },
      { role: "Sound Design", name: "740 Sound" },
    ],
  },
];
