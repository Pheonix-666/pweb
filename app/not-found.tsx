import React from "react";
import Link from "next/link";
import { ArrowLeft, Film, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6 md:p-12 text-primary font-mono select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs text-muted border-b border-hairline pb-4">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-tungsten" />
          <span className="text-primary font-bold">RAHUL VERMA STUDIO</span>
        </div>
        <div className="text-rec">ERROR: 404_MEDIA_NOT_FOUND</div>
      </div>

      {/* Central 404 Callout */}
      <div className="max-w-2xl mx-auto text-center space-y-6 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rec/10 border border-rec/40 text-rec text-xs">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>REEL TIMELINE OFFLINE</span>
        </div>

        <h1 className="font-serif text-6xl md:text-8xl text-primary font-normal">
          404 <span className="italic text-tungsten font-light">Missing.</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-muted max-w-md mx-auto leading-relaxed">
          The sequence frame or reel requested does not exist on the current master timeline. Please return to the primary directory.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary hover:bg-tungsten text-background text-xs uppercase tracking-widest font-semibold transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Master Timeline</span>
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between text-[11px] text-muted border-t border-hairline pt-4">
        <span>TIMECODE: 00:00:00:00 [OFFLINE]</span>
        <span>ACES 1.3 / STANDBY</span>
      </div>
    </div>
  );
}
