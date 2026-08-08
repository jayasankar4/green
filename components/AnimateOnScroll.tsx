"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in-up" | "fade-in" | "slide-in-right";
  delay?: number;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
  // threshold is kept for API compatibility but not used
  threshold: _threshold = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  // IMPORTANT: Start as TRUE so SSR/hydration always renders content visible.
  // Animations are an enhancement, never a gate that hides content.
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Skip animations for reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Mark that we can animate (client-side only)
    setShouldAnimate(true);

    if (!("IntersectionObserver" in window) || !ref.current) {
      setHasAnimated(true);
      return;
    }

    const el = ref.current;

    // If element is already visible in viewport on mount, animate immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 50px 0px" }
    );

    observer.observe(el);

    // Absolute safety net: always show content after 2s no matter what
    const timer = setTimeout(() => setHasAnimated(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const animationClasses: Record<string, string> = {
    "fade-in-up": "animate-fade-in-up",
    "fade-in": "animate-fade-in",
    "slide-in-right": "animate-slide-in-right",
  };

  // When shouldAnimate is false (SSR / no-JS / reduced-motion):
  //   → render fully visible with no animation class
  // When shouldAnimate is true but hasAnimated is false:
  //   → element is off-screen waiting to scroll in; hide it (client-only)
  // When hasAnimated is true:
  //   → play the animation class
  const animClass = !shouldAnimate
    ? "" // SSR: visible, no animation
    : hasAnimated
    ? animationClasses[animation] // play animation
    : "opacity-0"; // waiting to scroll into view (client only)

  return (
    <div
      ref={ref}
      className={`${className} ${animClass}`}
      style={{
        animationDelay:
          shouldAnimate && hasAnimated ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
