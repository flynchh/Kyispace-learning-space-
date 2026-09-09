'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { persistentSession } from '@/lib/persistent-session';

interface MorphTransitionProps {
  isActive: boolean;
  userName?: string;
  onFinished: () => void;
}

export function MorphTransition({ isActive, userName, onFinished }: MorphTransitionProps) {
  const [stage, setStage] = useState<'idle' | 'morph'>('idle');

  useEffect(() => {
    if (!isActive) return;

    setStage('morph');
    const timer = setTimeout(() => {
      onFinished();
    }, 800);

    return () => clearTimeout(timer);
  }, [isActive, onFinished]);

  if (stage === 'idle') return null;

  return (
    <motion.div
      className="morph-transition"
      initial={{ 
        position: 'fixed',
        inset: '50% 50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '500px',
        borderRadius: '16px',
        zIndex: 9999,
      }}
      animate={{
        inset: 0,
        transform: 'none',
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
      }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{
        background: 'var(--background)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        </motion.div>
        <p className="text-lg font-bold">Welcome back, {userName}! 🐼</p>
      </motion.div>
    </motion.div>
  );
}
