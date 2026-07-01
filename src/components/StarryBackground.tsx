"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  phase: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const starCount = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
        const currentOpacity = star.opacity + twinkle * 0.3;
        const currentSize = star.size + twinkle * 0.5;

        // Main star glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          currentSize * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.3, `rgba(244, 143, 177, ${currentOpacity * 0.4})`);
        gradient.addColorStop(0.6, `rgba(206, 147, 216, ${currentOpacity * 0.2})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Star center
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, currentOpacity + 0.3)})`;
        ctx.fill();

        // Cross sparkle
        if (currentSize > 2) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - currentSize * 2, star.y);
          ctx.lineTo(star.x + currentSize * 2, star.y);
          ctx.moveTo(star.x, star.y - currentSize * 2);
          ctx.lineTo(star.x, star.y + currentSize * 2);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
