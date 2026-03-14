"use client";

import { useEffect, useRef } from "react";

export default function SiriGlowBadge({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = container!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    function createGradient(angle: number, alpha: number) {
      const grad = ctx!.createConicGradient(angle, w / 2, h / 2);
      const a = alpha;
      grad.addColorStop(0, `rgba(247,207,140,${a * 0.3})`);
      grad.addColorStop(0.12, `rgba(199,134,75,${a * 0.15})`);
      grad.addColorStop(0.25, `rgba(247,207,140,${a * 0.95})`);
      grad.addColorStop(0.37, `rgba(247,207,140,${a * 0.8})`);
      grad.addColorStop(0.5, `rgba(199,134,75,${a * 0.1})`);
      grad.addColorStop(0.62, `rgba(220,170,100,${a * 0.4})`);
      grad.addColorStop(0.75, `rgba(247,207,140,${a * 0.9})`);
      grad.addColorStop(0.88, `rgba(199,134,75,${a * 0.15})`);
      grad.addColorStop(1.0, `rgba(247,207,140,${a * 0.3})`);
      return grad;
    }

    function badgePath() {
      const r = h / 2;
      ctx!.beginPath();
      ctx!.moveTo(r, 0);
      ctx!.lineTo(w - r, 0);
      ctx!.arcTo(w, 0, w, r, r);
      ctx!.arcTo(w, h, w - r, h, r);
      ctx!.lineTo(r, h);
      ctx!.arcTo(0, h, 0, h - r, r);
      ctx!.arcTo(0, 0, r, 0, r);
      ctx!.closePath();
    }

    function draw(time: number) {
      if (!startRef.current) startRef.current = time;
      const elapsed = (time - startRef.current) / 1000;

      ctx!.clearRect(0, 0, w, h);

      const pulse = 0.7 + 0.3 * Math.sin(elapsed * 2.0);
      const angle = (90 + elapsed * 45) * (Math.PI / 180);
      const settle = Math.min(elapsed / 1.5, 1);
      const eased = settle * settle * (3 - 2 * settle);
      const baseAlpha = 0.85 - 0.45 * eased;
      const alpha = baseAlpha * pulse;

      // Clip everything to the badge shape
      ctx!.save();
      badgePath();
      ctx!.clip();

      // Draw glow layers — strokes centered on the border, only inner half visible
      // Wide strokes at low opacity = soft diffuse glow fading inward
      // Thin strokes at high opacity = bright edge
      const gradient = createGradient(angle, alpha);

      const layers = [
        { lineWidth: 40, opacity: 0.04 },
        { lineWidth: 30, opacity: 0.06 },
        { lineWidth: 22, opacity: 0.08 },
        { lineWidth: 16, opacity: 0.10 },
        { lineWidth: 11, opacity: 0.14 },
        { lineWidth: 7, opacity: 0.20 },
        { lineWidth: 4, opacity: 0.35 },
        { lineWidth: 2, opacity: 0.55 },
        { lineWidth: 1, opacity: 0.80 },
      ];

      for (const layer of layers) {
        ctx!.globalAlpha = layer.opacity;
        badgePath();
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = layer.lineWidth;
        ctx!.stroke();
      }

      ctx!.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative rounded-full">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative flex items-center justify-center px-3.5 py-1.5 lg:px-4 lg:py-2 leading-none">
        {children}
      </div>
    </div>
  );
}
