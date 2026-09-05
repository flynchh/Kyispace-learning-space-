'use client';

import { useEffect, useState } from 'react';

type Star = {
  id: number;
  left: string;
  top: string;
  size: string;
  opacity: number;
  duration: string;
  delay: string;
};

export function SpaceBackground() {
  const [meteorKey, setMeteorKey] = useState(0);
  const [showMeteor, setShowMeteor] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setStars(
        Array.from({ length: 145 }, (_, id) => ({
          id,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${0.8 + Math.random() * 2.8}px`,
          opacity: 0.25 + Math.random() * 0.75,
          duration: `${1.8 + Math.random() * 5.5}s`,
          delay: `-${Math.random() * 6}s`,
        }))
      );
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout>;
    let endTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const scheduleMeteor = () => {
      const delay = 7000 + Math.random() * 8000;
      startTimer = setTimeout(() => {
        if (cancelled) return;
        setMeteorKey((key) => key + 1);
        setShowMeteor(true);
        endTimer = setTimeout(() => {
          setShowMeteor(false);
          if (!cancelled) scheduleMeteor();
        }, 1300);
      }, delay);
    };

    scheduleMeteor();

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="space-scene" aria-hidden="true">
      <div className="starfield">
        {stars.map((star) => (
          <span
            className="star"
            key={star.id}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      <div className="space-dust" />
      <div className="asteroid asteroid-one" />
      <div className="asteroid asteroid-two" />
      <div className="asteroid asteroid-three" />
      {showMeteor && (
        <span className="meteor meteor-fire" key={meteorKey}>
          <span className="meteor-core" />
          <span className="meteor-tail" />
          <span className="meteor-spark meteor-spark-one" />
          <span className="meteor-spark meteor-spark-two" />
          <span className="meteor-spark meteor-spark-three" />
        </span>
      )}
    </div>
  );
}
