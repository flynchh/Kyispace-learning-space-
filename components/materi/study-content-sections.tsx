'use client';

import type { StudyContent } from '@/lib/study-content';

interface StudyContentSectionsProps {
  content: StudyContent;
}

export function StudyContentSections({ content }: StudyContentSectionsProps) {
  return (
    <div className="study-content">
      <section className="content-section">
        <h3 className="section-title">📌 PENGENALAN</h3>
        <p className="section-text">{content.introduction}</p>
      </section>

      <section className="content-section">
        <h3 className="section-title">🔑 KONSEP KUNCI</h3>
        <ul className="concept-list">
          {content.keyConcepts.map((concept, i) => (
            <li key={i} className="concept-item">
              {concept}
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <h3 className="section-title">💡 CONTOH APLIKASI</h3>
        {content.applications.map((app, i) => (
          <div key={i} className="application-group">
            <h4 className="application-category">{app.category}</h4>
            <ul className="application-list">
              {app.examples.map((example, j) => (
                <li key={j} className="application-item">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {content.ethics && (
        <section className="content-section">
          <h3 className="section-title">⚠️ ISU ETIKA & KONTROVERSI</h3>
          <p className="section-text ethics-text">{content.ethics}</p>
        </section>
      )}

      <section className="content-section">
        <h3 className="section-title">📚 TIPS PERSIAPAN KSR</h3>
        <ul className="tips-list">
          {content.ksrTips.map((tip, i) => (
            <li key={i} className="tip-item">
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
