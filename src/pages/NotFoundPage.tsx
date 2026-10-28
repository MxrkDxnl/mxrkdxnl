import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-32 bg-[#0C0C0C]">
      <FadeIn delay={0} y={20} className="max-w-md mx-auto text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
          <ShieldAlert size={36} />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-2">
          HTTP 404 — Not Found
        </span>
        <h1 className="hero-heading text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
          Route Not Found
        </h1>
        <p className="text-sm text-[#D7E2EA]/70 font-light mb-8 leading-relaxed">
          The requested page does not exist or has been relocated within Mark Daniel&apos;s portfolio.
        </p>

        <Link
          to="/"
          className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 min-h-[44px] text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
          style={{
            background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
            outline: '2px solid #FFFFFF',
            outlineOffset: '-3px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Return Home</span>
        </Link>
      </FadeIn>
    </div>
  );
};
