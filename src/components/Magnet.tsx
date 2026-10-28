import React, { useRef, useEffect, useState, useCallback } from 'react';

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
  activeTransition = 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)',
  inactiveTransition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
  className = '',
  style,
  enableGyro = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isActive, setIsActive] = useState(false);
  const initialBetaRef = useRef<number | null>(null);
  const gyroActiveRef = useRef(false);

  // 1. DeviceOrientation / Gyroscope Handler for Mobile
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma === null && e.beta === null) return;

    gyroActiveRef.current = true;

    // gamma: left-to-right tilt in degrees [-90, 90]
    // beta: front-to-back tilt in degrees [-180, 180]
    const gamma = e.gamma ?? 0;
    const beta = e.beta ?? 50;

    // Calibrate baseline holding angle on first reading
    if (initialBetaRef.current === null && e.beta !== null) {
      initialBetaRef.current = e.beta;
    }
    const baselineBeta = initialBetaRef.current ?? 50;

    // Clamped angles for natural hand tilt ranges
    const clampedGamma = Math.max(-30, Math.min(30, gamma));
    const deltaBeta = Math.max(-25, Math.min(25, beta - baselineBeta));

    // Map to translation displacement (pixels)
    const maxOffset = 26;
    const dx = (clampedGamma / 30) * maxOffset;
    const dy = (deltaBeta / 25) * maxOffset;

    // Map to subtle 3D rotation (degrees)
    const rotY = (clampedGamma / 30) * 12;
    const rotX = -(deltaBeta / 25) * 10;

    setPosition({ x: dx, y: dy, rotateX: rotX, rotateY: rotY });
    setIsActive(true);
  }, []);

  // Request Gyroscope Permission (required on iOS 13+)
  const requestGyro = useCallback(async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      try {
        const state = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (state === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        }
      } catch {
        // Permission dismissed or error
      }
    }
  }, [handleOrientation]);

  // Setup Gyroscope & Event Listeners
  useEffect(() => {
    if (!enableGyro) return;

    // Direct listener for Android & browsers that don't require explicit permission
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission !== 'function'
    ) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // iOS 13+ requires user gesture to trigger requestPermission
    const onFirstUserGesture = () => {
      requestGyro();
    };

    window.addEventListener('touchstart', onFirstUserGesture, { passive: true, once: true });
    window.addEventListener('click', onFirstUserGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('touchstart', onFirstUserGesture);
      window.removeEventListener('click', onFirstUserGesture);
    };
  }, [enableGyro, handleOrientation, requestGyro]);

  // 2. Mouse / Pointer / Touch Handler for Desktop & DevTools emulation
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      // If actively receiving real hardware gyroscope tilt, let gyro take precedence
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

        // Subtle 3D rotation looking towards pointer
        const rotY = Math.max(-14, Math.min(14, (dx / 35) * 8));
        const rotX = Math.max(-12, Math.min(12, -(dy / 35) * 8));

        setPosition({ x: dx, y: dy, rotateX: rotX, rotateY: rotY });
        setIsActive(true);
      } else {
        if (isActive) {
          setPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
          setIsActive(false);
        }
      }
    };

    const handlePointerLeave = () => {
      if (!gyroActiveRef.current) {
        setPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
        setIsActive(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [padding, strength, isActive]);

  // Tapping the avatar re-centers the gyro calibration baseline
  const handleResetCalibration = () => {
    initialBetaRef.current = null;
    requestGyro();
  };

  return (
    <div
      ref={ref}
      onClick={handleResetCalibration}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) rotateX(${position.rotateX}deg) rotateY(${position.rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
        perspective: 1000,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
