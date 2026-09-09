'use client';

import { motion } from 'framer-motion';

type PandaReactionType = 'happy' | 'encourage' | 'celebrate' | 'thinking' | 'sad';

interface PandaReactionProps {
  type: PandaReactionType;
  size?: 'sm' | 'md' | 'lg';
}

export function PandaReaction({ type, size = 'md' }: PandaReactionProps) {
  const reactions = {
    happy: { emoji: '🐼', animation: { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } },
    encourage: { emoji: '🐼💪', animation: { y: [0, -5, 0] } },
    celebrate: { emoji: '🎉🐼🎉', animation: { rotate: [0, 360], scale: [1, 1.3, 1] } },
    thinking: { emoji: '🐼🤔', animation: { rotate: [-5, 5, -5, 0] } },
    sad: { emoji: '🐼💭', animation: { y: [0, -3, 0] } },
  };

  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const reaction = reactions[type];

  return (
    <motion.div
      className={`panda-mascot inline-block ${sizes[size]}`}
      animate={reaction.animation}
      transition={{
        duration: 0.6,
        repeat: type === 'thinking' ? Infinity : 0,
        repeatType: 'loop',
      }}
    >
      {reaction.emoji}
    </motion.div>
  );
}
