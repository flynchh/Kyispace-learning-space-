'use client';

import { useState } from 'react';
import { ArrowUpRight, Atom, Dna, Flower2, Leaf, Microscope, Orbit, Sparkles, Waves, Zap } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Reveal } from './reveal';

const missionTopics = [
  { name: 'Bioteknologi', category: 'Biologi', icon: Dna, position: 'north-west', detail: 'Belajar bagaimana makhluk hidup membantu manusia menciptakan hal baru.' },
  { name: 'Ekologi', category: 'Biologi', icon: Leaf, position: 'north-east', detail: 'Pahami hubungan kecil yang menjaga seluruh ekosistem tetap hidup.' },
  { name: 'Keanekaragaman', category: 'Biologi', icon: Flower2, position: 'west', detail: 'Jelajahi ragam makhluk hidup dan cara mereka dikelompokkan.' },
  { name: 'Sel & Organisme', category: 'Biologi', icon: Microscope, position: 'east', detail: 'Mulai dari sel kecil sampai sistem kehidupan yang kompleks.' },
  { name: 'Energi', category: 'Fisika', icon: Zap, position: 'south-west', detail: 'Ikuti perjalanan energi dan perubahan bentuknya di sekitar kita.' },
  { name: 'Gerak & Gaya', category: 'Fisika', icon: Atom, position: 'south-east', detail: 'Cari tahu kenapa benda bisa bergerak, berhenti, atau berubah arah.' },
  { name: 'Gelombang & Bunyi', category: 'Fisika', icon: Waves, position: 'south', detail: 'Pahami getaran yang berubah menjadi suara dan gelombang.' },
  { name: 'Bumi & Antariksa', category: 'IPBA', icon: Orbit, position: 'far-east', detail: 'Perjalanan paling jauh: bumi, tata surya, dan ruang angkasa.' },
] as const;

type MissionTopic = (typeof missionTopics)[number];
type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Insane';

const difficulties: Array<{ name: Difficulty; detail: string; badge: string }> = [
  { name: 'Easy', detail: 'Konsep dasar, tanpa timer', badge: 'Santai' },
  { name: 'Medium', detail: 'Paham konsep dan aplikasi', badge: 'Fokus' },
  { name: 'Hard', detail: 'Analisis dan penalaran KSR', badge: 'Tantangan' },
  { name: 'Insane', detail: '15 soal, 10 detik tiap soal', badge: '10 detik' },
];

export function LandingPage() {
  const [selectedTopic, setSelectedTopic] = useState<MissionTopic | null>(null);
  const [previewTilt, setPreviewTilt] = useState('rotate(3deg)');
  const [activeTab, setActiveTab] = useState<'Semua' | 'Biologi' | 'Fisika' | 'IPBA'>('Semua');

  const scrollToMission = () => document.getElementById('mission-map')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Navigasi utama">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-orbit"><Sparkles className="icon-tiny" /></span>
          <span>KYI<span>SPACE</span></span>
        </button>
        <div className="nav-actions">
          <ThemeToggle />
          <button className="nav-login" type="button">Masuk</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span /> RUANG KECIL BUAT PERJUANGANMU</p>
          <h1>Satu langkah lagi<br />buat <em>mimpi kamu.</em></h1>
          <p className="hero-description">
            Pilih materi hari ini. Aku bantu siapkan latihannya, kamu fokus menaklukkan satu soal demi satu soal.
          </p>
          <div className="hero-actions">
            <button type="button" className="button-primary" onClick={scrollToMission}>Yuk, mulai belajar <ArrowUpRight className="icon-small" /></button>
            <button type="button" className="button-ghost" onClick={() => setSelectedTopic(missionTopics[0])}>Lihat rute pertama</button>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars">
              <i><Dna className="icon-micro" /></i>
              <i><Atom className="icon-micro" /></i>
              <i><Orbit className="icon-micro" /></i>
            </div>
            <p><strong>17 materi</strong> buat kita<br />kuasai pelan-pelan</p>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Preview kuis"
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            setPreviewTilt(`rotate(${3 + x * 6}deg) translate3d(${x * 12}px, ${y * 12}px, 0)`);
          }}
          onPointerLeave={() => setPreviewTilt('rotate(3deg)')}
        >
          <div className="orbit-line orbit-line-one" />
          <div className="orbit-line orbit-line-two" />
          <div className="hero-rock hero-rock-one" />
          <div className="hero-rock hero-rock-two" />
          <div className="quiz-preview glass-card" style={{ transform: previewTilt }}>
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
          <div className="preview-satellite"><Sparkles className="icon-small" /></div>
        </div>
      </section>

      <Reveal>
        <section className="feature-strip" aria-label="Teman belajarmu">
          <article><span>01</span><div><b>Soal baru buat kamu</b><p>Setiap mulai, ada latihan fresh yang nunggu kamu.</p></div></article>
          <article><span>02</span><div><b>Kalau mau menantang diri</b><p>Mode Insane: 10 detik tiap soal. Kita coba kalau kamu siap.</p></div></article>
          <article><span>03</span><div><b>Yang salah, kita ulang</b><p>Bukan gagal. Cuma bagian yang perlu kita pahami lagi.</p></div></article>
        </section>
      </Reveal>

      <section id="mission-map" className="mission-section">
        <Reveal className="section-heading">
          <div><p className="eyebrow"><span /> MISSION MAP</p><h2>Peta perjalanan<br /><em>hari ini, kamu.</em></h2></div>
          <p>Nggak usah langsung semuanya. Pilih satu titik dulu, kita jelajahi sampai paham.</p>
        </Reveal>

        <div className="mission-map-frame glass-card">
          <div className="mission-constellations" aria-hidden="true">
            <svg viewBox="0 0 1000 600" className="constellation-svg">
              <path d="M500,300 L260,160 L180,300 L280,440 L500,300 L740,160 L820,300 L720,440 Z" />
              <circle cx="500" cy="300" r="140" className="core-orbit" />
              <circle cx="500" cy="300" r="230" className="outer-orbit" />
            </svg>
          </div>

          <div className="mission-core">
            <div className="core-beacon"><Sparkles className="icon-medium" /></div>
            <strong>Titik Mulai</strong>
            <small>Pilih salah satu planet materi</small>
          </div>

          <div className="mission-nodes" aria-label="Daftar titik materi">
            {missionTopics.map((node) => {
              const Icon = node.icon;
              return (
                <button
                  type="button"
                  key={node.name}
                  className={`mission-node node-${node.position} ${selectedTopic?.name === node.name ? 'is-active' : ''}`}
                  onClick={() => setSelectedTopic(node)}
                >
                  <span className="node-halo" />
                  <span className="node-badge"><Icon className="icon-small" /></span>
                  <span className="node-title">{node.name}</span>
                  <span className="node-category">{node.category}</span>
                </button>
              );
            })}
          </div>

          <div className="mission-sidebar">
            <div className="sidebar-filter">
              {(['Semua', 'Biologi', 'Fisika', 'IPBA'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mission-quick-list">
              {missionTopics
                .filter((item) => activeTab === 'Semua' || item.category === activeTab)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={`quick-item ${selectedTopic?.name === item.name ? 'active' : ''}`}
                      onClick={() => setSelectedTopic(item)}
                    >
                      <Icon className="icon-small" />
                      <span>{item.name}</span>
                      <small>{item.category}</small>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {selectedTopic && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedTopic(null)}>
          <section className="difficulty-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="difficulty-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedTopic(null)} aria-label="Tutup">×</button>
            <p className="eyebrow"><span /> DETAIL PERJALANAN</p>
            <h2 id="difficulty-title">
              <selectedTopic.icon className="icon-medium inline-icon" /> {selectedTopic.name}
            </h2>
            <p className="modal-intro">{selectedTopic.detail}</p>
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
