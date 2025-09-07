import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SURAHS } from '../../../data/surahs';

export async function generateStaticParams() {
  return SURAHS.map(s => ({ id: String(s.id) }));
}

export default function SurahDetail({ params }: { params: { id: string } }) {
  const surahId = Number(params.id);
  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) return notFound();

  const episodes = Array.from({ length: surah.ayahCount }, (_, i) => i + 1);

  return (
    <main>
      <h1>{surah.name}</h1>
      <p className="muted">اپیزودها بر اساس شماره آیه (۱ تا {surah.ayahCount})</p>
      <div className="list">
        {episodes.slice(0, 300).map((n) => (
          <Link key={n} href={`#`} aria-label={`اپیزود ${n}`}>{n}</Link>
        ))}
      </div>
      {surah.ayahCount > 300 && (
        <p className="muted" style={{marginTop: 12}}>برای تست، نخستین ۳۰۰ اپیزود نمایش داده شده است.</p>
      )}
    </main>
  );
}
