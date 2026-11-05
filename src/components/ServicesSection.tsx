import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { usePortfolio } from '../context/PortfolioContext';

const TITLE_MS_PER_CHAR = 45;
const DESC_MS_PER_CHAR = 14;

interface TypedTextProps {
  text: string;
  active: boolean;
  instant: boolean;
  msPerChar: number;
  onDone?: () => void;
  as?: 'h3' | 'p';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Typewriter text. The full text is laid out invisibly underneath so the block
 * never changes size while typing; screen readers get the full text once.
 */
const TypedText: React.FC<TypedTextProps> = ({
  text,
  active,
  instant,
  msPerChar,
  onDone,
  as: Tag = 'p',
  className = '',
  style,
}) => {
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const visibleCount = instant ? text.length : count;
  const isTyping = active && !instant && count < text.length;

  useEffect(() => {
    if (!active || instant) return;
    if (count >= text.length) {
      onDoneRef.current?.();
      return;
    }
    const timer = window.setTimeout(() => setCount((c) => c + 1), msPerChar);
    return () => window.clearTimeout(timer);
  }, [active, instant, count, text.length, msPerChar]);

  return (
    <Tag className={`relative ${className}`} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, visibleCount)}
        {isTyping && <span className="type-caret" />}
      </span>
    </Tag>
  );
};

interface WorkItemProps {
  index: number;
  title: string;
  description: string;
}

const WorkItem: React.FC<WorkItemProps> = ({ index, title, description }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // 0 → row just entering the bottom of the screen, 1 → row 60% up the screen
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.95', 'start 0.6'],
  });
  const numberX = useTransform(scrollYProgress, [0, 1], ['-70vw', '0vw']);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1]);

  // Typing starts once the number has landed, and only ever plays once
  const [typingStarted, setTypingStarted] = useState(false);
  const [titleDone, setTitleDone] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.98) setTypingStarted(true);
  });
  useEffect(() => {
    // Covers loading the page already scrolled past this row (checked after layout)
    const frame = requestAnimationFrame(() => {
      if (scrollYProgress.get() >= 0.98) setTypingStarted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress]);

  return (
    <div
      ref={rowRef}
      className={`flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] ${
        index === 0 ? 'border-t' : ''
      }`}
    >
      <div className="shrink-0 w-full md:w-[220px] lg:w-[280px]">
        <motion.span
          aria-hidden="true"
          style={{
            fontSize: 'clamp(3rem, 10vw, 140px)',
            x: reduceMotion ? 0 : numberX,
            opacity: reduceMotion ? 1 : numberOpacity,
          }}
          className="inline-block font-black text-[#0C0C0C] leading-none select-none tracking-tighter will-change-transform"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      <div className="flex flex-col mt-4 md:mt-0 flex-1">
        <TypedText
          as="h3"
          text={title}
          active={typingStarted}
          instant={reduceMotion}
          msPerChar={TITLE_MS_PER_CHAR}
          onDone={() => setTitleDone(true)}
          style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
          className="font-medium uppercase text-[#0C0C0C] tracking-wide mb-2 sm:mb-3"
        />
        <TypedText
          text={description}
          active={titleDone}
          instant={reduceMotion}
          msPerChar={DESC_MS_PER_CHAR}
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
          className="font-light text-[#0C0C0C]/60 leading-relaxed max-w-2xl"
        />
      </div>
    </div>
  );
};

/**
 * White, numbered "How I Work" list. Numbers slide in from the left with scroll,
 * then each title and description types itself out.
 */
export const ServicesSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section
      data-section-id="sec-how-i-work"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <FadeIn delay={0} y={30} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
        <h2
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center select-none"
        >
          How I Work
        </h2>
      </FadeIn>

      <ol className="max-w-5xl mx-auto flex flex-col">
        {data.howIWork.map((item, i) => (
          <li key={item.title}>
            <WorkItem index={i} title={item.title} description={item.description} />
          </li>
        ))}
      </ol>
    </section>
  );
};
