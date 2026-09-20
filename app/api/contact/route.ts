import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone or WhatsApp number"),
  service: z.enum(["photography", "film", "edit", "full-package"], {
    errorMap: () => ({ message: "Please select a production service" }),
  }),
  projectType: z.string().min(2, "Please select a project type"),
  budgetRange: z.string().min(1, "Please specify a budget range"),
  preferredDate: z.string().min(1, "Please specify an estimated date or timeline"),
  referenceLinks: z.string().optional(),
  message: z.string().min(10, "Please provide brief details (min 10 characters)"),
  honeypot: z.string().optional(),
});

// Simple in-memory rate limiter (IP -> array of timestamps)
const rateLimitMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown-ip";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5;

    const timestamps = (rateLimitMap.get(ip) || []).filter(
      (time) => now - time < windowMs
    );

    if (timestamps.length >= maxRequests) {
      return NextResponse.json(
        { error: "Too many commission requests. Please wait a minute." },
        { status: 429 }
      );
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    const body = await req.json();
    const parsedData = contactSchema.parse(body);

    // Spam honeypot detection
    if (parsedData.honeypot && parsedData.honeypot.trim() !== "") {
      // Silently accept bot submission
      return NextResponse.json({ success: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const recipientEmail = process.env.CONTACT_EMAIL || "contact@rahulverma.studio";

      await resend.emails.send({
        from: "Studio Inquiries <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: parsedData.email,
        subject: `[New Commission Inquiry] ${parsedData.name} — ${parsedData.service.toUpperCase()}`,
        html: `
          <div style="font-family: monospace; background: #0A0A0A; color: #F2F0EB; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #E8A33D; text-transform: uppercase;">New Commission Inquiry</h2>
            <hr style="border-color: rgba(255,255,255,0.1);" />
            <p><strong>Client:</strong> ${parsedData.name}</p>
            <p><strong>Email:</strong> ${parsedData.email}</p>
            <p><strong>Phone / WhatsApp:</strong> ${parsedData.phone}</p>
            <p><strong>Service:</strong> ${parsedData.service}</p>
            <p><strong>Project Type:</strong> ${parsedData.projectType}</p>
            <p><strong>Budget Range:</strong> ${parsedData.budgetRange}</p>
            <p><strong>Estimated Timeline:</strong> ${parsedData.preferredDate}</p>
            <p><strong>Reference Links:</strong> ${parsedData.referenceLinks || "None provided"}</p>
            <hr style="border-color: rgba(255,255,255,0.1);" />
            <p><strong>Creative Brief:</strong></p>
            <p style="white-space: pre-wrap; background: #111113; padding: 16px; border: 1px solid rgba(255,255,255,0.08);">${parsedData.message}</p>
          </div>
        `,
      });
    } else {
      console.log("[MOCK EMAIL TRANSMISSION - RESEND_API_KEY not set]:", parsedData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal transmission error. Please contact directly via email." },
      { status: 500 }
    );
  }
}
