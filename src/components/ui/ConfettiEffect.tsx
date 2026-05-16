import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; life: number; rot: number; rotSpeed: number;
}

interface ConfettiEffectProps {
  activo: boolean;
  onDone?: () => void;
}

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#a855f7', '#eab308', '#06b6d4'];

export function ConfettiEffect({ activo, onDone }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!activo) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      life: 1,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
    }));

    let frame = 0;
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      let alive = false;
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.rot += p.rotSpeed;
        p.life -= 0.008;
        if (p.life > 0 && p.y < canvas!.height) {
          alive = true;
          ctx!.save();
          ctx!.globalAlpha = p.life;
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rot);
          ctx!.fillStyle = p.color;
          ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx!.restore();
        }
      });
      frame++;
      if (alive && frame < 300) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        onDone?.();
      }
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [activo, onDone]);

  if (!activo) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}
