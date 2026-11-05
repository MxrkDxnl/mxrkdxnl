import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number; // ms elapsed
  maxLife: number; // ms total
  alpha: number;
}

const MAX_PARTICLES = 260;
const SPAWN_SPACING_PX = 6; // one particle roughly every 6px of mouse travel
const GLOW_SIZE = 240; // px diameter of the soft spotlight at the cursor tip

/**
 * A fine white dust trail that follows the mouse.
 * - Full-screen canvas, pointer-events: none, so it never blocks clicks.
 * - `mix-blend-mode: difference` keeps the dust visible on the white sections too.
 * - Mouse/pen only (skipped on touch screens) and disabled for "reduce motion".
 * - The animation loop only runs while particles are alive.
 */
export const CursorDust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    let frame = 0;
    let lastTime = 0;
    const last: { x: number | null; y: number | null } = { x: null, y: null };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, dx: number, dy: number) => {
      if (particles.length >= MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES + 1);
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.01 + Math.random() * 0.03; // px per ms
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        // random drift plus a little of the mouse's own direction, then gently falling
        vx: Math.cos(angle) * speed - dx * 0.0015,
        vy: Math.sin(angle) * speed - dy * 0.0015,
        size: 0.6 + Math.random() * 1.6,
        life: 0,
        maxLife: 550 + Math.random() * 650,
        alpha: 0.55 + Math.random() * 0.45,
      });
    };

    const tick = (time: number) => {
      const dt = lastTime ? Math.min(time - lastTime, 48) : 16;
      lastTime = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = '#ffffff';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.vy += 0.00004 * dt; // very light gravity so the dust settles downward
        p.vx *= 0.985;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const t = p.life / p.maxLife;
        ctx.globalAlpha = p.alpha * (1 - t) * (1 - t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (particles.length > 0) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };

    // Soft spotlight that trails the cursor tip slightly
    const glow = glowRef.current;
    const glowPos = { x: 0, y: 0, tx: 0, ty: 0, visible: false };
    let glowFrame = 0;
    const glowTick = () => {
      glowPos.x += (glowPos.tx - glowPos.x) * 0.3;
      glowPos.y += (glowPos.ty - glowPos.y) * 0.3;
      if (glow) {
        glow.style.transform = `translate3d(${glowPos.x - GLOW_SIZE / 2}px, ${glowPos.y - GLOW_SIZE / 2}px, 0)`;
      }
      if (Math.abs(glowPos.tx - glowPos.x) > 0.1 || Math.abs(glowPos.ty - glowPos.y) > 0.1) {
        glowFrame = requestAnimationFrame(glowTick);
      } else {
        glowFrame = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const x = e.clientX;
      const y = e.clientY;
      glowPos.tx = x;
      glowPos.ty = y;
      if (!glowPos.visible) {
        glowPos.visible = true;
        glowPos.x = x;
        glowPos.y = y;
        if (glow) glow.style.opacity = '1';
      }
      if (!glowFrame) glowFrame = requestAnimationFrame(glowTick);
      if (last.x === null || last.y === null) {
        last.x = x;
        last.y = y;
        return;
      }
      const fromX = last.x;
      const fromY = last.y;
      const dx = x - fromX;
      const dy = y - fromY;
      const dist = Math.hypot(dx, dy);
      const count = Math.min(Math.floor(dist / SPAWN_SPACING_PX), 8);
      for (let i = 1; i <= count; i++) {
        const t = i / count;
        spawn(fromX + dx * t, fromY + dy * t, dx, dy);
      }
      if (count > 0) {
        last.x = x;
        last.y = y;
      }
      if (!frame && particles.length > 0) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      last.x = null;
      last.y = null;
      glowPos.visible = false;
      if (glow) glow.style.opacity = '0';
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      if (glowFrame) cancelAnimationFrame(glowFrame);
    };
  }, []);

  return (
    <>
      {/* Spotlight: brightens dark areas around the cursor, invisible on white sections */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[59] pointer-events-none rounded-full transition-opacity duration-300"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          opacity: 0,
          mixBlendMode: 'screen',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.07) 22%, rgba(255,255,255,0.025) 45%, rgba(255,255,255,0) 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  );
};
