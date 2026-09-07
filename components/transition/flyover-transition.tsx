'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/lib/theme-store';

interface FlyoverTransitionProps {
  isActive: boolean;
  userName?: string;
  onFinished: () => void;
}

export function FlyoverTransition({ isActive, userName, onFinished }: FlyoverTransitionProps) {
  const { theme, hydrated } = useThemeStore();
  const [stage, setStage] = useState<'idle' | 'flying' | 'fading'>('idle');

  const isSpace = !hydrated || theme === 'space';

  useEffect(() => {
    if (!isActive) return;

    let timerFade: ReturnType<typeof setTimeout>;
    let timerFinish: ReturnType<typeof setTimeout>;

    const timerFly = setTimeout(() => {
      setStage('flying');

      timerFade = setTimeout(() => {
        setStage('fading');
        timerFinish = setTimeout(() => {
          setStage('idle');
          onFinished();
        }, 400);
      }, 1400);
    }, 10);

    return () => {
      clearTimeout(timerFly);
      clearTimeout(timerFade);
      clearTimeout(timerFinish);
    };
  }, [isActive, onFinished]);

  if (stage === 'idle') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${
        stage === 'fading' ? 'opacity-0' : 'opacity-100'
      } ${
        isSpace
          ? 'bg-black/85 backdrop-blur-md'
          : 'bg-sky-950/20 backdrop-blur-md'
      }`}
    >
      {/* Animated Text Banner */}
      <div className="text-center z-10 animate-fadeIn mb-8 px-4">
        <p className="text-xs uppercase tracking-widest text-accent font-bold mb-1">
          {isSpace ? '✦ MELUNCURKAN ROKET ✦' : '✈ PENERBANGAN DIMULAI ✈'}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
          {userName ? `Semangat, ${userName}! ✨` : 'Menuju Ruang Belajar...'}
        </h2>
        <p className="text-xs text-white/70 mt-1">
          {isSpace ? 'Menembus batas angkasa untuk taklukkan soal' : 'Terbang tinggi meraih prestasi impian'}
        </p>
      </div>

      {/* Craft Animation Container */}
      <div className="absolute inset-0 overflow-hidden">
        {isSpace ? (
          /* SPACE MODE: Rocket launching across screen */
          <div className="absolute animate-rocketFly w-32 h-32 flex items-center justify-center">
            {/* Rocket Thruster Flame */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center">
              <div className="w-16 h-4 bg-gradient-to-l from-orange-500 via-amber-400 to-transparent rounded-full blur-[2px] animate-pulse" />
              <div className="w-8 h-2 bg-gradient-to-l from-yellow-200 to-transparent rounded-full blur-[1px] -ml-12" />
            </div>

            {/* Sci-Fi Rocket SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]"
            >
              {/* Rocket Body */}
              <path
                d="M85 50 C85 42 60 30 35 32 C30 32 25 35 20 40 L15 35 L12 45 L20 50 L12 55 L15 65 L20 60 C25 65 30 68 35 68 C60 70 85 58 85 50 Z"
                fill="#f8fafc"
                stroke="#67e8f9"
                strokeWidth="2"
              />
              {/* Cockpit Window */}
              <ellipse cx="62" cy="50" rx="7" ry="5" fill="#38bdf8" />
              {/* Wing Fin Top */}
              <path d="M40 32 L20 18 L25 34 Z" fill="#3b82f6" />
              {/* Wing Fin Bottom */}
              <path d="M40 68 L20 82 L25 66 Z" fill="#3b82f6" />
              {/* Accent Stripes */}
              <path d="M68 45 Q75 50 68 55" stroke="#f43f5e" strokeWidth="3" fill="none" />
            </svg>
          </div>
        ) : (
          /* SKY MODE: Airplane gliding across screen */
          <div className="absolute animate-planeFly w-36 h-28 flex items-center justify-center">
            {/* Fluffy Contrail Smoke Trail */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-80">
              <div className="w-6 h-3 bg-white/70 rounded-full blur-[2px] animate-ping" />
              <div className="w-12 h-4 bg-white/60 rounded-full blur-[3px]" />
              <div className="w-20 h-5 bg-white/40 rounded-full blur-[4px]" />
            </div>

            {/* Passenger Jet / Propeller Plane SVG */}
            <svg
              viewBox="0 0 120 80"
              className="w-28 h-20 drop-shadow-[0_10px_15px_rgba(2,132,199,0.4)]"
            >
              {/* Main Fuselage */}
              <path
                d="M105 40 C105 34 85 28 50 30 C30 31 15 33 5 36 C4 37 4 43 5 44 C15 47 30 49 50 50 C85 52 105 46 105 40 Z"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="2"
              />
              {/* Cockpit Glass */}
              <path d="M92 37 Q100 40 92 43 Z" fill="#0284c7" />
              {/* Tail Fin */}
              <path d="M15 34 L5 12 L25 32 Z" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" />
              {/* Main Wing (Swept) */}
              <path
                d="M65 40 L40 68 L50 68 L78 40 Z"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1.5"
              />
              {/* Jet Engine under Wing */}
              <rect x="52" y="48" width="14" height="6" rx="3" fill="#f59e0b" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
