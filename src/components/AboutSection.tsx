import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Terminal, Network, Cpu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { usePortfolio } from '../context/PortfolioContext';

interface FloatingTile {
  Icon: LucideIcon;
  /** Starting corner, as fractions of the section size */
  start: { x: number; y: number };
  size: string;
  iconSize: string;
  delay: number;
  enterX: number;
}

const FLOATING_TILES: FloatingTile[] = [
  {
    Icon: ShieldCheck,
    start: { x: 0.04, y: 0.04 },
    size: 'w-[76px] h-[76px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px]',
    iconSize: 'w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16',
    delay: 0.1,
    enterX: -80,
  },
  {
    Icon: Network,
    start: { x: 0.96, y: 0.04 },
    size: 'w-[76px] h-[76px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px]',
    iconSize: 'w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16',
    delay: 0.15,
    enterX: 80,
  },
  {
    Icon: Terminal,
    start: { x: 0.1, y: 0.92 },
    size: 'w-[64px] h-[64px] sm:w-[96px] sm:h-[96px] md:w-[128px] md:h-[128px]',
    iconSize: 'w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14',
    delay: 0.25,
    enterX: -80,
  },
  {
    Icon: Cpu,
    start: { x: 0.9, y: 0.92 },
    size: 'w-[68px] h-[68px] sm:w-[104px] sm:h-[104px] md:w-[140px] md:h-[140px]',
    iconSize: 'w-7 h-7 sm:w-11 sm:h-11 md:w-[3.75rem] md:h-[3.75rem]',
    delay: 0.3,
    enterX: 80,
  },
];

// Zero-gravity tuning
const CRUISE_MIN = 55; // px/s – slowest normal float
const CRUISE_MAX = 120; // px/s – fastest normal float
const WANDER = 60; // random push per second, keeps paths organic
const THROW_MAX = 3200; // px/s cap for a flick
const THROW_DRAG = 1.1; // how quickly a thrown tile slows back to cruising (per second)
const BOUNCE = 0.9; // energy kept when a thrown tile hits an edge
const NAV_HEIGHT = 80; // fixed navbar; thrown tiles bounce off its bottom edge

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number; // degrees, free spin
  vr: number; // degrees per second
  baseSpin: number; // lazy spin it settles back to
  tiltPhase: number;
  size: number;
  dragging: boolean;
  thrown: boolean;
  grabX: number;
  grabY: number;
  samples: { t: number; x: number; y: number }[];
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Zero-gravity physics for the tiles:
 * - they float in every direction, spin freely and tumble in 3D,
 * - they bounce off the section edges and off each other,
 * - you can grab one (mouse or touch) and throw it: it flies to the edge of the
 *   visible screen, bounces around, then slows back to its normal float.
 * Positions are written straight to the DOM; the loop only runs while on screen.
 */
const useZeroGravity = (
  sectionRef: React.RefObject<HTMLElement | null>,
  tileRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
  useEffect(() => {
    const section = sectionRef.current;
    const els = tileRefs.current;
    if (!section || els.some((el) => !el)) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { width: section.clientWidth, height: section.clientHeight, clock: 0 };

    const bodies: Body[] = FLOATING_TILES.map((tile, i) => {
      const size = els[i]!.offsetWidth;
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(CRUISE_MIN, CRUISE_MAX);
      const spin = rand(18, 55) * (Math.random() < 0.5 ? -1 : 1);
      return {
        x: tile.start.x * (state.width - size),
        y: tile.start.y * (state.height - size),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: rand(-30, 30),
        vr: spin,
        baseSpin: spin,
        tiltPhase: rand(0, Math.PI * 2),
        size,
        dragging: false,
        thrown: false,
        grabX: 0,
        grabY: 0,
        samples: [],
      };
    });

    const render = () => {
      bodies.forEach((b, i) => {
        const el = els[i]!;
        const tiltX = reducedMotion ? 0 : Math.sin(state.clock * 0.9 + b.tiltPhase) * 28;
        const tiltY = reducedMotion ? 0 : Math.cos(state.clock * 0.7 + b.tiltPhase * 1.7) * 28;
        const rot = reducedMotion ? 0 : b.rot;
        el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0) perspective(700px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) rotateZ(${rot.toFixed(1)}deg)`;
        el.style.zIndex = b.dragging || b.thrown ? '30' : '0';
      });
    };

    const onResize = () => {
      state.width = section.clientWidth;
      state.height = section.clientHeight;
      bodies.forEach((b, i) => {
        b.size = els[i]!.offsetWidth;
        b.x = Math.min(Math.max(0, b.x), Math.max(0, state.width - b.size));
        b.y = Math.min(Math.max(0, b.y), Math.max(0, state.height - b.size));
      });
      render();
    };

    render();
    const sizeObserver = new ResizeObserver(onResize);
    sizeObserver.observe(section);
    if (reducedMotion) {
      return () => sizeObserver.disconnect();
    }

    // Area of the section currently visible on screen (below the navbar), in section coords
    const visibleBounds = () => {
      const rect = section.getBoundingClientRect();
      const top = Math.max(0, NAV_HEIGHT - rect.top);
      const bottom = Math.min(state.height, window.innerHeight - rect.top);
      return bottom - top > 120 ? { top, bottom } : { top: 0, bottom: state.height };
    };

    const step = (dt: number) => {
      const view = visibleBounds();

      for (const b of bodies) {
        if (b.dragging) continue;

        const speed = Math.hypot(b.vx, b.vy) || 1;
        if (b.thrown) {
          // Thrown: glide and slow down until back to cruising speed
          const decay = Math.exp(-THROW_DRAG * dt);
          b.vx *= decay;
          b.vy *= decay;
          if (Math.hypot(b.vx, b.vy) <= CRUISE_MAX) b.thrown = false;
        } else {
          // Cruising: organic wander, speed kept within the cruise band
          b.vx += (Math.random() - 0.5) * WANDER * dt;
          b.vy += (Math.random() - 0.5) * WANDER * dt;
          const s = Math.hypot(b.vx, b.vy) || 1;
          const clamped = Math.min(CRUISE_MAX, Math.max(CRUISE_MIN, s));
          b.vx = (b.vx / s) * clamped;
          b.vy = (b.vy / s) * clamped;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Thrown tiles bounce off the visible screen edges; cruising ones off the section
        const minY = b.thrown ? view.top : 0;
        const maxY = (b.thrown ? view.bottom : state.height) - b.size;
        const maxX = state.width - b.size;
        const keep = b.thrown ? BOUNCE : 1;
        const kick = () => {
          b.vr += rand(-90, 90) * Math.min(1, speed / 600 + 0.2);
        };
        if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * keep; kick(); }
        if (b.x > maxX) { b.x = maxX; b.vx = -Math.abs(b.vx) * keep; kick(); }
        if (b.y < minY) { b.y = minY; b.vy = Math.abs(b.vy) * keep; kick(); }
        if (b.y > maxY) { b.y = maxY; b.vy = -Math.abs(b.vy) * keep; kick(); }

        // Free spin that relaxes back to the tile's own lazy spin
        b.vr += (b.baseSpin - b.vr) * Math.min(1, 0.6 * dt);
        b.rot = (b.rot + b.vr * dt) % 360;
      }

      // Tiles bump each other (equal-mass elastic); a held tile acts like a wall
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const c = bodies[j];
          const dx = c.x + c.size / 2 - (a.x + a.size / 2);
          const dy = c.y + c.size / 2 - (a.y + a.size / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = (a.size + c.size) / 2;
          if (dist >= minDist) continue;
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          if (a.dragging || c.dragging) {
            // Push the free tile out of the held one and reflect its velocity
            const free = a.dragging ? c : a;
            const sign = a.dragging ? 1 : -1;
            free.x += nx * overlap * sign;
            free.y += ny * overlap * sign;
            const vn = free.vx * nx * sign + free.vy * ny * sign;
            if (vn < 0) {
              free.vx -= 2 * vn * nx * sign;
              free.vy -= 2 * vn * ny * sign;
            }
            continue;
          }
          a.x -= (nx * overlap) / 2;
          a.y -= (ny * overlap) / 2;
          c.x += (nx * overlap) / 2;
          c.y += (ny * overlap) / 2;
          const relative = (a.vx - c.vx) * nx + (a.vy - c.vy) * ny;
          if (relative > 0) {
            a.vx -= relative * nx;
            a.vy -= relative * ny;
            c.vx += relative * nx;
            c.vy += relative * ny;
            if (Math.hypot(a.vx, a.vy) > CRUISE_MAX) a.thrown = true;
            if (Math.hypot(c.vx, c.vy) > CRUISE_MAX) c.thrown = true;
            a.vr -= rand(40, 120);
            c.vr += rand(40, 120);
          }
        }
      }
    };

    // ---- Animation loop (runs while on screen, or while a tile is held/flying) ----
    const loopState = { frame: 0, last: 0, visible: false };
    const loop = (time: number) => {
      const dt = loopState.last ? Math.min(time - loopState.last, 50) / 1000 : 0;
      loopState.last = time;
      state.clock += dt;
      step(dt);
      render();
      const busy = bodies.some((b) => b.dragging || b.thrown);
      loopState.frame = loopState.visible || busy ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!loopState.frame) {
        loopState.last = 0;
        loopState.frame = requestAnimationFrame(loop);
      }
    };

    // ---- Grab & throw ----
    const toLocal = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlers = els.map((node, i) => {
      const el = node as HTMLDivElement;
      const b = bodies[i];
      const down = (e: PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        const p = toLocal(e);
        b.dragging = true;
        b.thrown = false;
        b.grabX = p.x - b.x;
        b.grabY = p.y - b.y;
        b.vx = 0;
        b.vy = 0;
        b.samples = [{ t: performance.now(), x: p.x, y: p.y }];
        el.style.cursor = 'grabbing';
        start();
      };
      const move = (e: PointerEvent) => {
        if (!b.dragging) return;
        const p = toLocal(e);
        b.x = Math.min(Math.max(0, p.x - b.grabX), state.width - b.size);
        b.y = Math.min(Math.max(0, p.y - b.grabY), state.height - b.size);
        const now = performance.now();
        b.samples.push({ t: now, x: p.x, y: p.y });
        while (b.samples.length > 2 && now - b.samples[0].t > 100) b.samples.shift();
      };
      const up = () => {
        if (!b.dragging) return;
        b.dragging = false;
        el.style.cursor = '';
        const first = b.samples[0];
        const last = b.samples[b.samples.length - 1];
        const dt = (last.t - first.t) / 1000;
        let vx = dt > 0.008 ? (last.x - first.x) / dt : 0;
        let vy = dt > 0.008 ? (last.y - first.y) / dt : 0;
        const speed = Math.hypot(vx, vy);
        if (speed > THROW_MAX) {
          vx = (vx / speed) * THROW_MAX;
          vy = (vy / speed) * THROW_MAX;
        }
        if (speed < CRUISE_MIN) {
          // Just let go: drift off gently in a random direction
          const angle = Math.random() * Math.PI * 2;
          vx = Math.cos(angle) * CRUISE_MIN;
          vy = Math.sin(angle) * CRUISE_MIN;
        }
        b.vx = vx;
        b.vy = vy;
        b.thrown = Math.hypot(vx, vy) > CRUISE_MAX;
        b.vr += Math.max(-720, Math.min(720, vx * 0.25)); // a flick sets it spinning
      };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      return { el, down, move, up };
    });

    const observer = new IntersectionObserver(([entry]) => {
      loopState.visible = entry.isIntersecting;
      if (loopState.visible) start();
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      for (const h of handlers) {
        h.el.removeEventListener('pointerdown', h.down);
        h.el.removeEventListener('pointermove', h.move);
        h.el.removeEventListener('pointerup', h.up);
        h.el.removeEventListener('pointercancel', h.up);
      }
      if (loopState.frame) cancelAnimationFrame(loopState.frame);
    };
  }, [sectionRef, tileRefs]);
};

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  useZeroGravity(sectionRef, tileRefs);

  const paragraphText = `I'm ${data.identity.preferredName}, a final-year BSc (Hons) Cyber-Security student at Staffordshire University through APIIT Sri Lanka. With a foundation in hands-on hardware engineering and office IT support, I'm building practical skills in security monitoring, log analysis and incident response, working towards my first role in security operations.`;

  return (
    <section
      ref={sectionRef}
      data-section-id="sec-about-reveal"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Zero-gravity glowing tiles drifting around the section (behind the text) */}
      {FLOATING_TILES.map(({ Icon, size, iconSize, delay, enterX }, i) => (
        <div
          key={i}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="absolute left-0 top-0 z-0 cursor-grab select-none will-change-transform motion-reduce:pointer-events-none"
          style={{ touchAction: 'none' }}
        >
          <FadeIn delay={delay} x={enterX} y={0} duration={0.9}>
            <div className="relative">
              {/* Outer glow, slowly breathing */}
              <div
                className="absolute -inset-[45%] rounded-full blur-2xl animate-glow-breathe motion-reduce:animate-none pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(182, 0, 168, 0.55) 0%, rgba(118, 33, 176, 0.35) 35%, rgba(118, 33, 176, 0) 70%)',
                  animationDelay: `${i * -1.3}s`,
                }}
              />
              <div
                className={`${size} relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] flex items-center justify-center bg-gradient-to-br from-[#7621B0]/45 via-[#2a0b35]/80 to-[#0C0C0C]/90 border border-[#d58cff]/25`}
                style={{
                  boxShadow:
                    '0 0 24px rgba(182, 0, 168, 0.45), 0 0 70px rgba(118, 33, 176, 0.35), inset 0 0 22px rgba(213, 140, 255, 0.18)',
                }}
              >
                <Icon
                  className={`${iconSize} text-[#E9D7FF]`}
                  strokeWidth={1.4}
                  style={{ filter: 'drop-shadow(0 0 6px rgba(213, 140, 255, 0.85)) drop-shadow(0 0 16px rgba(182, 0, 168, 0.6))' }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      ))}

      {/* pointer-events-none so the floating tiles can be grabbed behind the text */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full pointer-events-none">
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
          >
            About me
          </h2>
        </FadeIn>

        <div className="h-10 sm:h-14 md:h-16" />

        <div className="w-full flex justify-center">
          <AnimatedText
            text={paragraphText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        <div className="h-16 sm:h-20 md:h-24" />

        <FadeIn delay={0.2} y={20}>
          <Link
            to="/contact"
            className="pointer-events-auto contact-btn rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base inline-flex items-center justify-center transition-[filter,transform] duration-200 hover:brightness-110 hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-offset-2"
          >
            Contact Me
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};
