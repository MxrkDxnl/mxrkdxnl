import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};

/**
 * Character-by-character scroll reveal: each character fades from 0.2 to 1 opacity
 * as the paragraph scrolls through the viewport. Screen readers get the plain text
 * once; reduced-motion users get the plain text fully visible.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  if (reduceMotion) {
    return (
      <p ref={containerRef} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const wordChars = word.split('');
          const wordStartIndex = charCounter;
          charCounter += word.length + 1; // +1 for the following space

          return (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {wordChars.map((char, i) => {
                const start = (wordStartIndex + i) / totalChars;
                const end = Math.min(1, start + 1 / totalChars);
                return (
                  <Character key={i} char={char} progress={scrollYProgress} range={[start, end]} />
                );
              })}
              {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </p>
  );
};
