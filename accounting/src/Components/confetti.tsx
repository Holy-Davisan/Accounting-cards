import React, { useEffect, useRef } from "react";

type Props = {
  // increment this prop to trigger a confetti burst
  burst?: number;
};

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"];

export default function Confetti({ burst = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastBurstRef = useRef<number>(0);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvasEl!.width = window.innerWidth;
      canvasEl!.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // prerender small colored rectangles as sprites
    const spriteCanvases: HTMLCanvasElement[] = [];
    for (let i = 0; i < COLORS.length; i++) {
      const s = document.createElement("canvas");
      s.width = 12;
      s.height = 20;
      const sc = s.getContext("2d")!;
      sc.fillStyle = COLORS[i];
      sc.fillRect(0, 0, s.width, s.height);
      spriteCanvases.push(s);
    }
    spritesRef.current = spriteCanvases;

    function step() {
      const w = canvasEl!.width;
      const h = canvasEl!.height;
      ctx!.clearRect(0, 0, w, h);

      const out: any[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rotation += p.vr;
        p.life -= 1;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.globalAlpha = Math.max(0, p.life / p.maxLife);
        const sprite = spritesRef.current[p.sprite % spritesRef.current.length];
        ctx!.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
        ctx!.restore();

        if (p.y - 30 < h && p.life > 0) {
          out.push(p);
        }
      }
      particlesRef.current = out;

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    // when burst increments, create particles
    if (burst <= lastBurstRef.current) return;
    lastBurstRef.current = burst;
    const count = 40;
    const w = window.innerWidth;
    const startX = w / 2;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
      const speed = 2 + Math.random() * 6;
      particlesRef.current.push({
        x: startX + (Math.random() - 0.5) * 200,
        y: -20 + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        vr: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI,
        life: 120 + Math.random() * 40,
        maxLife: 120 + Math.random() * 40,
        sprite: Math.floor(Math.random() * COLORS.length),
      });
    }
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
