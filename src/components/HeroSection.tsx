import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import jackPortrait from '../assets/jack-portrait.jpg';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full z-20">
        <div className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('services');
            }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Price
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('projects');
            }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenContact) {
                onOpenContact();
              } else {
                scrollTo('contact');
              }
            }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Contact
          </a>
        </div>
      </FadeIn>

      {/* Hero Heading */}
      <div className="w-full overflow-hidden flex items-center justify-center z-10 my-auto">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      {/* Centered Hero Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <div className="relative w-full flex justify-center">
              {/* Subtle back ambient glow matching brand colors */}
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#7621B0]/25 via-[#B600A8]/15 to-transparent blur-3xl transform scale-95" />
              <img
                src={jackPortrait}
                alt="Jack - 3D Creator Portrait"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                style={{
                  maskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 62%, transparent 95%)',
                }}
                draggable={false}
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton
            onClick={onOpenContact ? onOpenContact : () => scrollTo('contact')}
          />
        </FadeIn>
      </div>
    </section>
  );
};
