"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { formatTimecode } from "@/lib/utils";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  aspectRatio?: string;
}

export default function CustomVideoPlayer({
  src,
  poster,
  title,
  aspectRatio = "16/9",
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / (video.duration || 1)) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleRateChange = () => {
    if (!videoRef.current) return;
    const rates = [1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 3000);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const f = Math.floor((sec % 1) * 24);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(m)}:${pad(s)}:${pad(f)}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full border border-hairline-light bg-black overflow-hidden group select-none shadow-2xl"
      style={{ aspectRatio: aspectRatio.replace(":", "/") }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Top HUD Banner */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent transition-opacity duration-300 flex items-center justify-between pointer-events-none z-20 ${
          controlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 font-mono text-xs text-primary">
          <span className="w-2 h-2 rounded-full bg-rec animate-pulse-rec" />
          <span className="font-medium tracking-widest uppercase">{title}</span>
        </div>
        <div className="font-mono text-[11px] text-tungsten tracking-widest uppercase">
          4K MASTER [24FPS]
        </div>
      </div>

      {/* Big Center Play Button when Paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full border border-tungsten/80 bg-background/80 backdrop-blur-md flex items-center justify-center text-tungsten hover:scale-110 transition-transform z-20 shadow-2xl"
          aria-label="Play video"
        >
          <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />
        </button>
      )}

      {/* Bottom HUD Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 space-y-3 z-20 ${
          controlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Timeline Scrubber */}
        <div
          onClick={handleSeek}
          className="relative w-full h-2.5 bg-white/20 hover:h-3.5 transition-all cursor-pointer flex items-center"
        >
          <div
            className="h-full bg-tungsten relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>

        {/* Lower Control Buttons Row */}
        <div className="flex items-center justify-between font-mono text-xs text-primary">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 border border-hairline bg-surface/80 hover:border-tungsten transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-tungsten" /> : <Play className="w-4 h-4 text-tungsten fill-current" />}
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={toggleMute}
              className="p-2 border border-hairline bg-surface/80 hover:border-tungsten transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rec" /> : <Volume2 className="w-4 h-4 text-primary" />}
            </button>

            {/* Timecode display */}
            <div className="font-mono text-xs tracking-wider text-muted hidden sm:block">
              <span className="text-primary">{formatSeconds(currentTime)}</span> / {formatSeconds(duration)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Playback speed selector */}
            <button
              onClick={handleRateChange}
              className="px-2.5 py-1.5 border border-hairline bg-surface/80 hover:border-tungsten text-[11px] font-mono tracking-wider transition-colors"
            >
              {playbackRate}x
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 border border-hairline bg-surface/80 hover:border-tungsten transition-colors"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
