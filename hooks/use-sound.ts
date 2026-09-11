import { useState, useEffect, useCallback } from 'react';

type SoundEffect = 
  | 'correct-answer'
  | 'wrong-answer'
  | 'high-score'
  | 'mid-score'
  | 'low-score'
  | 'button-click'
  | 'confetti';

interface SoundConfig {
  volume: number;
  muted: boolean;
}

export const useSound = () => {
  const [audioContext] = useState(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      return new AudioContext();
    }
    return null;
  });

  const [config, setConfig] = useState<SoundConfig>(() => {
    if (typeof window === 'undefined') {
      return { volume: 0.5, muted: false };
    }
    const saved = localStorage.getItem('sound-config');
    if (saved) {
      return JSON.parse(saved);
    }
    return { volume: 0.5, muted: false };
  });

  // Save config to localStorage
  useEffect(() => {
    localStorage.setItem('sound-config', JSON.stringify(config));
  }, [config]);

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const playSound = useCallback((sound: SoundEffect) => {
    // Don't play sounds if muted or prefers reduced motion
    if (config.muted || prefersReducedMotion()) return;

    const soundFiles: Record<SoundEffect, string> = {
      'correct-answer': '/sounds/success-chime.mp3',
      'wrong-answer': '/sounds/soft-buzz.mp3',
      'high-score': '/sounds/celebration.mp3',
      'mid-score': '/sounds/positive-chime.mp3',
      'low-score': '/sounds/encouraging.mp3',
      'button-click': '/sounds/soft-tap.mp3',
      'confetti': '/sounds/confetti-pop.mp3',
    };

    try {
      const audio = new Audio(soundFiles[sound]);
      audio.volume = config.volume;
      
      // Handle AudioContext state for Chrome autoplay policy
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio playback failed:', error);
          // User might have interacted with the page, try again
          setTimeout(() => audio.play().catch(() => {}), 100);
        });
      }
    } catch (error) {
      console.warn('Sound effect error:', error);
    }
  }, [config.muted, config.volume, audioContext]);

  const toggleMute = () => {
    setConfig(prev => ({ ...prev, muted: !prev.muted }));
  };

  const setVolume = (volume: number) => {
    setConfig(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  return {
    playSound,
    toggleMute,
    setVolume,
    isMuted: config.muted,
    volume: config.volume,
  };
};

// Predefined sound hooks for common sounds
export const useSoundEffects = () => {
  const { playSound, toggleMute, setVolume, isMuted, volume } = useSound();

  return {
    playCorrect: () => playSound('correct-answer'),
    playWrong: () => playSound('wrong-answer'),
    playHighScore: () => playSound('high-score'),
    playMidScore: () => playSound('mid-score'),
    playLowScore: () => playSound('low-score'),
    playButtonClick: () => playSound('button-click'),
    playConfetti: () => playSound('confetti'),
    toggleMute,
    setVolume,
    isMuted,
    volume,
  };
};
