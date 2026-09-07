'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, Eye, EyeOff, ArrowRight, Shield, User, Compass } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { FlyoverTransition } from '@/components/transition/flyover-transition';

interface LoginScreenProps {
  onLoginSuccess?: (user: { id: string; email: string; name: string; role: string }) => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showFlyover, setShowFlyover] = useState(false);
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

      // Trigger flyover animation!
      setLoggedInUser(data.user);
      setShowFlyover(true);
    } catch {
      triggerError('Terjadi gangguan jaringan. Coba lagi yaa');
      setIsLoading(false);
    }
  };

  const handleFlyoverFinished = () => {
    if (loggedInUser && onLoginSuccess) {
      onLoginSuccess(loggedInUser);
    } else {
      router.refresh();
    }
  };

  const triggerError = (msg: string) => {
    setErrorMessage(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleQuickFill = (fillEmail: string, fillPass: string, autoSubmit = false) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setErrorMessage('');
    if (autoSubmit) {
      handleSubmit(undefined, fillEmail, fillPass);
    }
  };

  return (
    <main className="min-h-[100dvh] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Top bar with Theme toggle */}
      <header className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </header>

      {/* Main Glass Card */}
      <section
        className={`glass-card w-full max-w-[390px] p-6 sm:p-8 relative z-10 transition-transform ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Badge & Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>RUANG BELAJAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Ruang Belajarmu
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
            Untuk kamu yang sedang berjuang menaklukkan mimpi.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          {/* Email Input */}
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all min-h-[46px]"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
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
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all min-h-[46px]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium animate-fadeIn">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[48px] rounded-xl bg-accent text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-accent/20 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Demo Section */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] font-semibold text-muted text-center uppercase tracking-wider mb-2.5">
            Pilihan Akses Cepat
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('user@kyilearning.space', 'user123')}
              className="px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-foreground flex flex-col items-center gap-1 transition-all active:scale-95 text-center"
            >
              <User className="w-3.5 h-3.5 text-accent" />
              <span className="truncate w-full">Akun Kamu</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('guest@kyilearning.space', 'guest123', true)}
              className="px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-foreground flex flex-col items-center gap-1 transition-all active:scale-95 text-center"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate w-full">Tamu</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('admin@kyilearning.space', 'admin123')}
              className="px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-foreground flex flex-col items-center gap-1 transition-all active:scale-95 text-center"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="truncate w-full">Admin</span>
            </button>
          </div>
        </div>
      </section>

      {/* Flyover transition overlay */}
      <FlyoverTransition
        isActive={showFlyover}
        userName={loggedInUser?.name}
        onFinished={handleFlyoverFinished}
      />
    </main>
  );
}
