'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyholeUnlockProps {
  isActive: boolean;
  userName?: string;
  onFinished: () => void;
}

export function KeyholeUnlock({ isActive, userName, onFinished }: KeyholeUnlockProps) {
  const [stage, setStage] = useState<'idle' | 'keyhole' | 'beam' | 'expand' | 'complete'>('idle');

  useEffect(() => {
    if (!isActive) return;

    const timers = [
      setTimeout(() => setStage('keyhole'), 200),
      setTimeout(() => setStage('beam'), 800),
      setTimeout(() => setStage('expand'), 1500),
      setTimeout(() => setStage('complete'), 2400),
      setTimeout(() => {
        setStage('idle');
        onFinished();
      }, 3600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isActive, onFinished]);

  if (stage === 'idle') return null;

  return (
    <motion.div
      className="keyhole-unlock-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Darkened Background */}
      <motion.div
        className="keyhole-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'complete' ? 0 : 0.9 }}
        transition={{ duration: 0.7 }}
      />

      {/* Keyhole Icon */}
      <AnimatePresence>
        {(stage === 'keyhole' || stage === 'beam') && (
          <motion.div
            className="keyhole-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Keyhole Shape */}
              <circle cx="40" cy="30" r="12" fill="url(#keyhole-gradient)" />
              <rect x="36" y="30" width="8" height="20" rx="2" fill="url(#keyhole-gradient)" />
              
              {/* Gradient Definition */}
              <defs>
                <radialGradient id="keyhole-gradient">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light Beam */}
      <AnimatePresence>
        {stage === 'beam' && (
          <motion.div
            className="keyhole-beam"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Expanding Circle (Iris Out) */}
      <AnimatePresence>
        {stage === 'expand' && (
          <motion.div
            className="keyhole-iris"
            initial={{ scale: 0 }}
            animate={{ scale: 100 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          />
        )}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {stage === 'expand' && (
          <div className="keyhole-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i / 20) * Math.PI * 2) * 200,
                  y: Math.sin((i / 20) * Math.PI * 2) * 200,
                  scale: 1,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Welcome Text */}
      <AnimatePresence>
        {stage === 'complete' && userName && (
          <motion.div
            className="keyhole-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Welcome, {userName}! ✨</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
