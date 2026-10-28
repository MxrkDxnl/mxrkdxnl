import React from 'react';
import { motion } from 'framer-motion';

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  blur?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  amount?: number | 'some' | 'all';
  margin?: string;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 30,
  scale = 1,
  blur = 0,
  className = '',
  as = 'div',
  style,
  amount = 0.15,
  margin = '-40px 0px',
  once = true,
}) => {
  const MotionTag = React.useMemo(() => {
    if (typeof (motion as any).create === 'function') {
      return (motion as any).create(as);
    }
    return (motion as any)[as] || motion.div;
  }, [as]);

  const initialProps: any = { opacity: 0, x, y };
  const animateProps: any = { opacity: 1, x: 0, y: 0 };

  if (scale !== 1) {
    initialProps.scale = scale;
    animateProps.scale = 1;
  }

  if (blur > 0) {
    initialProps.filter = `blur(${blur}px)`;
    animateProps.filter = 'blur(0px)';
  }

  // On small mobile viewports, soften negative margins so items animate into view reliably
  const effectiveMargin = React.useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return '0px';
    }
    return margin;
  }, [margin]);

  const effectiveAmount = React.useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return typeof amount === 'number' ? Math.min(amount, 0.1) : 'some';
    }
    return amount;
  }, [amount]);

  return (
    <MotionTag
      initial={initialProps}
      whileInView={animateProps}
      viewport={{ once, margin: effectiveMargin, amount: effectiveAmount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
};
