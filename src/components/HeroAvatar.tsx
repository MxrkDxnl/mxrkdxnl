import React, { useEffect, useRef } from 'react';
import faceLayer from '../assets/avatar/face.webp';
import irisLeft from '../assets/avatar/iris-left.webp';
import irisRight from '../assets/avatar/iris-right.webp';

/*
 * Eye-tracking avatar rig, built by scripts/build-eye-rig.py from mark-portrait.png:
 *   back  → eyeball (sclera) + iris sprites that slide toward the cursor
 *   front → the face with the eye openings cut out, so the eyelids clip the irises
 * All coordinates are in the source image's pixel space (764 × 1024).
 */
const IMG_W = 764;
const IMG_H = 1024;

const MAX_LOOK_X = 8; // px (source image space) the iris can travel sideways
const MAX_LOOK_Y = 3; // px up/down — eyelids leave little vertical room
const FULL_LOOK_DISTANCE = 260; // screen px from the eyes at which the gaze is at full strength

interface EyeSpec {
  key: string;
  src: string;
  sprite: { x: number; y: number; size: number }; // top-left + size of the iris sprite
  socket: { x0: number; y0: number; x1: number; y1: number }; // eyeball area behind the face
}

const EYES: EyeSpec[] = [
  {
    key: 'left',
    src: irisLeft,
    sprite: { x: 315, y: 490, size: 60 },
    socket: { x0: 268, y0: 482, x1: 406, y1: 558 },
  },
  {
    key: 'right',
    src: irisRight,
    sprite: { x: 500, y: 490, size: 60 },
    socket: { x0: 484, y0: 484, x1: 594, y1: 558 },
  },
];

// Midpoint between the irises, used as the gaze origin
const EYES_MID_X = 438 / IMG_W;
const EYES_MID_Y = 520 / IMG_H;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

interface HeroAvatarProps {
  alt: string;
  className?: string;
}

export const HeroAvatar: React.FC<HeroAvatarProps> = ({ alt, className = '' }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const irisRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const render = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      // translate in % of the sprite's own size so it scales with the avatar
      const tx = (current.x / EYES[0].sprite.size) * 100;
      const ty = (current.y / EYES[0].sprite.size) * 100;
      for (const iris of irisRefs.current) {
        if (iris) iris.style.transform = `translate3d(${tx.toFixed(2)}%, ${ty.toFixed(2)}%, 0)`;
      }
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = root.getBoundingClientRect();
      const ex = rect.left + rect.width * EYES_MID_X;
      const ey = rect.top + rect.height * EYES_MID_Y;
      const vx = e.clientX - ex;
      const vy = e.clientY - ey;
      const dist = Math.hypot(vx, vy) || 1;
      const strength = Math.min(1, dist / FULL_LOOK_DISTANCE);
      target.x = (vx / dist) * strength * MAX_LOOK_X;
      target.y = (vy / dist) * strength * MAX_LOOK_Y;
      kick();
    };
    const recenter = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', recenter);
    window.addEventListener('blur', recenter);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', recenter);
      window.removeEventListener('blur', recenter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative w-full select-none pointer-events-none drop-shadow-2xl ${className}`}
      style={{ aspectRatio: `${IMG_W} / ${IMG_H}` }}
    >
      {/* Back layer: eyeballs + irises */}
      {EYES.map((eye, i) => (
        <React.Fragment key={eye.key}>
          <div
            aria-hidden="true"
            className="absolute rounded-[50%]"
            style={{
              left: pct(eye.socket.x0, IMG_W),
              top: pct(eye.socket.y0, IMG_H),
              width: pct(eye.socket.x1 - eye.socket.x0, IMG_W),
              height: pct(eye.socket.y1 - eye.socket.y0, IMG_H),
              background:
                'linear-gradient(to bottom, rgba(70, 35, 20, 0.35) 0%, rgba(70, 35, 20, 0) 40%), radial-gradient(ellipse at 50% 55%, #e6d8ca 0%, #d9c9ba 55%, #b8a394 100%)',
            }}
          />
          <img
            ref={(el) => {
              irisRefs.current[i] = el;
            }}
            src={eye.src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute will-change-transform"
            style={{
              left: pct(eye.sprite.x, IMG_W),
              top: pct(eye.sprite.y, IMG_H),
              width: pct(eye.sprite.size, IMG_W),
              height: pct(eye.sprite.size, IMG_H),
            }}
          />
        </React.Fragment>
      ))}

      {/* Front layer: the face with transparent eye openings */}
      <img
        src={faceLayer}
        alt={alt}
        draggable={false}
        className="relative w-full h-full object-contain"
      />
    </div>
  );
};
