# STUDIO Rahul Singh — Cinematic Portfolio & Creative Agency

An ultra-luxury, dark-themed portfolio website for **Rahul Singh** (Cinematographer, Photographer & Film Editor), engineered with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

---

## 📽️ Tech Stack & Key Libraries

- **Framework**: Next.js 14+ (App Router, Static Site Generation / SSG)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Custom Dark Palette, Hairlines, Clamped Typography)
- **Smooth Scrolling**: Lenis 1.1 Smooth Scroll Provider
- **Animations & Parallax**: Framer Motion 11
- **Forms & Validation**: React Hook Form + Zod
- **Email Transmission**: Resend API
- **Icons**: Lucide React
- **Typography**: `Instrument Serif` (Italic Accent Emphasis), `Inter Tight` (UI/Body), and `JetBrains Mono` (Timecodes & Telemetry)

---

## ⚡ Quick Start & Development

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the project root:
```env
# Resend API Key for contact form transmissions
RESEND_API_KEY=re_your_resend_api_key_here

# Recipient email for production inquiries
CONTACT_EMAIL=contact@rahulsingh.studio
```
*(Note: If `RESEND_API_KEY` is not provided, the contact API runs in mock mode and logs formatted inquiries directly to the console).*

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🗂️ Adding a New Project to the Portfolio

All portfolio projects are typed and centrally configured in [`data/projects.ts`](file:///d:/Project/webdev/Rahulportfolio/data/projects.ts).

To add a new project, add an entry to the `projects` array:

```typescript
{
  slug: "your-project-slug",
  title: "Project Title",
  client: "Client Name",
  year: "2025",
  category: "film", // "photography" | "film" | "edit"
  tags: ["Cinematography", "Commercial", "Anamorphic"],
  roles: ["Director of Photography", "Colorist"],
  thumb: "https://images.unsplash.com/photo-...",
  cover: "https://images.unsplash.com/photo-...",
  aspectClass: "aspect-[16/9]", // "aspect-[4/5]" | "aspect-[16/10]" | "aspect-[21/9]"
  spanClass: "md:col-span-2 md:row-span-1", // Grid layout span
  video: {
    mp4: "https://.../video.mp4",
    poster: "https://.../poster.jpg",
    aspectRatio: "16:9",
    duration: "02:30",
  },
  // Optional for edit projects:
  beforeAfter: {
    raw: "https://.../flat_log.jpg",
    graded: "https://.../aces_graded.jpg",
    labelRaw: "16-BIT REDCODE RAW (LOG3G10)",
    labelGraded: "ACES 1.3 REC.709 MASTER",
  },
  gallery: [
    "https://.../still1.jpg",
    "https://.../still2.jpg",
  ],
  brief: "Your creative brief description...",
  approach: "Technical approach, optics, camera rigs...",
  result: "Campaign performance, laurels, festivals...",
  gear: [
    "ARRI Alexa Mini LF",
    "Atlas Orion 2X Anamorphic",
  ],
  credits: [
    { role: "Director", name: "Director Name" },
    { role: "Cinematographer", name: "Rahul Singh" },
  ],
  featured: true,
}
```

Next.js will automatically generate static routes for `/work/[slug]` during build time via `generateStaticParams()`.

---

## 🚀 Vercel Deployment

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `RESEND_API_KEY`: your Resend API Key
   - `CONTACT_EMAIL`: your target notification email
4. Click **Deploy**. Vercel will automatically build and deploy the application globally on the Edge Network.

---

## 📐 Design System Tokens

- **Background**: `#0A0A0A`
- **Surface**: `#111113`
- **Elevated**: `#17171A`
- **Border**: `rgba(255, 255, 255, 0.08)` (1px Hairline)
- **Primary Text**: `#F2F0EB`
- **Muted Text**: `#8A8A90`
- **Accent Tungsten Amber**: `#E8A33D`
- **REC Indicator Red**: `#E5484D`
- **Status Green**: `#30A46C`
- **Border Radius**: Sharp max 2px
