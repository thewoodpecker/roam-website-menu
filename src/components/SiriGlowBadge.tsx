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

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = container!.getBoundingClientRect();
      const pad = 20;
      canvas!.width = (rect.width + pad * 2) * dpr;
      canvas!.height = (rect.height + pad * 2) * dpr;
      canvas!.style.width = `${rect.width + pad * 2}px`;
      canvas!.style.height = `${rect.height + pad * 2}px`;
      canvas!.style.left = `${-pad}px`;
      canvas!.style.top = `${-pad}px`;
      ctx!.scale(dpr, dpr);
    }

    resize();

    function getShades() {
      return {
        core: "rgba(255, 255, 255, 0.9)",
        mid: "rgba(200, 200, 210, 0.6)",
        dim: "rgba(160, 160, 180, 0.25)",
      };
    }

    function buildStops(elapsed: number, intensity: number) {
      const pulse = 0.7 + 0.3 * Math.sin(elapsed * 2.0);
      const angle = (90 + elapsed * 45) * (Math.PI / 180);
      const settle = Math.min(elapsed / 1.5, 1);
      const eased = settle * settle * (3 - 2 * settle);
      const baseAlpha = 0.85 - 0.55 * eased;
      const alpha = baseAlpha * pulse * intensity;
      const shades = getShades();

      return { angle, alpha, shades };
    }

    function createGradient(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      angle: number,
      alpha: number,
      shades: { core: string; mid: string; dim: string }
    ) {
      const grad = ctx.createConicGradient(angle, cx, cy);
      const a = alpha;

      grad.addColorStop(0, `rgba(255,255,255,${a * 0.3})`);
      grad.addColorStop(0.1, shades.dim);
      grad.addColorStop(0.25, `rgba(255,255,255,${a * 0.9})`);
      grad.addColorStop(0.35, shades.core);
      grad.addColorStop(0.5, `rgba(255,255,255,${a * 0.2})`);
      grad.addColorStop(0.65, shades.mid);
      grad.addColorStop(0.75, `rgba(255,255,255,${a * 0.8})`);
      grad.addColorStop(0.9, shades.dim);
      grad.addColorStop(1.0, `rgba(255,255,255,${a * 0.3})`);

      return grad;
    }

    function draw(time: number) {
      if (!startRef.current) startRef.current = time;
      const elapsed = (time - startRef.current) / 1000;

      const dpr = window.devicePixelRatio || 1;
      const rect = container!.getBoundingClientRect();
      const pad = 20;
      const w = rect.width + pad * 2;
      const h = rect.height + pad * 2;

      ctx!.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const rx = rect.width / 2;
      const ry = rect.height / 2;
      const br = Math.min(rx, ry);

      // Clip to rounded rect for the stroke path
      function roundedRectPath(inset: number) {
        const x = pad - inset;
        const y = pad - inset;
        const rw = rect.width + inset * 2;
        const rh = rect.height + inset * 2;
        const r = br + inset;
        ctx!.beginPath();
        ctx!.moveTo(x + r, y);
        ctx!.lineTo(x + rw - r, y);
        ctx!.quadraticCurveTo(x + rw, y, x + rw, y + r);
        ctx!.lineTo(x + rw, y + rh - r);
        ctx!.quadraticCurveTo(x + rw, y + rh, x + rw - r, y + rh);
        ctx!.lineTo(x + r, y + rh);
        ctx!.quadraticCurveTo(x, y + rh, x, y + rh - r);
        ctx!.lineTo(x, y + r);
        ctx!.quadraticCurveTo(x, y, x + r, y);
        ctx!.closePath();
      }

      // Layer 1: Halo (outer glow)
      const s1 = buildStops(elapsed, 0.8);
      ctx!.save();
      ctx!.globalAlpha = 0.6;
      ctx!.filter = "blur(12px)";
      roundedRectPath(2);
      ctx!.strokeStyle = createGradient(ctx!, cx, cy, s1.angle, s1.alpha, s1.shades);
      ctx!.lineWidth = 10;
      ctx!.stroke();
      ctx!.restore();

      // Layer 2: Main glow
      const s2 = buildStops(elapsed, 1.0);
      ctx!.save();
      ctx!.globalAlpha = 0.8;
      ctx!.filter = "blur(3px)";
      roundedRectPath(0);
      ctx!.strokeStyle = createGradient(ctx!, cx, cy, s2.angle, s2.alpha, s2.shades);
      ctx!.lineWidth = 4;
      ctx!.stroke();
      ctx!.restore();

      // Layer 3: Core (sharp)
      ctx!.save();
      ctx!.globalAlpha = 0.9;
      roundedRectPath(0);
      ctx!.strokeStyle = createGradient(ctx!, cx, cy, s2.angle, s2.alpha, s2.shades);
      ctx!.lineWidth = 1.5;
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
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute"
      />
      <div className="relative rounded-full bg-black/80 px-2.5 py-1 lg:px-3 lg:py-1.5 backdrop-blur-[50px]">
        {children}
      </div>
    </div>
  );
}
