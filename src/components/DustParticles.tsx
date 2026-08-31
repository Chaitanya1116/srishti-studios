'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  depth: number; // 0.5 to 1.5
}

export const DustParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < particleCount; i++) {
        const depth = Math.random() * 1 + 0.5; // depth scale
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: (Math.random() * 1.5 + 0.5) * depth,
          speedX: (Math.random() * 0.15 - 0.075) * depth,
          speedY: (Math.random() * -0.2 - 0.05) * depth, // Slow floating upwards
          opacity: Math.random() * 0.5 * (1 / depth),
          depth: depth
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;

      // Draw volumetric lighting gradient glow from the top-center
      const glowGrad = ctx.createRadialGradient(
        w / 2, -50, 
        100, 
        w / 2, 0, 
        w * 0.8
      );
      glowGrad.addColorStop(0, 'rgba(168, 117, 59, 0.08)'); // bronze tint
      glowGrad.addColorStop(0.5, 'rgba(34, 53, 47, 0.05)'); // forest green tint
      glowGrad.addColorStop(1, 'rgba(14, 14, 14, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // Render dust motes
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Soft glowing particle styling
        ctx.fillStyle = `rgba(244, 241, 230, ${p.opacity})`;
        ctx.shadowBlur = p.depth > 1 ? 2 : 0;
        ctx.shadowColor = 'rgba(229, 197, 131, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Initialize and bind
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
