import React, { useRef, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
  enableGyro?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  className = '',
  style,
  enableGyro = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Real-time animation coordinates (lerped via requestAnimationFrame for zero-lag 60/120fps motion)
  const currentPos = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const targetPos = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const baselineBetaRef = useRef<number | null>(null);
  const gyroActiveRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // 1. Butter-smooth render loop using requestAnimationFrame
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const lerp = 0.14; // smooth exponential dampening
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
      currentPos.current.rotateX += (targetPos.current.rotateX - currentPos.current.rotateX) * lerp;
      currentPos.current.rotateY += (targetPos.current.rotateY - currentPos.current.rotateY) * lerp;

      if (ref.current) {
        const { x, y, rotateX, rotateY } = currentPos.current;
        ref.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 2. Hardware Gyroscope & Orientation Handler
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma === null && e.beta === null) return;

    gyroActiveRef.current = true;

    // gamma: left-to-right tilt [-90, 90]
    // beta: front-to-back tilt [-180, 180]
    const gamma = e.gamma ?? 0;
    const beta = e.beta ?? 48;

    // Dynamic posture calibration: gently drift baseline to whatever angle user comfortably holds phone
    if (baselineBetaRef.current === null) {
      baselineBetaRef.current = beta;
    } else {
      baselineBetaRef.current += (beta - baselineBetaRef.current) * 0.018;
    }

    const clampedGamma = Math.max(-28, Math.min(28, gamma));
    const deltaBeta = Math.max(-22, Math.min(22, beta - baselineBetaRef.current));

    // Target displacement (px) & 3D rotation (deg)
    targetPos.current.x = (clampedGamma / 28) * 24;
    targetPos.current.y = (deltaBeta / 22) * 20;
    targetPos.current.rotateY = (clampedGamma / 28) * 15;
    targetPos.current.rotateX = -(deltaBeta / 22) * 12;
  }, []);

  // Request Gyroscope Permission (iOS 13+ requirement)
  const requestGyro = useCallback(async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      try {
        const state = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (state === 'granted') {
          window.removeEventListener('deviceorientation', handleOrientation);
          window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        }
      } catch {
        // User dismissed prompt or not in user gesture
      }
    } else if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      // Android / desktop browsers without explicit permission gating
      window.removeEventListener('deviceorientation', handleOrientation);
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }
  }, [handleOrientation]);

  // Setup Gyroscope & Event Listeners
  useEffect(() => {
    if (!enableGyro) return;

    // Android & standard browsers connect immediately
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission !== 'function'
    ) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // iOS Safari requires a user gesture trigger to unlock sensors
    const onUserInteraction = () => {
      requestGyro();
    };

    window.addEventListener('touchend', onUserInteraction, { passive: true, once: true });
    window.addEventListener('click', onUserInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('touchend', onUserInteraction);
      window.removeEventListener('click', onUserInteraction);
    };
  }, [enableGyro, handleOrientation, requestGyro]);

  // 3. Desktop Mouse / Pointer Handler (Touch scrolling explicitly ignored so it never conflicts with gyro)
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      // Explicitly ignore touch inputs (finger dragging for page scroll must NOT hijack the head)
      if ('pointerType' in e && e.pointerType === 'touch') return;
      if (gyroActiveRef.current) return;
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const isNear =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isNear) {
        const dx = (e.clientX - centerX) / strength;
        const dy = (e.clientY - centerY) / strength;

        targetPos.current.x = dx;
        targetPos.current.y = dy;
        targetPos.current.rotateY = Math.max(-14, Math.min(14, (dx / 35) * 8));
        targetPos.current.rotateX = Math.max(-12, Math.min(12, -(dy / 35) * 8));
      } else {
        targetPos.current.x = 0;
        targetPos.current.y = 0;
        targetPos.current.rotateX = 0;
        targetPos.current.rotateY = 0;
      }
    };

    const handlePointerLeave = () => {
      if (!gyroActiveRef.current) {
        targetPos.current.x = 0;
        targetPos.current.y = 0;
        targetPos.current.rotateX = 0;
        targetPos.current.rotateY = 0;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [padding, strength]);

  // Tap avatar directly to recalibrate holding posture & activate iOS gyro prompt
  const handleTapAvatar = () => {
    baselineBetaRef.current = null;
    requestGyro();
  };

  return (
    <div
      ref={ref}
      onClick={handleTapAvatar}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        perspective: 1000,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
