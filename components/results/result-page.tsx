'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import Confetti from 'react-confetti';
import { PandaReaction } from '@/components/mascot/panda-reaction';
import { jeyaMessages, randomPick } from '@/lib/personal-messages';
import { useSoundEffects } from '@/hooks/use-sound';

interface QuizResult {
  topic: string;
  difficulty: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  wrongQuestions: Array<{
    question: string;
    options: { A: string; B: string; C: string; D: string };
    userAnswer: string | null;
    correctAnswer: string;
    explanation: string;
  }>;
}

interface ResultPageProps {
  result: QuizResult;
  onRestart: () => void;
  onBack: () => void;
}

export function ResultPage({ result, onRestart, onBack }: ResultPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { playHighScore, playMidScore, playLowScore, playConfetti } = useSoundEffects();
  const isHighScore = result.score >= 80;
  const isMidScore = result.score >= 50;

  const { number } = useSpring({
    from: { number: 0 },
    number: result.score,
    delay: 300,
    config: { mass: 1, tension: 20, friction: 10 },
    onRest: () => {
      if (result.score >= 80) {
        setShowConfetti(true);
        playHighScore();
        playConfetti();
        setTimeout(() => setShowConfetti(false), 5000);
      } else if (result.score >= 50) {
        playMidScore();
      } else {
        playLowScore();
      }
    },
  });

  const getCelebration = () => {
    if (result.score >= 90) {
      return {
        title: 'PERFECT KIYA! 🎉🐼',
        message: 'Kamu luar biasa banget! Jeya bangga!',
        pandaType: 'celebrate' as const,
      };
    }
    if (result.score >= 70) {
      return {
        title: 'KEREN BANGET KIYA! ✨',
        message: 'Hasil yang mantap! Terus semangat yaa!',
        pandaType: 'happy' as const,
      };
    }
    if (result.score >= 50) {
      return {
        title: 'Bagus Kiya! 💪',
        message: 'Tinggal asah dikit lagi, kamu pasti bisa!',
        pandaType: 'encourage' as const,
      };
    }
    return {
      title: 'Tetap Semangat Kiya! 🐼',
      message: 'Gapapa, kita review bareng-bareng yuk!',
      pandaType: 'sad' as const,
    };
  };

  const celebration = getCelebration();

  return (
    <div className="result-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={150} />}

      <div className="result-header">
        <button type="button" onClick={onBack} className="result-back" aria-label="Kembali">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>Hasil Kuis</h2>
      </div>

      <motion.div
        className="result-card glass-card text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <div className="mb-4">
          <PandaReaction type={celebration.pandaType} size="lg" />
        </div>

        <animated.div
          className={`result-score ${
            isHighScore ? 'is-high' : isMidScore ? 'is-mid' : 'is-low'
          }`}
        >
          {number.to((n) => `${Math.floor(n)}%`)}
        </animated.div>

        <h3 className="text-lg font-bold mt-2">{celebration.title}</h3>
        <p className="result-message text-muted">{celebration.message}</p>

        <div className="result-stats">
          <div>
            <strong>{result.correctCount}</strong>
            <span>Benar</span>
          </div>
          <div>
            <strong>{result.totalQuestions - result.correctCount}</strong>
            <span>Salah</span>
          </div>
          <div>
            <strong>{result.difficulty}</strong>
            <span>Level</span>
          </div>
        </div>
      </motion.div>

      {result.wrongQuestions.length > 0 && (
        <div className="result-reviews">
          <h3 className="flex items-center gap-2">
            <span>Review soal yang salah</span>
            <PandaReaction type="thinking" size="sm" />
          </h3>
          <ul className="result-review-list">
            {result.wrongQuestions.map((wq, i) => (
              <motion.li
                key={i}
                className="review-item glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="review-question">{wq.question}</p>
                <div className="review-answers">
                  <span className="review-wrong">
                    <XCircle className="w-4 h-4" /> Kamu: {wq.userAnswer ?? '-'}
                  </span>
                  <span className="review-correct">
                    <CheckCircle className="w-4 h-4" /> Benar: {wq.correctAnswer}
                  </span>
                </div>
                <p className="review-explanation">{wq.explanation}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <div className="result-actions">
        <button type="button" onClick={onRestart} className="result-btn result-btn-primary">
          <RotateCcw className="w-4 h-4" />
          Ulangi
        </button>
        <button type="button" onClick={onBack} className="result-btn">
          <ArrowLeft className="w-4 h-4" />
          Buku Materi
        </button>
      </div>
    </div>
  );
}
