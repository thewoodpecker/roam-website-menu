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

    function createGradient(
      angle: number,
      alpha: number,
    ) {
      const cx = w / 2;
      const cy = h / 2;
      const grad = ctx!.createConicGradient(angle, cx, cy);
      const a = alpha;

      grad.addColorStop(0, `rgba(255,255,255,${a * 0.3})`);
      grad.addColorStop(0.1, `rgba(180,180,200,${a * 0.2})`);
      grad.addColorStop(0.25, `rgba(255,255,255,${a * 0.9})`);
      grad.addColorStop(0.35, `rgba(255,255,255,${a * 0.85})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${a * 0.15})`);
      grad.addColorStop(0.65, `rgba(210,210,220,${a * 0.5})`);
      grad.addColorStop(0.75, `rgba(255,255,255,${a * 0.8})`);
      grad.addColorStop(0.9, `rgba(180,180,200,${a * 0.2})`);
      grad.addColorStop(1.0, `rgba(255,255,255,${a * 0.3})`);

      return grad;
    }

    function roundedRectPath() {
      const r = h / 2; // fully rounded (pill shape)
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

      // Manual blur: draw multiple strokes with increasing width and decreasing opacity
      // This replaces ctx.filter="blur()" which doesn't work on Safari iOS

      // Outer glow layers (wide, faint strokes for soft glow)
      const glowLayers = [
        { lineWidth: 24, opacity: 0.04 },
        { lineWidth: 18, opacity: 0.06 },
        { lineWidth: 14, opacity: 0.08 },
        { lineWidth: 10, opacity: 0.12 },
        { lineWidth: 7, opacity: 0.18 },
      ];

      for (const layer of glowLayers) {
        ctx!.save();
        ctx!.globalAlpha = layer.opacity;
        roundedRectPath();
        ctx!.strokeStyle = createGradient(angle, alpha);
        ctx!.lineWidth = layer.lineWidth;
        ctx!.stroke();
        ctx!.restore();
      }

      // Core layer (sharp bright edge)
      ctx!.save();
      ctx!.globalAlpha = 0.7;
      roundedRectPath();
      ctx!.strokeStyle = createGradient(angle, alpha);
      ctx!.lineWidth = 2;
      ctx!.stroke();
      ctx!.restore();

      // Inner bright line
      ctx!.save();
      ctx!.globalAlpha = 0.9;
      roundedRectPath();
      ctx!.strokeStyle = createGradient(angle, alpha);
      ctx!.lineWidth = 1;
      ctx!.stroke();
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
    <div ref={containerRef} className="relative overflow-hidden rounded-full">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative rounded-full bg-black/70 m-[1px] px-2.5 py-1 lg:px-3 lg:py-1.5">
        {children}
      </div>
    </div>
  );
}
