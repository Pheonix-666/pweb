"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
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
    <section id="contact" className="py-16 sm:py-24 md:py-36 border-b border-hairline bg-background select-none relative overflow-hidden">
      {/* Subtle liquid backdrop glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C89B53]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-hairline relative">
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <div className="font-mono text-xs text-[#C89B53] tracking-widest uppercase flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#C89B53] inline-block" />
              INITIATE PRODUCTION COMMISSION
            </div>
            <h2 className="font-serif heading-display-xl text-primary text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Let&apos;s make something <span className="italic text-[#C89B53] font-light">worth watching.</span>
            </h2>
          </div>

          {/* Direct quick action */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 liquid-glass hover:border-[#C89B53] text-xs font-sans uppercase tracking-wider text-white transition-colors rounded-sm"
            >
              <span>Quick Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C89B53]" />
            </a>
          </div>
        </div>

        {/* 2-Column Grid: Form & Studio Direct Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 mt-10 sm:mt-16">
          {/* Left: Booking Form with Liquid Glass */}
          <div className="lg:col-span-7 liquid-glass-card p-5 sm:p-8 md:p-12 relative rounded-sm shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 sm:py-16 text-center space-y-4 sm:space-y-6"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C89B53]/15 border border-[#C89B53] flex items-center justify-center mx-auto text-[#C89B53] shadow-[0_0_20px_rgba(200,155,83,0.3)]">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
                  Inquiry Successfully Conformed
                </h3>
                <p className="font-sans text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
                  Your production parameters have been logged into our master dispatch queue. We will review your brief and return with a technical treatment within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 sm:px-8 py-3 liquid-glass hover:border-[#C89B53] text-xs font-mono uppercase tracking-widest text-primary transition-colors rounded-sm"
                >
                  Transmit Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  {...register("honeypot")}
                />

                {submitError && (
                  <div className="p-3.5 sm:p-4 bg-rec/10 border border-rec/40 text-rec font-mono text-xs flex items-center gap-2.5 rounded-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                      Your Name / Brand *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Atelier Vaucanson"
                      {...register("name")}
                      className={`w-full liquid-glass-input px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans rounded-sm ${
                        errors.name ? "!border-rec" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] sm:text-[11px] font-mono text-rec">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="producer@agency.com"
                      {...register("email")}
                      className={`w-full liquid-glass-input px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans rounded-sm ${
                        errors.email ? "!border-rec" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] sm:text-[11px] font-mono text-rec">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345 / +1 (555) 019-2834"
                    {...register("phone")}
                    className={`w-full liquid-glass-input px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans rounded-sm ${
                      errors.phone ? "!border-rec" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] sm:text-[11px] font-mono text-rec">{errors.phone.message}</p>
                  )}
                </div>

                {/* Service Selection Buttons */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                    Primary Service *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "film", label: "Film / DP" },
                      { id: "photography", label: "Stills / Photo" },
                      { id: "edit", label: "Edit & Color" },
                      { id: "full-package", label: "Full Suite" },
                    ].map((srv) => (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() =>
                          setValue("service", srv.id as "photography" | "film" | "edit" | "full-package")
                        }
                        className={`py-2 sm:py-2.5 px-3 border text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-sm ${
                          selectedService === srv.id
                            ? "bg-[#C89B53] text-black border-[#C89B53] font-bold shadow-[0_0_14px_rgba(200,155,83,0.35)]"
                            : "liquid-glass text-muted hover:text-primary hover:border-white/30"
                        }`}
                      >
                        {srv.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Type & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                      Project Format *
                    </label>
                    <select
                      {...register("projectType")}
                      className="w-full liquid-glass-input px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-primary focus:outline-none font-sans rounded-sm"
                    >
                      <option value="Brand Commercial" className="bg-[#121216] text-white">Brand Commercial / Anthem</option>
                      <option value="Fashion Editorial" className="bg-[#121216] text-white">Fashion / Stills Campaign</option>
                      <option value="Music Video" className="bg-[#121216] text-white">Music Video / Performance</option>
                      <option value="Destination Cinema" className="bg-[#121216] text-white">Destination Cinema / Wedding</option>
                      <option value="Narrative Feature" className="bg-[#121216] text-white">Narrative Short / Feature</option>
                      <option value="Color Post-Finishing" className="bg-[#121216] text-white">Color Grading / Finishing</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                      Estimated Budget *
                    </label>
                    <select
                      {...register("budgetRange")}
                      className="w-full liquid-glass-input px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-primary focus:outline-none font-sans rounded-sm"
                    >
                      <option value="$5k – $10k" className="bg-[#121216] text-white">$5k – $10k (Post / Small Stills)</option>
                      <option value="$10k – $25k" className="bg-[#121216] text-white">$10k – $25k (Commercial Hero)</option>
                      <option value="$25k – $50k" className="bg-[#121216] text-white">$25k – $50k (Multi-Day Production)</option>
                      <option value="$50k+" className="bg-[#121216] text-white">$50k+ (Global Campaign / Feature)</option>
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                    Estimated Production Timeline *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Q3 2026 / Next month / Specific shoot date"
                    {...register("preferredDate")}
                    className={`w-full liquid-glass-input px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans rounded-sm ${
                      errors.preferredDate ? "!border-rec" : ""
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-[10px] sm:text-[11px] font-mono text-rec">{errors.preferredDate.message}</p>
                  )}
                </div>

                {/* Brief Message */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted">
                    Creative Brief & Vision *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide notes on tone, visual style, deliverables, or treatment references..."
                    {...register("message")}
                    className={`w-full liquid-glass-input p-3.5 sm:p-4 text-sm text-primary placeholder:text-muted/40 focus:outline-none font-sans resize-none rounded-sm ${
                      errors.message ? "!border-rec" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] sm:text-[11px] font-mono text-rec">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="hover"
                  className="w-full py-3.5 sm:py-4 bg-[#C89B53] hover:bg-[#d8ab63] text-[#0A0A0C] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 rounded-sm shadow-[0_0_24px_rgba(200,155,83,0.3)]"
                >
                  {isSubmitting ? (
                    <span>CONFORMING & TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>Transmit Production Inquiry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Studio Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="liquid-glass-card p-6 sm:p-8 space-y-6 rounded-sm">
              <div className="font-mono text-xs text-[#C89B53] tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                {"// STUDIO DIRECTORY"}
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 liquid-glass text-[#C89B53] rounded-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted uppercase">DIRECT DISPATCH</div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-mono text-xs sm:text-sm text-primary hover:text-[#C89B53] transition-colors font-medium break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 liquid-glass text-[#C89B53] rounded-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted uppercase">PHONE & WHATSAPP</div>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-mono text-xs sm:text-sm text-primary hover:text-[#C89B53] transition-colors font-medium"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 liquid-glass text-[#C89B53] rounded-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted uppercase">LOCATION / BASE</div>
                    <div className="font-mono text-xs sm:text-sm text-primary">
                      {siteConfig.contact.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 liquid-glass text-[#C89B53] rounded-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted uppercase">TIMEZONE & MOBILITY</div>
                    <div className="font-mono text-xs sm:text-sm text-primary">
                      {siteConfig.contact.timezone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Contact with Liquid Glass */}
            <div className="liquid-glass-card p-6 sm:p-8 space-y-4 rounded-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-[#30A46C]">
                <span className="w-2 h-2 rounded-full bg-[#30A46C] animate-pulse shadow-[0_0_8px_#30A46C]" />
                <span className="uppercase tracking-widest font-semibold">DIRECT LINE AVAILABLE</span>
              </div>
              <p className="text-xs text-muted font-light leading-relaxed">
                For urgent commercial shoot dates or active production queries, contact directly via WhatsApp for swift coordination.
              </p>
              <a
                href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="w-full py-3 liquid-glass hover:border-[#C89B53] text-xs font-mono uppercase tracking-widest text-primary flex items-center justify-center gap-2 transition-all duration-300 rounded-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C89B53]" />
                <span>Open Direct WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
