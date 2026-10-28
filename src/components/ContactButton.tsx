import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  href,
  className = '',
  label = 'Contact Me',
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid #FFFFFF',
    outlineOffset: '-3px',
  };

  const content = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={buttonStyle}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer select-none transition-all duration-200 active:brightness-95 flex items-center justify-center ${className}`}
    >
      {label}
    </motion.button>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`inline-block no-underline ${className.includes('w-full') ? 'w-full' : ''}`}
      >
        {content}
      </a>
    );
  }

  return content;
};
