'use client';

import { useMemo, useState, useEffect, useRef } from 'react';

type Sources = Record<number, string>;

export default function AyahPlayer({
  title,
  totalAyah,
  sources,
  defaultAyah = 1,
}: {
  title: string;
  totalAyah: number;
  sources: Sources;
  defaultAyah?: number;
}) {
  const [current, setCurrent] = useState<number>(defaultAyah);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSrc = useMemo(() => sources[current], [sources, current]);

  useEffect(() => {
    const el = document.getElementById('player');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [current]);

  return (
    <section id="player" className="player">
      <h4>{title} — آیه {current}</h4>
      <audio ref={audioRef} key={currentSrc} controls preload="none" src={currentSrc}>
        مرورگر شما از پخش‌کنندهٔ صوت پشتیبانی نمی‌کند.
      </audio>
      <div className="ayah-list">
        {Array.from({ length: totalAyah }, (_, i) => i + 1).map((n) => {
          const hasAudio = Boolean(sources[n]);
          const className = `ayah-item ${n === current ? 'active' : ''}`;
          return (
            <button
              key={n}
              disabled={!hasAudio}
              className={className}
              onClick={() => setCurrent(n)}
              aria-label={`پخش آیه ${n}`}
              title={hasAudio ? `پخش آیه ${n}` : 'فعلاً صوتی ندارد'}
            >
              {n}
            </button>
          );
        })}
      </div>
      <p className="muted" style={{ marginTop: 8 }}>
        آیهٔ ۱ از طریق پلیر آروان پخش می‌شود؛ اینجا از آیهٔ ۲ به بعد فعال است.
      </p>
    </section>
  );
}
