"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  from?: "bottom" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
};

const VARIANT_CLASS: Record<NonNullable<RevealProps["from"]>, string> = {
  bottom: "reveal",
  left: "reveal-from-left",
  right: "reveal-from-right",
  scale: "reveal-scale",
};

export default function Reveal({ children, from = "bottom", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(VARIANT_CLASS[from], className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
