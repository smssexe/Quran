import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SURAHS } from '../../../data/surahs';

export async function generateStaticParams() {
  return SURAHS.map(s => ({ id: String(s.id) }));
}

const SAMPLE_SRC = "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001001.mp3";

export default function SurahDetail({ params }: { params: { id: string } }) {
  const surahId = Number(params.id);
  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) return notFound();

  const episodes = Array.from({ length: surah.ayahCount }, (_, i) => i + 1);

  return (
    <main>
      <h1>{surah.name}</h1>
      <p className="muted">اپیزودها بر اساس شماره آیه (۱ تا {surah.ayahCount})</p>

      {surah.id === 1 && (
        <section id="sample" className="player">
          <h4>نمونه پخش — آیه ۱ سوره حمد</h4>
          <audio controls preload="none" src={SAMPLE_SRC}>
            مرورگر شما از پخش‌کنندهٔ صوت پشتیبانی نمی‌کند.
          </audio>
          <p className="muted" style={{marginTop:8}}>لینک تست فقط برای آیهٔ اول فعال است.</p>
        </section>
      )}

      <div className="list">
        {episodes.slice(0, 300).map((n) => {
          const href = (surah.id === 1 && n === 1) ? '#sample' : '#';
          return <Link key={n} href={href} aria-label={`اپیزود ${n}`}>{n}</Link>;
        })}
      </div>
      {surah.ayahCount > 300 && (
        <p className="muted" style={{marginTop: 12}}>برای تست، نخستین ۳۰۰ اپیزود نمایش داده شده است.</p>
      )}
    </main>
  );
}
