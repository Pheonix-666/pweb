"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export type CursorVariant = "default" | "hover" | "view" | "play" | "drag" | "explore";

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for responsive follow
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is touch primary
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check what element we are hovering over
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const customType = cursorTarget.getAttribute("data-cursor") as CursorVariant;
        const customText = cursorTarget.getAttribute("data-cursor-text");

        if (customType === "play" || customText === "PLAY") {
          setVariant("play");
          setCursorText("PLAY");
        } else if (customType === "view" || customText === "VIEW") {
          setVariant("view");
          setCursorText("VIEW");
        } else if (customType === "explore" || customText === "EXPLORE") {
          setVariant("explore");
          setCursorText("EXPLORE");
        } else if (customType === "drag" || customText === "DRAG") {
          setVariant("drag");
          setCursorText("DRAG");
        } else {
          setVariant("hover");
          setCursorText(customText || "");
        }
      } else if (target.closest("button, a, input, textarea, select")) {
        setVariant("hover");
        setCursorText("");
      } else if (target.closest("video")) {
        setVariant("play");
        setCursorText("PLAY");
      } else {
        setVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Variants config for cursor morphing
  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: "#E8A33D",
      border: "1px solid rgba(232, 163, 61, 0.4)",
    },
    hover: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(232, 163, 61, 0.15)",
      border: "1px solid rgba(232, 163, 61, 0.8)",
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: "rgba(10, 10, 10, 0.9)",
      border: "1px solid rgba(232, 163, 61, 0.8)",
    },
    play: {
      width: 76,
      height: 76,
      backgroundColor: "rgba(10, 10, 10, 0.9)",
      border: "1px solid rgba(229, 72, 77, 0.8)",
    },
    explore: {
      width: 76,
      height: 76,
      backgroundColor: "rgba(10, 10, 10, 0.9)",
      border: "1px solid rgba(242, 240, 235, 0.8)",
    },
    drag: {
      width: 68,
      height: 68,
      backgroundColor: "rgba(17, 17, 19, 0.9)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
    },
  };

  const isExpanded = ["view", "play", "explore", "drag"].includes(variant);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center rounded-full shadow-2xl backdrop-blur-[2px]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={variant}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="flex flex-col items-center justify-center gap-0.5 select-none"
        >
          {variant === "play" && (
            <span className="w-1.5 h-1.5 rounded-full bg-rec mb-0.5 animate-pulse-rec" />
          )}
          <span
            className={`font-mono text-[10px] tracking-widest font-semibold ${
              variant === "play"
                ? "text-rec"
                : variant === "view"
                ? "text-tungsten"
                : "text-primary"
            }`}
          >
            {cursorText}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
