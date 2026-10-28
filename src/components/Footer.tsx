import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    if (videoRef.current) {
      if (mediaQuery.matches) {
        videoRef.current.autoplay = false;
        videoRef.current.pause();
      } else {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (videoRef.current) {
        if (e.matches) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
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
      className="w-full bg-[#0C0C0C] text-[#D7E2EA] relative overflow-hidden pt-7 sm:pt-9 pb-0 flex flex-col items-center justify-between border-t border-white/10 select-none z-20 mt-auto"
      style={{ backgroundColor: '#0C0C0C' }}
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

      {/* Engraved illustration video - Sized to normal proportion and centered, framed purely on the horse cart */}
      <div className="w-full relative mt-2 sm:mt-3 flex justify-center pointer-events-none select-none overflow-hidden">
        <div className="w-full h-[100px] sm:h-[115px] md:h-[130px] lg:h-[140px] relative overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay={!isReducedMotion}
            loop
            muted
            playsInline
            preload="auto"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144832_2b6b23aa-4416-4fcb-9df4-132349c59edc.mp4"
            className="w-full h-full object-cover scale-[0.62] sm:scale-[0.56] md:scale-[0.50] lg:scale-[0.46]"
            style={{
              filter: 'invert(1) brightness(0.85) contrast(1.15)',
              mixBlendMode: 'screen',
              objectPosition: '50% 52%',
              opacity: 0.85,
            }}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </div>
    </footer>
  );
};
