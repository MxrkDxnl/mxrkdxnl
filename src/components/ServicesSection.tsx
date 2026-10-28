import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      {/* Heading: Services */}
      <FadeIn delay={0} y={30} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
        <h2
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center select-none"
        >
          Services
        </h2>
      </FadeIn>

      {/* 5 Service items */}
      <div className="max-w-5xl mx-auto flex flex-col">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] first:border-t group hover:pl-2 transition-all duration-300">
              {/* Number on left */}
              <div className="shrink-0 w-full md:w-[220px] lg:w-[280px]">
                <span
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                  className="font-black text-[#0C0C0C] leading-none select-none tracking-tighter"
                >
                  {service.number}
                </span>
              </div>

              {/* Name + description stacked vertically on the right */}
              <div className="flex flex-col mt-4 md:mt-0 flex-1">
                <h3
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  className="font-medium uppercase text-[#0C0C0C] tracking-wide mb-2 sm:mb-3"
                >
                  {service.name}
                </h3>
                <p
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  className="font-light text-[#0C0C0C] opacity-60 leading-relaxed max-w-2xl"
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
