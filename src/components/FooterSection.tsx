import React from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-10 py-16 sm:py-24 border-t border-white/10 relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <FadeIn delay={0} y={20}>
              <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-medium block mb-3">
                Let&apos;s Create Together
              </span>
              <h2 className="hero-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none">
                Start a Project
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} y={20}>
            <ContactButton onClick={onOpenContact} label="Contact Me" />
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5 text-sm sm:text-base">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">Location</h4>
            <p className="font-light">London, UK & Worldwide (Remote)</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">Direct Email</h4>
            <a
              href="mailto:jack3d@creator.studio"
              className="font-light hover:text-white transition-colors flex items-center gap-1 group"
            >
              jack3d@creator.studio
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">Socials</h4>
            <div className="flex flex-col gap-1.5 font-light">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                Twitter / X <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                Instagram <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://artstation.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                ArtStation <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between items-start sm:items-end">
            <button
              onClick={scrollToTop}
              className="text-xs uppercase tracking-widest text-[#D7E2EA] hover:text-white border border-white/20 rounded-full px-5 py-2.5 transition-all hover:border-white hover:bg-white/5"
            >
              Back to Top ↑
            </button>
            <p className="text-xs text-white/40 font-light mt-4 sm:mt-0">
              © {new Date().getFullYear()} Jack. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
