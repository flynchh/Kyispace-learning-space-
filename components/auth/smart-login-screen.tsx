'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Lock, Mail, Eye, EyeOff, User, Compass } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { persistentSession } from '@/lib/persistent-session';
import { PasswordModal } from './password-modal';
import { KeyholeUnlock } from '@/components/transition/keyhole-unlock';

export function SmartLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showKeyholeUnlock, setShowKeyholeUnlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ email: string; password: string; name: string; correctPassword: string } | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{ id: string; email: string; name: string; role: string } | null>(null);

  const handleSubmit = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();

    const targetEmail = customEmail ?? email;
    const targetPassword = customPassword ?? password;

    if (!targetEmail || !targetPassword) {
      triggerError('Email dan password harus diisi yaa');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          password: targetPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        triggerError(data.error === 'Invalid credentials' ? 'Email atau password salah nih. Cek lagi yaa' : 'Gagal masuk. Coba lagi sebentar lagi ya');
        setIsLoading(false);
        return;
      }

      // Save persistent session for Kiya
      if (data.user.role === 'USER') {
        persistentSession.save(data.user.id, data.user.name);
      }

      setLoggedInUser(data.user);
      
      if (data.user.role === 'USER') {
        setShowKeyholeUnlock(true);
      } else {
        router.refresh();
      }
    } catch {
      triggerError('Terjadi gangguan jaringan. Coba lagi yaa');
      setIsLoading(false);
    }
  };

  const handlePasswordCorrect = () => {
    setShowPasswordModal(false);
    if (selectedUser) {
      handleSubmit(undefined, selectedUser.email, selectedUser.password);
    }
  };

  const handleKeyholeUnlockFinished = () => {
    setShowKeyholeUnlock(false);
    router.refresh();
  };

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <>
      <main className="min-h-[100dvh] flex flex-col justify-center items-center p-4 relative overflow-hidden">
        <header className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </header>

        <section
          className={`glass-card w-full max-w-[390px] p-6 sm:p-8 relative z-10 transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>RUANG BELAJAR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              KYI Learning Space
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
Tempat latihan KSR untuk Kiya. Yuk mulai belajar! ✨
            </p>
          </div>

          {/* Quick Login Cards */}
          <div className="space-y-3 mb-6">
            <motion.button
              type="button"
              onClick={() => {
                setSelectedUser({ 
                  email: 'user@kyilearning.space', 
                  password: '040726', 
                  name: 'Kiya',
                  correctPassword: '040726'
                });
                setShowPasswordModal(true);
              }}
              className="w-full glass-card p-4 flex items-center gap-4 hover:border-accent/30 transition-all"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || showPasswordModal}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-bold">Kiya&apos;s Account</h3>
                <p className="text-xs text-muted">Continue learning</p>
              </div>
              <div className="text-xs px-2 py-1 rounded bg-accent/20 text-accent font-bold">
                Main
              </div>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => {
                setSelectedUser({ 
                  email: 'bibin@kyilearning.space', 
                  password: 'asu123', 
                  name: 'Bibin',
                  correctPassword: 'asu123'
                });
                setShowPasswordModal(true);
              }}
              className="w-full glass-card p-4 flex items-center gap-4 hover:border-purple-500/30 transition-all"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || showPasswordModal}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Compass className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-bold">Bibin&apos;s Account</h3>
                <p className="text-xs text-muted">Admin access</p>
              </div>
              <div className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400 font-bold">
                Admin
              </div>
            </motion.button>
          </div>

          {/* Manual Login Form - Hidden */}
          <details className="mb-4" style={{ display: 'none' }}>
            <summary className="text-xs text-muted text-center cursor-pointer hover:text-foreground transition-colors">
              Or login manually
            </summary>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5 ml-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@kyilearning.space"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium"
                >
                  {errorMessage}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] rounded-xl bg-accent text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>
          </details>

        </section>
      </main>

      {showPasswordModal && selectedUser && (
        <PasswordModal
          userName={selectedUser.name}
          correctPassword={selectedUser.correctPassword}
          onCorrect={handlePasswordCorrect}
          onCancel={() => {
            setShowPasswordModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      <KeyholeUnlock
        isActive={showKeyholeUnlock}
        userName={loggedInUser?.name}
        onFinished={handleKeyholeUnlockFinished}
      />
    </>
  );
}

