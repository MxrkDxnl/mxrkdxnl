import React from 'react';
import { Mail, Globe } from 'lucide-react';

interface SocialLogoProps {
  name: string;
}

export const SocialLogo: React.FC<SocialLogoProps> = ({ name }) => {
  const normalized = name.toLowerCase();

  if (normalized.includes('github')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('linkedin')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            d="M7.09 9.38H4.66v7.76h2.43V9.38zm-1.22-3.8c-.78 0-1.41.63-1.41 1.41 0 .78.63 1.41 1.41 1.41.78 0 1.41-.63 1.41-1.41 0-.78-.63-1.41-1.41-1.41zm13.47 6.01c0-2.48-1.32-3.63-3.09-3.63-1.43 0-2.07.79-2.43 1.34V9.38h-2.43c.03.69 0 7.76 0 7.76h2.43v-4.33c0-.23.02-.46.08-.63.19-.46.61-.94 1.32-.94.93 0 1.3 1.07 1.3 2.64v3.26h2.43V11.59z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('discord')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/40 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <rect width="24" height="24" rx="5" fill="#5865F2" />
          <path
            d="M17.44 6.78a13.3 13.3 0 00-3.3-1.02.05.05 0 00-.05.02c-.14.26-.3.59-.41.85-1.25-.19-2.5-.19-3.73 0-.11-.26-.28-.59-.42-.85a.05.05 0 00-.05-.02c-1.14.2-2.25.55-3.3 1.02-.01 0-.02.01-.03.02-2.13 3.19-2.71 6.3-2.42 9.37 0 .01.01.03.02.04 1.41 1.03 2.77 1.66 4.1 2.07.02 0 .04 0 .05-.02.32-.43.6-.89.84-1.38.01-.03 0-.06-.03-.07-.49-.18-.95-.41-1.39-.68-.03-.02-.03-.06 0-.08.09-.07.19-.14.28-.21.02-.01.04-.01.05 0 2.7 1.23 5.62 1.23 8.28 0 .02-.01.04-.01.05 0 .09.07.19.14.28.21.03.02.03.06 0 .08-.44.27-.9.5-1.39.68-.03.01-.04.04-.03.07.24.49.52.95.84 1.38.01.02.03.02.05.02 1.34-.41 2.7-1.04 4.11-2.07.01-.01.02-.03.02-.04.35-3.56-.6-6.64-2.43-9.37-.01-.01-.02-.02-.03-.02zM9.47 14.33c-.8 0-1.46-.74-1.46-1.64 0-.91.64-1.65 1.46-1.65.82 0 1.48.75 1.46 1.65 0 .9-.64 1.64-1.46 1.64zm5.06 0c-.8 0-1.46-.74-1.46-1.64 0-.91.64-1.65 1.46-1.65.82 0 1.48.75 1.46 1.65 0 .9-.64 1.64-1.46 1.64z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('signal')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#3A76F0]/15 border border-[#3A76F0]/40 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <rect width="24" height="24" rx="5" fill="#3A76F0" />
          <path
            d="M12 4C7.58 4 4 7.58 4 12c0 1.54.44 2.98 1.2 4.2L4.2 20.2l4.13-1.04A7.95 7.95 0 0012 20c4.42 0 8-3.58 8-8s-3.58-8-8-8zm0 1.6c3.53 0 6.4 2.87 6.4 6.4 0 3.53-2.87 6.4-6.4 6.4-.97 0-1.9-.22-2.74-.62l-.4-.19-2.3.58.6-2.23-.2-.4A6.36 6.36 0 015.6 12c0-3.53 2.87-6.4 6.4-6.4z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('twitter') || normalized === 'x' || normalized.includes('x (')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('instagram')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#fd5949]/20 via-[#d6249f]/20 to-[#285AEB]/20 border border-[#d6249f]/40 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <defs>
            <radialGradient id="ig-grad-social" cx="30%" cy="107%" r="130%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad-social)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="15.8" cy="8.2" r="0.8" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('facebook') || normalized.includes('fb')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/40 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
          <rect width="24" height="24" rx="5" fill="#1877F2" />
          <path
            d="M16.5 12h-3v8h-3.2v-8h-2V9.3h2V7.4c0-2.3 1.4-3.4 3.4-3.4 1 0 1.9.1 2.1.1v2.5h-1.4c-1.1 0-1.3.5-1.3 1.3v1.4h2.7l-.3 2.7z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#BBCCD7]">
      <Globe size={16} />
    </div>
  );
};

interface InboxLogoProps {
  label: string;
  address?: string;
}

export const InboxLogo: React.FC<InboxLogoProps> = ({ label, address }) => {
  const normalized = (label + ' ' + (address || '')).toLowerCase();

  // 1. SquirrelMail (matches squirrelmail or .onion)
  if (normalized.includes('squirrel') || normalized.includes('.onion') || normalized.includes('morke.ru')) {
    return (
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md border border-white/30">
        <img
          src="/logos/squirrelmail-logo.png"
          alt="SquirrelMail"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // 2. Gmail
  if (normalized.includes('gmail')) {
    return (
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-white/15 p-1.5 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#4285F4" d="M3 6.5v11c0 .83.67 1.5 1.5 1.5h2.5V11.2L3 7.8v-.3z" />
          <path fill="#34A853" d="M17 19h2.5c.83 0 1.5-.67 1.5-1.5v-11l-4 3.4V19z" />
          <path fill="#EA4335" d="M17 6.5l-5 4-5-4V6c0-1.25 1.37-2 2.37-1.24L12 6.7l2.63-1.94C15.63 4 17 4.75 17 6v.5z" />
          <path fill="#FBBC04" d="M7 11.2V6.5L3 6.5v1.3l4 3.4z" />
          <path fill="#EA4335" d="M17 6.5v4.7l4-3.4V6.5h-4z" />
        </svg>
      </div>
    );
  }

  // 3. Hotmail / Outlook
  if (normalized.includes('hotmail') || normalized.includes('outlook')) {
    return (
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0078D4]/15 border border-[#0078D4]/35 p-1 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect width="24" height="24" rx="5" fill="#0078D4" />
          <path d="M4 8.5C4 7.67 4.67 7 5.5 7h13c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-7z" fill="#005A9E" />
          <path d="M4.5 7.5l7.5 5 7.5-5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="3.5" y="8" width="8" height="9" rx="1.5" fill="#0078D4" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="7.5" y="14.5" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">O</text>
        </svg>
      </div>
    );
  }

  // 4. Primary Domain Email (MXRKDXNL.com)
  return (
    <div
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md border border-white/20"
      style={{
        background: 'linear-gradient(135deg, #18011F 0%, #B600A8 50%, #7621B0 100%)',
      }}
    >
      <Mail className="w-5 h-5 text-white" />
    </div>
  );
};
