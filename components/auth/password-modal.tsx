'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';

interface PasswordModalProps {
  userName: string;
  correctPassword: string;
  onCorrect: () => void;
  onCancel: () => void;
}

export function PasswordModal({ userName, correctPassword, onCorrect, onCancel }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setError(false);
      onCorrect();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="password-modal glass-card"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyPress}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onCancel}
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <motion.div
          className="text-center mb-6"
          animate={error ? {
            x: [-10, 10, -10, 10, 0],
            rotate: [-2, 2, -2, 2, 0]
          } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="password-lock-icon"
            animate={{ 
              scale: error ? [1, 1.2, 1] : 1,
              rotate: error ? [0, -15, 15, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            🔒
          </motion.div>
          <h2 className="text-xl font-bold mt-3">Password {userName}</h2>
          <p className="text-sm text-muted mt-1">Masukkan password untuk melanjutkan</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className={`password-input ${error ? 'password-input-error' : ''}`}
              autoFocus
              maxLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="password-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Password salah! Coba lagi yaa 🔐
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Batal
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={password.length < 6}
            >
              Unlock
            </motion.button>
          </div>
        </form>

        {userName === 'Kiya' && (
          <p className="text-xs text-center text-muted mt-4">
            Hint: Tanggal spesial Kiya (DDMMYY) 💝
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
