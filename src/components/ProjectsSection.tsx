import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectItem, ProjectScreenshot } from '../data/portfolioData';

// Projects shown in the stack, in order. Everything else is behind "View remaining".
const STACK_SLUGS = [
  'ticketmaster-breach-analysis',
  'wireshark-network-analysis',
  'cs-vulnerabilities-countermeasures',
  'medsys-cloud-architecture',
  'ceylon-reads-database-design',
];

const CARD_OFFSET_PX = 18; // how far each card sits below the previous one in the stack
const IMAGE_RADIUS = 'rounded-[24px] sm:rounded-[36px] md:rounded-[44px]';

// Layout shared by the pinned heading and the pinned cards.
const NAV_HEIGHT = '5rem'; // fixed navbar (h-20)
const HEADING_SIZE = 'clamp(3.5rem, 7vw, 7rem)'; // "Projects" font size (leading-none → same height)
const HEADING_GAP = '1rem'; // space between heading and the stack
const CARD_TOP = `calc(${NAV_HEIGHT} + ${HEADING_SIZE} + ${HEADING_GAP})`;

// Image heights follow screen height as well as width so the stack fits on laptops
const TOP_IMG_H = 'clamp(90px, min(10vw, 16dvh), 230px)';
const BOTTOM_IMG_H = 'clamp(110px, min(14vw, 22dvh), 320px)';

const Shot: React.FC<{ shot: ProjectScreenshot; className?: string; style?: React.CSSProperties }> = ({
  shot,
  className = '',
  style,
}) => (
  <div style={style} className={`relative w-full overflow-hidden bg-white border border-white/5 ${IMAGE_RADIUS} ${className}`}>
    <img
      src={shot.image}
      alt={shot.title}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
    />
  </div>
);

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}

/**
 * Each card lives in its own full-height sticky slot. All slots share one parent,
 * so earlier cards stay pinned while later cards slide up and cover them.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards, progress }) => {
  const reduceMotion = useReducedMotion();

  // Shrink this card while the cards after it slide over it.
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / totalCards, 1], [1, targetScale]);

  const shots = project.screenshots ?? [];
  const hasGrid = shots.length >= 3;

  return (
    <div className="sticky top-0 h-[100dvh] flex items-start justify-center" style={{ paddingTop: CARD_TOP }}>
      <motion.article
        style={{
          scale: reduceMotion ? 1 : scale,
          top: index * CARD_OFFSET_PX,
        }}
        className="relative w-full max-w-6xl rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-7 shadow-[0_-20px_60px_rgba(0,0,0,0.7)] origin-top"
      >
        {/* Top row: number, module, name, case-study button */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6 pb-4 sm:pb-5 border-b border-white/10">
          <div className="flex items-baseline gap-3 sm:gap-5 flex-wrap min-w-0 flex-1">
            <span
              aria-hidden="true"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tight"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[#D7E2EA]/70 uppercase tracking-wider text-xs sm:text-sm font-light">
              ({project.moduleCode ?? project.category})
            </span>
            <h3 className="basis-full text-[#D7E2EA] font-medium uppercase tracking-wide text-sm sm:text-lg md:text-2xl leading-snug min-w-0">
              {project.name}
            </h3>
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-5 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors duration-200 inline-flex items-center justify-center gap-2 shrink-0 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]"
          >
            <span>Case Study</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile: one image keeps the card inside the viewport */}
        <Shot shot={shots[hasGrid ? 2 : 0]} className="md:hidden mt-4 h-[clamp(180px,34dvh,300px)]" />

        {/* md+: 40/60 grid, or one wide image when the project has fewer screenshots */}
        {hasGrid ? (
          <div className="hidden md:flex gap-5 mt-5">
            <div className="w-[40%] flex flex-col gap-5">
              <Shot shot={shots[0]} style={{ height: TOP_IMG_H }} />
              <Shot shot={shots[1]} style={{ height: BOTTOM_IMG_H }} />
            </div>
            <Shot shot={shots[2]} className="w-[60%]" />
          </div>
        ) : (
          <Shot
            shot={shots[0]}
            className="hidden md:block mt-5"
            style={{ height: `calc(${TOP_IMG_H} + ${BOTTOM_IMG_H} + 1.25rem)` }}
          />
        )}
      </motion.article>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  // Once the last card has scrolled up past the pinned heading, slide the heading off
  // to the right so it doesn't hang over the next section. Reverses when scrolling back up.
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: exitProgress } = useScroll({
    target: stackRef,
    offset: ['end 0.6', 'end 0.2'],
  });
  const headingX = useTransform(exitProgress, [0, 1], ['0vw', '110vw']);
  const headingOpacity = useTransform(exitProgress, [0, 0.7, 1], [1, 0.6, 0]);

  const projects = STACK_SLUGS.map((slug) => data.projects.find((p) => p.slug === slug)).filter(
    (p): p is ProjectItem => Boolean(p && p.screenshots && p.screenshots.length > 0)
  );
  const remaining = data.projects.length - projects.length;

  if (projects.length === 0) return null;

  return (
    <section
      data-section-id="sec-project-stack"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24"
    >
      {/* Pinned heading: stays under the navbar while the cards stack beneath it */}
      <motion.div
        className="sticky z-20 -mx-5 sm:-mx-8 md:-mx-10 px-5 sm:px-8 md:px-10 bg-[#0C0C0C] will-change-transform"
        style={{
          top: NAV_HEIGHT,
          paddingBottom: HEADING_GAP,
          x: reduceMotion ? 0 : headingX,
          opacity: headingOpacity,
        }}
      >
        <FadeIn delay={0} y={30} className="w-full text-center">
          <h2
            style={{ fontSize: HEADING_SIZE }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
          >
            Projects
          </h2>
        </FadeIn>
      </motion.div>

      {/* One shared parent: every sticky slot stays pinned until this container ends */}
      {/* Negative margin cancels the slot's top padding so card 01 sits right under the
          heading in normal flow too; heading and card 01 then pin at the same moment. */}
      <div
        ref={stackRef}
        className="relative w-full max-w-6xl mx-auto"
        style={{ marginTop: `calc(-1 * ${CARD_TOP})` }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {remaining > 0 && (
        <FadeIn delay={0} y={20} className="mt-12 sm:mt-16 flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]"
          >
            <span>
              View remaining {remaining} project{remaining === 1 ? '' : 's'}
            </span>
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      )}
    </section>
  );
};
