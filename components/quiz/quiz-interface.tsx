'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Clock, Timer, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PandaReaction } from '@/components/mascot/panda-reaction';
import { jeyaMessages, randomPick } from '@/lib/personal-messages';
import { useSoundEffects } from '@/hooks/use-sound';

type Question = {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
};

interface QuizInterfaceProps {
  topic: string;
  difficulty: string;
  mode: 'STUDY' | 'EXAM';
  questions: Question[];
  onComplete: (answers: (string | null)[], timeSpent: number) => void;
  onExit: () => void;
}

export function QuizInterface({
  topic,
  difficulty,
  mode,
  questions,
  onComplete,
  onExit,
}: QuizInterfaceProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));
  const [timeSpent, setTimeSpent] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const isInsane = difficulty === 'INSANE';
  const insaneTimer = isInsane ? 10 : 0;

  // Time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Insane mode countdown
  const [insaneCountdown, setInsaneCountdown] = useState(insaneTimer);
  const answersRef = useRef(answers);
  const timeSpentRef = useRef(timeSpent);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    timeSpentRef.current = timeSpent;
  }, [timeSpent]);

  useEffect(() => {
    if (!isInsane || mode !== 'EXAM') return;
    const timer = setInterval(() => {
      setInsaneCountdown((c) => {
        if (c <= 1) {
          // Auto advance
          if (current < questions.length - 1) {
            setCurrent(current + 1);
            return insaneTimer;
          } else {
            onComplete(answersRef.current, timeSpentRef.current);
            return 0;
          }
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isInsane, mode, current, questions.length, onComplete, insaneTimer]);

  const { playCorrect, playWrong, playButtonClick } = useSoundEffects();

  const selectAnswer = useCallback((answer: string) => {
    const isCorrect = answer === questions[current].correctAnswer;
    
    // Play sound
    playButtonClick();
    if (isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }

    setAnswers((prev) => {
      const next = [...prev];
      next[current] = answer;
      return next;
    });
  }, [current, questions, playButtonClick, playCorrect, playWrong]);

  useEffect(() => {
    if (mode === 'STUDY' && answers[current] !== null) {
      const timer = setTimeout(() => {
        if (current < questions.length - 1) {
          setCurrent(current + 1);
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [mode, answers, current, questions.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow keys for navigation
      if (e.key === 'ArrowLeft' && current > 0) {
        setCurrent(current - 1);
      }
      if (e.key === 'ArrowRight' && current < questions.length - 1) {
        setCurrent(current + 1);
      }

      // A-D or 1-4 for answer selection (only if not yet answered in study mode)
      const keyMap: Record<string, string> = {
        'a': 'A', '1': 'A',
        'b': 'B', '2': 'B',
        'c': 'C', '3': 'C',
        'd': 'D', '4': 'D',
      };

      const answer = keyMap[e.key.toLowerCase()];
      if (answer && (mode === 'EXAM' || answers[current] === null)) {
        selectAnswer(answer);
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        setShowDrawer(false);
        setShowConfirmExit(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, questions.length, answers, selectAnswer, mode]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="quiz-container">
      {/* Top Bar */}
      <div className="quiz-topbar">
        <button type="button" className="quiz-exit-btn" onClick={() => setShowConfirmExit(true)}>
          <X className="w-5 h-5" />
        </button>
        <div className="quiz-topbar-info">
          <span className="text-xs font-bold uppercase text-muted">{topic}</span>
          <span className="text-xs text-muted">{mode}</span>
        </div>
        <div className="quiz-timer">
          {isInsane ? (
            <motion.div 
              className={`insane-timer ${insaneCountdown <= 3 ? 'insane-critical' : ''}`}
              animate={insaneCountdown <= 3 ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Timer className="w-4 h-4" />
              <span>{insaneCountdown}s</span>
            </motion.div>
          ) : (
            <div className="normal-timer">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeSpent)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress">
        <motion.div
          className="quiz-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="quiz-question-area"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="quiz-question-number flex items-center gap-2">
            <PandaReaction type="thinking" size="sm" />
            <span>Soal {current + 1} dari {questions.length}</span>
          </div>
          <h2 className="quiz-question-text">{question.question}</h2>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <motion.div
        className="quiz-options"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {(['A', 'B', 'C', 'D'] as const).map((opt) => {
          const isSelected = answers[current] === opt;
          const showResult = mode === 'STUDY' && answers[current] !== null;
          const isCorrect = showResult && opt === question.correctAnswer;
          const isWrong = showResult && isSelected && opt !== question.correctAnswer;

          return (
            <motion.button
              key={opt}
              type="button"
              className={`quiz-option ${isSelected ? 'is-selected' : ''} ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
              onClick={() => selectAnswer(opt)}
              disabled={showResult}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, x: 6 }}
              whileTap={{ scale: 0.97 }}
              animate={isCorrect ? {
                x: 0,
                scale: [1, 1.05, 1],
                boxShadow: ['0 0 0px #10b981', '0 0 25px #10b981', '0 0 10px #10b981'],
              } : isWrong ? {
                scale: 1,
                boxShadow: '0 0 0px transparent',
                x: [-8, 8, -8, 8, 0],
              } : {
                x: 0,
                scale: 1,
                boxShadow: '0 0 0px transparent',
              }}
              transition={{ duration: 0.4 }}
            >
              <span className="option-letter">{opt}</span>
              <span className="option-text">{question.options[opt]}</span>
              <AnimatePresence>
                {isCorrect && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                )}
                {isWrong && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <XCircle className="w-6 h-6 text-rose-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Study Mode Explanation */}
      <AnimatePresence>
        {mode === 'STUDY' && answers[current] !== null && (
          <motion.div
            className={`quiz-explanation ${answers[current] === question.correctAnswer ? 'explanation-correct' : 'explanation-wrong'}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2">
              {answers[current] === question.correctAnswer ? (
                <span className="text-emerald-400 font-bold">
                  {randomPick(jeyaMessages.correct)}
                </span>
              ) : (
                <span className="text-amber-400 font-bold">
                  {randomPick(jeyaMessages.wrong)}
                </span>
              )}
            </div>
            <p>{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="quiz-bottom-nav">
        <button
          type="button"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="quiz-nav-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={() => setShowDrawer(true)}
          className="quiz-drawer-btn"
        >
          {answeredCount}/{questions.length}
        </button>

        {current < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrent(current + 1)}
            className="quiz-nav-btn"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onComplete(answers, timeSpent)}
            className="quiz-submit-btn"
          >
            Selesai
          </button>
        )}
      </div>

      {/* Question Drawer */}
      {showDrawer && (
        <div className="quiz-drawer-backdrop" onClick={() => setShowDrawer(false)}>
          <div className="quiz-drawer glass-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold mb-3">Nomor Soal</h3>
            <div className="drawer-grid">
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`drawer-num ${i === current ? 'is-current' : ''} ${answers[i] !== null ? 'is-answered' : ''}`}
                  onClick={() => { setCurrent(i); setShowDrawer(false); }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation */}
      {showConfirmExit && (
        <div className="quiz-drawer-backdrop" onClick={() => setShowConfirmExit(false)}>
          <div className="quiz-drawer glass-card text-center" onClick={(e) => e.stopPropagation()}>
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold mb-1">Yakin mau keluar?</h3>
            <p className="text-xs text-muted mb-4">Progres kuis ini belum disimpan.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowConfirmExit(false)} className="flex-1 py-2 rounded-lg border border-white/10 text-xs">
                Batal
              </button>
              <button type="button" onClick={onExit} className="flex-1 py-2 rounded-lg bg-rose-500/80 text-white text-xs">
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
