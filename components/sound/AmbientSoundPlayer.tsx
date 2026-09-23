"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientSoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const initAudio = () => {
    if (audioContextRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Deep cinematic warm drone layer (root 55Hz - A1 & 110Hz - A2)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low fundamental

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime); // Minor third warmth (E2)

      const osc3 = ctx.createOscillator();
      osc3.type = "triangle";
      osc3.frequency.setValueAtTime(110, ctx.currentTime); // Rich overtone

      // Drone filter to keep it silky and soft
      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(220, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.35, ctx.currentTime);

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      osc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(masterGain);

      osc1.start();
      osc2.start();
      osc3.start();
      oscillatorsRef.current = [osc1, osc2, osc3];

      // 2. Subtle vintage film projector / tape hiss generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Pink noise approximation
        output[i] = (Math.random() * 2 - 1) * 0.05;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  const toggleSound = () => {
    if (!audioContextRef.current) {
      initAudio();
    }

    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current;

    if (isPlaying) {
      // Fade out
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      setTimeout(() => {
        setIsPlaying(false);
      }, 600);
    } else {
      // Fade in
      setIsPlaying(true);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 1.2);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      data-cursor="hover"
      className={`relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-300 backdrop-blur-xl ${
        isPlaying
          ? "border-[#B8860B] bg-[#B8860B]/15 text-[#B8860B] shadow-[0_0_15px_rgba(184,134,11,0.25)]"
          : "border-white/10 bg-[#0A0A0C]/80 text-white/60 hover:text-white hover:border-white/30"
      }`}
      title={isPlaying ? "Mute Atmospheric Soundscape" : "Play Atmospheric Soundscape"}
      aria-label="Toggle cinematic soundscape"
    >
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#B8860B] animate-pulse" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-white/40" />
      )}

      {/* Animated Sound Wave Bars */}
      <div className="flex items-end gap-[2px] h-3">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={`w-[2px] rounded-full transition-all ${
              isPlaying
                ? "bg-[#B8860B] animate-[pulse_0.8s_ease-in-out_infinite]"
                : "bg-white/20 h-1"
            }`}
            style={
              isPlaying
                ? {
                    height: `${(bar % 3 + 1) * 3 + 2}px`,
                    animationDelay: `${bar * 0.15}s`,
                  }
                : undefined
            }
          />
        ))}
      </div>

      <span className="hidden sm:inline">
        {isPlaying ? "SOUND ON" : "AUDIO OFF"}
      </span>
    </button>
  );
}
