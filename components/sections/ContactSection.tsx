"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/data/site";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone or WhatsApp number"),
  service: z.enum(["photography", "film", "edit", "full-package"], {
    errorMap: () => ({ message: "Please select a production service" }),
  }),
  projectType: z.string().min(2, "Please select a project type"),
  budgetRange: z.string().min(1, "Please specify a budget range"),
  preferredDate: z.string().min(1, "Please specify an estimated timeline"),
  referenceLinks: z.string().optional(),
  message: z.string().min(10, "Please provide brief details (min 10 characters)"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: "film",
      projectType: "Brand Commercial",
      budgetRange: "$10k – $25k",
      honeypot: "",
    },
  });

  const selectedService = watch("service");

  // Catch package selection events from ProofSection
  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      if (customEvent.detail?.category) {
        const cat = customEvent.detail.category;
        const mappedService: "photography" | "film" | "edit" | "full-package" =
          cat === "photography"
            ? "photography"
            : cat === "edit"
            ? "edit"
            : "film";
        setValue("service", mappedService);
      }
    };

    window.addEventListener("select-package", handlePackageSelect);
    return () => window.removeEventListener("select-package", handlePackageSelect);
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to transmit inquiry.");
      }

      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Failed to transmit inquiry. Please contact directly via email.");
      }
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 border-b border-hairline bg-background select-none relative">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Section Header with Rotating Circular Text Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-hairline relative">
          <div className="space-y-4 max-w-3xl">
            <div className="font-mono text-xs text-tungsten tracking-widest uppercase flex items-center gap-2">
              <span className="w-6 h-[1px] bg-tungsten inline-block" />
              INITIATE PRODUCTION COMMISSION
            </div>
            <h2 className="font-serif heading-display-xl text-primary text-balance">
              Let&apos;s make something <span className="italic text-tungsten font-light">worth watching.</span>
            </h2>
          </div>

          {/* Rotating Circular Text Badge */}
          <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-tungsten font-mono text-[9px] uppercase tracking-[0.22em]">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text>
                  <textPath href="#circlePath">
                    • STUDIO Rahul Singh • INITIATE COMMISSION 
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <div className="w-10 h-10 rounded-full border border-hairline bg-surface flex items-center justify-center text-primary">
              <ArrowUpRight className="w-4 h-4 text-tungsten" />
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Form & Studio Direct Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 mt-16">
          {/* Left: React-Hook-Form + Zod Booking Form */}
          <div className="lg:col-span-7 border border-hairline bg-surface p-7 md:p-12 relative shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-tungsten/10 border border-tungsten flex items-center justify-center mx-auto text-tungsten">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-primary">
                  Inquiry Successfully Conformed
                </h3>
                <p className="font-sans text-xs md:text-sm text-muted max-w-md mx-auto leading-relaxed">
                  Your production parameters have been logged into our master dispatch queue. We will review your brief and return with a technical treatment within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-elevated border border-hairline hover:border-tungsten text-xs font-mono uppercase tracking-widest text-primary transition-colors"
                >
                  Transmit Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot Spam Trap (Hidden) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  {...register("honeypot")}
                />

                {/* Error Banner */}
                {submitError && (
                  <div className="p-4 bg-rec/10 border border-rec/40 text-rec font-mono text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Your Name / Brand *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marc Jacobs / Horizon"
                      {...register("name")}
                      className={`w-full bg-elevated border px-4 py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans transition-colors ${
                        errors.name ? "border-rec focus:border-rec" : "border-hairline focus:border-tungsten"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-rec">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="producer@agency.com"
                      {...register("email")}
                      className={`w-full bg-elevated border px-4 py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans transition-colors ${
                        errors.email ? "border-rec focus:border-rec" : "border-hairline focus:border-tungsten"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-rec">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834 / +91 98200 12345"
                    {...register("phone")}
                    className={`w-full bg-elevated border px-4 py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans transition-colors ${
                      errors.phone ? "border-rec focus:border-rec" : "border-hairline focus:border-tungsten"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-mono text-rec">{errors.phone.message}</p>
                  )}
                </div>

                {/* Service Selection Buttons */}
                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    Primary Service *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "photography", label: "Photography" },
                      { id: "film", label: "Film Production" },
                      { id: "edit", label: "Editing & Color" },
                      { id: "full-package", label: "Full Campaign" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setValue("service", item.id as any)}
                        className={`p-3 text-[11px] font-mono uppercase tracking-wider border text-center transition-all ${
                          selectedService === item.id
                            ? "bg-tungsten text-background border-tungsten font-semibold"
                            : "bg-elevated text-muted border-hairline hover:border-tungsten"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Type & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Project Type
                    </label>
                    <select
                      {...register("projectType")}
                      className="w-full bg-elevated border border-hairline px-4 py-3 text-sm text-primary focus:outline-none focus:border-tungsten font-sans transition-colors"
                    >
                      <option value="Brand Commercial">Brand Commercial / Anthem</option>
                      <option value="Luxury Wedding">Luxury Destination Wedding</option>
                      <option value="Music Video">Music Video Director Cut</option>
                      <option value="Editorial Fashion">Editorial Fashion Lookbook</option>
                      <option value="Documentary">Documentary / Narrative</option>
                      <option value="Social Content">Social Content Suite</option>
                      <option value="Other">Custom Production</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Estimated Budget Range
                    </label>
                    <select
                      {...register("budgetRange")}
                      className="w-full bg-elevated border border-hairline px-4 py-3 text-sm text-primary focus:outline-none focus:border-tungsten font-sans transition-colors"
                    >
                      <option value="< $10k">&lt; $10,000</option>
                      <option value="$10k – $25k">$10,000 – $25,000</option>
                      <option value="$25k – $50k">$25,000 – $50,000</option>
                      <option value="$50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Reference Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Preferred Timeline / Dates *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. October 2025 / Q4"
                      {...register("preferredDate")}
                      className={`w-full bg-elevated border px-4 py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans transition-colors ${
                        errors.preferredDate ? "border-rec focus:border-rec" : "border-hairline focus:border-tungsten"
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-[11px] font-mono text-rec">{errors.preferredDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                      Moodboard / Reference Links (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. vimeo.com/..., pinterest.com/..."
                      {...register("referenceLinks")}
                      className="w-full bg-elevated border border-hairline px-4 py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none focus:border-tungsten font-sans transition-colors"
                    />
                  </div>
                </div>

                {/* Creative Brief Message */}
                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    Creative Brief & Objectives *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your visual objectives, desired emotional tone, deliverables, and specific location requirements..."
                    {...register("message")}
                    className={`w-full bg-elevated border p-4 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans transition-colors resize-none ${
                      errors.message ? "border-rec focus:border-rec" : "border-hairline focus:border-tungsten"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-rec">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="hover"
                  className="w-full py-4 bg-primary hover:bg-tungsten text-background font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  <span>{isSubmitting ? "TRANSMITTING TO DISPATCH..." : "TRANSMIT COMMISSION INQUIRY"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Studio Info, WhatsApp, Status */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-hairline bg-surface p-7 md:p-8 space-y-6">
              <div className="font-mono text-xs text-tungsten tracking-widest uppercase">
                {"// DIRECT CHANNELS"}
              </div>

              <div className="space-y-4">
                {/* Email Direct */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  data-cursor="hover"
                  className="p-4 border border-hairline bg-elevated hover:border-tungsten transition-colors flex items-center gap-4 group"
                >
                  <Mail className="w-4 h-4 text-tungsten flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">Studio Dispatch Email</div>
                    <div className="text-sm font-mono text-primary group-hover:text-tungsten transition-colors truncate">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </a>

                {/* WhatsApp Click-To-Chat Button */}
                <a
                  href="https://wa.me/919820012345?text=Hello%20Rahul,%20I%20would%20like%20to%20inquire%20about%20a%20production%20commission."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="p-4 border border-hairline bg-elevated hover:border-status-green transition-colors flex items-center gap-4 group"
                >
                  <MessageSquare className="w-4 h-4 text-status-green flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">Instant WhatsApp Desk</div>
                    <div className="text-sm font-mono text-primary group-hover:text-status-green transition-colors">
                      +91 98200 12345 (Chat Live)
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="p-4 border border-hairline bg-elevated flex items-center gap-4">
                  <MapPin className="w-4 h-4 text-tungsten flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">Physical Studio Residency</div>
                    <div className="text-xs font-mono text-primary">
                      {siteConfig.contact.location}
                    </div>
                  </div>
                </div>

                {/* Timezone */}
                <div className="p-4 border border-hairline bg-elevated flex items-center gap-4">
                  <Clock className="w-4 h-4 text-tungsten flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">Operational Timezone</div>
                    <div className="text-xs font-mono text-primary">
                      {siteConfig.contact.timezone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Availability Status Card */}
            <div className="p-6 border border-hairline bg-surface space-y-3">
              <div className="flex items-center gap-2.5 font-mono text-xs text-primary">
                <span className="status-indicator" />
                <span className="font-semibold">{siteConfig.availability.label}</span>
              </div>
              <p className="text-xs text-muted font-light leading-relaxed">
                We accept a strictly limited number of commercial campaigns and luxury destination features per quarter to ensure uncompromised quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
