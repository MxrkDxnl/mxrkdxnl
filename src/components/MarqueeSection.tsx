import React, { useRef, useEffect, useState } from 'react';

const ROW_1_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const ROW_2_IMAGES = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setScrollOffset(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Row 1: tripled (11 * 3 = 33 images)
  const row1Tripled = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
  // Row 2: tripled (10 * 3 = 30 images)
  const row2Tripled = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

  // Base negative offset for row 1 so that when moving right, there is never blank space on the left
  const row1BaseShift = -2800;
  const row1X = row1BaseShift + (scrollOffset - 200);
  const row2X = -(scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves RIGHT on scroll */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-3"
            style={{
              transform: `translate3d(${row1X}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {row1Tripled.map((url, index) => (
              <div
                key={`row1-${index}`}
                className="w-[420px] h-[270px] min-w-[420px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#18181b] border border-white/5"
              >
                <img
                  src={url}
                  alt={`Portfolio showcase ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-3"
            style={{
              transform: `translate3d(${row2X}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {row2Tripled.map((url, index) => (
              <div
                key={`row2-${index}`}
                className="w-[420px] h-[270px] min-w-[420px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#18181b] border border-white/5"
              >
                <img
                  src={url}
                  alt={`Portfolio showcase ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
