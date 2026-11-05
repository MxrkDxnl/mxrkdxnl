import React, { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

// Continuous drift speed (px per second). Phones drift faster than desktop.
const DRIFT_SPEED_DESKTOP = 40;
const DRIFT_SPEED_MOBILE = 80;
const MOBILE_QUERY = '(max-width: 767px)';
const SCROLL_FACTOR = 0.3; // how strongly page scroll pushes the rows

interface MarqueeTile {
  image: string;
  title: string;
  project: string;
}

/**
 * Two rows of real project screenshots.
 * - Always drifting: top row to the left, bottom row to the right (faster on phones).
 * - Page scroll adds an extra push on top of the drift.
 * - Hovering a row eases it to a stop so a screenshot can be looked at.
 * Each row holds three copies of its tiles and the drift wraps by one copy's width,
 * so the loop is seamless. Transforms are written straight to the DOM in a
 * requestAnimationFrame loop that only runs while the section is on screen.
 */
export const MarqueeSection: React.FC = () => {
  const { data } = usePortfolio();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [row1, row2] = useMemo(() => {
    const tiles: MarqueeTile[] = data.projects.flatMap((p) =>
      (p.screenshots ?? []).map((s) => ({ image: s.image, title: s.title, project: p.name }))
    );
    const mid = Math.ceil(tiles.length / 2);
    return [tiles.slice(0, mid), tiles.slice(mid)];
  }, [data.projects]);

  useEffect(() => {
    const section = sectionRef.current;
    const rowEls = [row1Ref.current, row2Ref.current];
    if (!section || !rowEls[0] || !rowEls[1]) return;

    const mobile = window.matchMedia(MOBILE_QUERY);
    // Per row: one copy's width, distance drifted so far, current speed factor (0–1 for hover pause)
    const rows = rowEls.map((el) => ({ el: el as HTMLDivElement, copyWidth: 0, drift: 0, speed: 1, hovered: false }));

    const measure = () => {
      for (const r of rows) r.copyWidth = r.el.scrollWidth / 3;
    };

    const scrollPush = () => {
      if (reduceMotion) return 0;
      // Equivalent to (scrollY - sectionTop + innerHeight) * 0.3, centred around 0
      return (window.innerHeight - section.getBoundingClientRect().top) * SCROLL_FACTOR - 200;
    };

    const wrap = (v: number, w: number) => (w > 0 ? ((v % w) + w) % w : 0);

    const apply = () => {
      const push = scrollPush();
      const [top, bottom] = rows;
      // Top row: drifts left, scroll pushes it right
      const x1 = -top.copyWidth + push - wrap(top.drift, top.copyWidth);
      // Bottom row: drifts right, scroll pushes it left
      const x2 = -bottom.copyWidth - push + wrap(bottom.drift, bottom.copyWidth);
      top.el.style.transform = `translate3d(${x1.toFixed(1)}px, 0, 0)`;
      bottom.el.style.transform = `translate3d(${x2.toFixed(1)}px, 0, 0)`;
    };

    measure();
    apply();

    if (reduceMotion) {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    let frame = 0;
    let last = 0;
    let visible = false;

    const loop = (time: number) => {
      const dt = last ? Math.min(time - last, 64) / 1000 : 0;
      last = time;
      const pxPerSecond = mobile.matches ? DRIFT_SPEED_MOBILE : DRIFT_SPEED_DESKTOP;
      for (const r of rows) {
        r.speed += ((r.hovered ? 0 : 1) - r.speed) * Math.min(1, dt * 4); // ease in/out of hover pause
        r.drift += pxPerSecond * r.speed * dt;
      }
      apply();
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    // Only animate while the marquee is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(section);

    const hoverHandlers = rows.map((r) => {
      const enter = (e: PointerEvent) => {
        if (e.pointerType === 'mouse') r.hovered = true;
      };
      const leave = () => {
        r.hovered = false;
      };
      r.el.addEventListener('pointerenter', enter);
      r.el.addEventListener('pointerleave', leave);
      return { r, enter, leave };
    });

    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      for (const { r, enter, leave } of hoverHandlers) {
        r.el.removeEventListener('pointerenter', enter);
        r.el.removeEventListener('pointerleave', leave);
      }
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion, row1.length, row2.length]);

  if (row1.length === 0) return null;

  const renderRow = (tiles: MarqueeTile[], rowKey: string) =>
    [0, 1, 2].flatMap((copy) =>
      tiles.map((tile, i) => (
        <div
          key={`${rowKey}-${copy}-${i}`}
          aria-hidden={copy !== 1}
          className="group relative w-[300px] h-[195px] sm:w-[420px] sm:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#18181b] border border-white/5"
        >
          <img
            src={tile.image}
            alt={copy === 1 ? `${tile.title} (${tile.project})` : ''}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none">
            <span className="block text-[11px] sm:text-xs uppercase tracking-wider text-white/85 font-medium truncate">
              {tile.title}
            </span>
          </div>
        </div>
      ))
    );

  return (
    <section
      ref={sectionRef}
      data-section-id="sec-marquee"
      aria-label="Project screenshots and diagrams"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full overflow-hidden">
          <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
            {renderRow(row1, 'r1')}
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
            {renderRow(row2, 'r2')}
          </div>
        </div>
      </div>
    </section>
  );
};
