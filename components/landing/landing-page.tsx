'use client';

import { useMemo, useState } from 'react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const topics = [
  { name: 'Bioteknologi', category: 'Biologi', icon: '🧬' },
  { name: 'Ekologi', category: 'Biologi', icon: '🌿' },
  { name: 'Keanekaragaman Makhluk Hidup', category: 'Biologi', icon: '🦋' },
  { name: 'Makhluk Hidup & Lingkungannya', category: 'Biologi', icon: '🌍' },
  { name: 'Molekuler, Sel & Organisme', category: 'Biologi', icon: '🔬' },
  { name: 'Organisasi Kehidupan', category: 'Biologi', icon: '🧫' },
  { name: 'Pewarisan Sifat', category: 'Biologi', icon: '🧪' },
  { name: 'Sistem Manusia & Hewan', category: 'Biologi', icon: '🫀' },
  { name: 'Besaran, Satuan & Pengukuran', category: 'Fisika', icon: '📏' },
  { name: 'Zat & Kalor', category: 'Fisika', icon: '🌡️' },
  { name: 'Energi', category: 'Fisika', icon: '⚡' },
  { name: 'Gerak & Gaya', category: 'Fisika', icon: '🎯' },
  { name: 'Fluida', category: 'Fisika', icon: '💧' },
  { name: 'Getaran, Gelombang & Bunyi', category: 'Fisika', icon: '🔊' },
  { name: 'Cahaya & Optik', category: 'Fisika', icon: '🔭' },
  { name: 'Kelistrikan & Kemagnetan', category: 'Fisika', icon: '🧲' },
  { name: 'Bumi & Antariksa', category: 'IPBA', icon: '🪐' },
] as const;

type Topic = (typeof topics)[number];
type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Insane';

const difficulties: Array<{ name: Difficulty; detail: string; badge: string }> = [
  { name: 'Easy', detail: 'Konsep dasar, tanpa timer', badge: 'Santai' },
  { name: 'Medium', detail: 'Paham konsep dan aplikasi', badge: 'Fokus' },
  { name: 'Hard', detail: 'Analisis dan penalaran KSR', badge: 'Tantangan' },
  { name: 'Insane', detail: '15 soal, 10 detik tiap soal', badge: '10 detik' },
];

export function LandingPage() {
  const [filter, setFilter] = useState<'Semua' | Topic['category']>('Semua');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const filteredTopics = useMemo(
    () => (filter === 'Semua' ? topics : topics.filter((topic) => topic.category === filter)),
    [filter]
  );

  const scrollToTopics = () => document.getElementById('materi')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Navigasi utama">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-orbit">✦</span>
          <span>KYI<span>SPACE</span></span>
        </button>
        <div className="nav-actions">
          <ThemeToggle />
          <button className="nav-login" type="button">Masuk</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span /> KSR IPA SMP · AI PRACTICE</p>
          <h1>Ruang latihan buat <em>naik level.</em></h1>
          <p className="hero-description">
            Pilih materi, atur tingkat kesulitan, lalu hadapi 15 soal IPA yang dibuat AI khusus buat latihan lomba.
          </p>
          <div className="hero-actions">
            <button type="button" className="button-primary" onClick={scrollToTopics}>Mulai latihan <span>↗</span></button>
            <button type="button" className="button-ghost" onClick={() => setSelectedTopic(topics[0])}>Coba sekarang</button>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars"><i>✦</i><i>⚗</i><i>⌁</i></div>
            <p><strong>17 materi</strong> IPA Terpadu<br />buat KSR SMP</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Preview kuis">
          <div className="orbit-line orbit-line-one" />
          <div className="orbit-line orbit-line-two" />
          <div className="hero-rock hero-rock-one" />
          <div className="hero-rock hero-rock-two" />
          <div className="quiz-preview glass-card">
            <div className="preview-topline"><span>LIVE QUIZ</span><b>08:42</b></div>
            <div className="preview-progress"><i /></div>
            <p className="preview-label">SOAL 08 / 15</p>
            <h2>Organisme yang berperan sebagai pengurai dalam ekosistem adalah...</h2>
            <div className="preview-options">
              <div><b>A</b> Tumbuhan hijau</div>
              <div className="is-selected"><b>B</b> Jamur dan bakteri <span>✓</span></div>
              <div><b>C</b> Hewan herbivora</div>
              <div><b>D</b> Hewan karnivora</div>
            </div>
          </div>
          <div className="preview-satellite">✦</div>
        </div>
      </section>

      <section className="feature-strip" aria-label="Keunggulan aplikasi">
        <article><span>01</span><div><b>Soal selalu fresh</b><p>AI bikin paket baru setiap mulai.</p></div></article>
        <article><span>02</span><div><b>Mode Insane</b><p>10 detik tiap soal buat speedrun.</p></div></article>
        <article><span>03</span><div><b>Review salah</b><p>Balik ke konsep yang belum kuat.</p></div></article>
      </section>

      <section id="materi" className="topics-section">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> EXPLORE</p><h2>Pilih dunia<br /><em>yang mau ditaklukkan.</em></h2></div>
          <p>17 topik IPA Terpadu. Mulai dari yang paling pengen kamu kuasai hari ini.</p>
        </div>
        <div className="topic-filters" role="tablist" aria-label="Filter materi">
          {(['Semua', 'Biologi', 'Fisika', 'IPBA'] as const).map((item) => (
            <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
              {item}{item === 'Semua' ? ' · 17' : ''}
            </button>
          ))}
        </div>
        <div className="topic-grid">
          {filteredTopics.map((topic, index) => (
            <button className="topic-card glass-card" style={{ '--card-index': index } as React.CSSProperties} onClick={() => setSelectedTopic(topic)} key={topic.name}>
              <span className="topic-icon">{topic.icon}</span>
              <span className="topic-meta">{topic.category}</span>
              <strong>{topic.name}</strong>
              <span className="topic-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      {selectedTopic && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedTopic(null)}>
          <section className="difficulty-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="difficulty-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedTopic(null)} aria-label="Tutup">×</button>
            <p className="eyebrow"><span /> MULAI KUIS</p>
            <h2 id="difficulty-title">{selectedTopic.icon} {selectedTopic.name}</h2>
            <p className="modal-intro">Pilih tantangan buat 15 soal latihanmu.</p>
            <div className="difficulty-list">
              {difficulties.map((difficulty) => (
                <button type="button" key={difficulty.name} className={`difficulty-item difficulty-${difficulty.name.toLowerCase()}`} onClick={() => setSelectedTopic(null)}>
                  <span><strong>{difficulty.name}</strong><small>{difficulty.detail}</small></span><em>{difficulty.badge}</em><b>→</b>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
