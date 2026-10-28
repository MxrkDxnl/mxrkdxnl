import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface OperatorAtmosphereProps {
  children?: React.ReactNode;
  showGridLines?: boolean;
}

export const OperatorAtmosphere: React.FC<OperatorAtmosphereProps> = ({
  children,
  showGridLines = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Browser autoplay restriction handled smoothly
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#070b0a] text-[#D7E2EA] overflow-x-hidden selection:bg-[#B600A8] selection:text-white font-sans">
      {/* 1. Full-Screen HLS Video Layer (60% opacity) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />

        {/* 2. Dark linear gradient overlay from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/75 to-transparent" />

        {/* Bottom-up dark gradient for deep contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/40 to-transparent" />

        {/* 3. Large horizontal SVG ellipse glow in center-top area with cyan/violet hue & 25px blur */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[880px] h-[400px] pointer-events-none overflow-visible flex justify-center items-start">
          <svg viewBox="0 0 880 400" className="w-full h-full blur-[25px] opacity-60">
            <ellipse cx="440" cy="120" rx="420" ry="160" fill="url(#opAtmosphereGlow)" />
            <defs>
              <radialGradient id="opAtmosphereGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.75" />
                <stop offset="40%" stopColor="#7928ca" stopOpacity="0.55" />
                <stop offset="80%" stopColor="#0d1117" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#070b0a" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 4. Architectural Grid Lines: three thin vertical grid lines at 25%, 50%, and 75% on desktop */}
      {showGridLines && (
        <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
          <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10" />
          <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/10" />
          <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/10" />
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-20 w-full min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
