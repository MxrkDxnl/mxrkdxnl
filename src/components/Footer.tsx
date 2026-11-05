import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Footer carriage (built by scripts/build-footer-carriage.py from the original 1080p video)
const SOURCE_H = 212; // height of the road strip / sprite images in px
const SPRITE_ASPECT = 680 / SOURCE_H; // carriage sprite width / height
const SOURCE_SPEED = 194; // px/s the carriage travels at SOURCE_H scale
const ENGRAVING_FILTER = 'invert(1) brightness(0.85) contrast(1.15)';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const roadRef = useRef<HTMLDivElement>(null);
  const carriageRef = useRef<HTMLImageElement>(null);

  // Travel speed must match the hooves in the sprite or the horses look like they're
  // moonwalking, so the crossing time is derived from the screen width and road height.
  useEffect(() => {
    const road = roadRef.current;
    const carriage = carriageRef.current;
    if (!road || !carriage) return;
    const update = () => {
      const h = road.clientHeight;
      const spriteW = h * SPRITE_ASPECT;
      const speed = SOURCE_SPEED * (h / SOURCE_H);
      const seconds = (road.clientWidth + spriteW) / speed;
      carriage.style.setProperty('--carriage-duration', `${seconds.toFixed(2)}s`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(road);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Labs', href: '/labs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer
      id="site-footer"
      className="w-full bg-black text-[#D7E2EA] relative overflow-hidden pt-7 sm:pt-9 pb-0 flex flex-col items-center justify-between border-t border-white/10 select-none z-20 mt-auto"
      // Pure black so the engraved road/carriage band (black once inverted) blends in seamlessly
      style={{ backgroundColor: '#000000' }}
    >
      {/* Centered Compact Content matching site's dark palette */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Wordmark: MXRKDXNL */}
        <h2 className="font-fraunces text-2xl sm:text-3xl font-medium tracking-tight text-white leading-none mb-2.5">
          MXRKDXNL
        </h2>

        {/* Navigation Shortcuts: Home, About, Projects, Labs, Contact */}
        <nav aria-label="Footer Navigation Shortcuts" className="w-full mb-2.5">
          <ul className="flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-4 gap-y-1.5 text-xs sm:text-sm font-medium">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <li>
                  <Link
                    to={link.href}
                    className="meridian-link px-2 py-1 text-[#D7E2EA]/85 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
                {index < navLinks.length - 1 && (
                  <li aria-hidden="true" className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0 inline-block" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Copyright Sentence: © 2026 MXRKDXNL (Mark Daniel Ferdinandaz). All information verified. */}
        <p className="font-inter text-[11px] sm:text-xs text-[#D7E2EA]/50 font-normal tracking-wide">
          © {currentYear} MXRKDXNL (Mark Daniel Ferdinandaz). All information verified.
        </p>
      </div>

      {/* Engraved road spanning the full footer, with the carriage galloping across it
          from the far left to the far right of the screen */}
      <div
        ref={roadRef}
        aria-hidden="true"
        className="relative w-full mt-2 sm:mt-3 h-[60px] sm:h-[70px] md:h-[80px] lg:h-[88px] overflow-hidden pointer-events-none select-none"
        style={{ opacity: 0.85 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/footer-road.webp)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'left bottom',
            filter: ENGRAVING_FILTER,
            mixBlendMode: 'screen',
          }}
        />
        <img
          ref={carriageRef}
          src="/images/footer-carriage.webp"
          alt=""
          draggable={false}
          className="footer-carriage absolute bottom-0 left-0 h-full w-auto max-w-none"
          style={{ filter: ENGRAVING_FILTER }}
        />
      </div>
    </footer>
  );
};
