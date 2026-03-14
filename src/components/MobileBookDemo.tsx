"use client";

import { useState, useEffect, useRef } from "react";

export default function MobileBookDemo() {
  const inlineRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = inlineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Inline button in hero */}
      <div ref={inlineRef} className="w-full lg:hidden">
        <div
          className="flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3.5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18),0px_6px_10px_4px_rgba(0,0,0,0.08)]"
        >
          <span className="text-base font-medium leading-6 tracking-[-0.32px] text-[#1a1a1a]">
            Book Demo
          </span>
        </div>
      </div>

      {/* Fixed bottom bar — appears when inline button scrolls out of view */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 lg:hidden border-t border-white/10 bg-black px-5 py-3 pb-[env(safe-area-inset-bottom,12px)] transition-all duration-300 ease-out"
        style={{
          transform: pinned ? "translateY(0)" : "translateY(100%)",
          opacity: pinned ? 1 : 0,
        }}
      >
        <div
          className="flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3.5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18),0px_6px_10px_4px_rgba(0,0,0,0.08)]"
        >
          <span className="text-base font-medium leading-6 tracking-[-0.32px] text-[#1a1a1a]">
            Book Demo
          </span>
        </div>
      </div>
    </>
  );
}
