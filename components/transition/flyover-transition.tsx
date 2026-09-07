'use client';

import { useEffect, useRef, useState } from 'react';
import { useThemeStore } from '@/lib/theme-store';

interface FlyoverTransitionProps {
  isActive: boolean;
  userName?: string;
  onFinished: () => void;
}

export function FlyoverTransition({ isActive, userName, onFinished }: FlyoverTransitionProps) {
  const { theme, hydrated } = useThemeStore();
  const [stage, setStage] = useState<'idle' | 'wipe' | 'reveal'>('idle');
  const isSpace = !hydrated || theme === 'space';
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const t1 = setTimeout(() => setStage('wipe'), 50);
    const t2 = setTimeout(() => setStage('reveal'), 1800);
    const t3 = setTimeout(() => { setStage('idle'); onFinished(); }, 2200);
    timers.current = [t1, t2, t3];

    return () => timers.current.forEach(clearTimeout);
  }, [isActive, onFinished]);

  if (stage === 'idle') return null;

  return (
    <div className={`flyover-root ${stage === 'reveal' ? 'is-revealing' : 'is-wiping'}`}>
      {/* Overlay background */}
      <div className={`flyover-backdrop ${isSpace ? 'flyover-backdrop-space' : 'flyover-backdrop-sky'}`} />

      {/* Teaser text (fades out before wipe peaks) */}
      <div className="flyover-text">
        <p className="flyover-label">
          {isSpace ? 'MELUNCURKAN ROKET' : 'PENERBANGAN DIMULAI'}
        </p>
        <h2 className="flyover-title">
          {userName ? `Semangat, ${userName}` : 'Menuju Ruang Belajar'}
        </h2>
        <p className="flyover-sub">
          {isSpace
            ? 'Menembus batas angkasa untuk taklukkan soal'
            : 'Terbang tinggi meraih prestasi impian'}
        </p>
      </div>

      {/* SPACE: Rocket wipes from bottom-left to top-right */}
      {isSpace && (
        <div className="flyover-craft">
          {/* Engine flame trail — grows to fill screen */}
          <div className="rocket-exhaust">
            <span className="exhaust-core" />
            <span className="exhaust-mid" />
            <span className="exhaust-outer" />
          </div>

          {/* Rocket body */}
          <svg viewBox="0 0 120 120" className="rocket-svg">
            <path
              d="M100 60 C100 50 70 34 42 36 C36 36 30 40 24 46 L18 40 L14 52 L24 60 L14 68 L18 62 L24 56 C30 62 36 66 42 66 C70 68 100 70 100 60 Z"
              fill="#e2e8f0"
              stroke="#67e8f9"
              strokeWidth="2.5"
            />
            <ellipse cx="78" cy="60" rx="8" ry="6" fill="#38bdf8" />
            <path d="M48 36 L28 18 L34 38 Z" fill="#3b82f6" />
            <path d="M48 84 L28 102 L34 82 Z" fill="#3b82f6" />
            <path d="M86 52 Q95 60 86 68" stroke="#f43f5e" strokeWidth="4" fill="none" />
          </svg>
        </div>
      )}

      {/* SKY: Airplane wipes from left to right with vapor trail */}
      {!isSpace && (
        <div className="flyover-craft flyover-craft-sky">
          {/* Vapor trail — grows to fill screen */}
          <div className="plane-vapor">
            <span className="vapor-core" />
            <span className="vapor-mid" />
            <span className="vapor-outer" />
            <span className="vapor-far" />
          </div>

          {/* Airplane body */}
          <svg viewBox="0 0 140 90" className="plane-svg">
            <path
              d="M125 45 C125 38 100 30 55 32 C32 33 16 36 6 40 C5 41 5 49 6 50 C16 54 32 57 55 58 C100 60 125 52 125 45 Z"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            <path d="M108 42 Q118 45 108 48 Z" fill="#0ea5e9" />
            <path d="M18 38 L6 14 L30 36 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M72 45 L44 78 L56 78 L88 45 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <rect x="58" y="56" width="16" height="7" rx="3.5" fill="#f59e0b" />
          </svg>
        </div>
      )}
    </div>
  );
}
