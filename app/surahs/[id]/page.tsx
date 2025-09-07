import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SURAHS } from '../../../data/surahs';
<<<<<<< HEAD
import ArvanIframe from '../../../components/ArvanIframe';
import AyahPlayer from '../../../components/AyahPlayer';
=======
>>>>>>> parent of 3c48ec7 (Add AyahPlayer for Surah Al-Fatiha audio playback)

export async function generateStaticParams() {
  return SURAHS.map(s => ({ id: String(s.id) }));
}

<<<<<<< HEAD
const ARVAN_CONFIG_URL =
  'https://cast-quran.arvanvod.ir/VPRp1GvAwj/4Vy7mVAkwY/origin_config.json';

const SURAH1_SOURCES_INTERNAL: Record<number, string> = {
  2: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001002.mp3",
  3: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001003.mp3",
  4: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001004.mp3",
  5: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001005.mp3",
  6: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001006.mp3",
  7: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001007.mp3",
};
=======
const SAMPLE_SRC = "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001001.mp3";
>>>>>>> parent of 3c48ec7 (Add AyahPlayer for Surah Al-Fatiha audio playback)

export default function SurahDetail({ params }: { params: { id: string } }) {
  const surahId = Number(params.id);
  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) return notFound();

  const episodes = Array.from({ length: surah.ayahCount }, (_, i) => i + 1);

  return (
    <main>
      <h1>{surah.name}</h1>
<<<<<<< HEAD
      <p className="muted">آیهٔ ۱ با پلیر آروان، آیه‌های ۲ تا {total} با پلیر داخلی.</p>

      {surah.id === 1 && (
        <section id="arvan" className="player">
          <h4>پخش از VOD ابر آروان — آیه ۱</h4>
          <ArvanIframe
            configUrl={ARVAN_CONFIG_URL}
            title="سوره 1. حمد آیه 1"
          />
        </section>
      )}

      {surah.id === 1 ? (
        <AyahPlayer
          title="سورهٔ حمد (آیات ۲ تا ۷)"
          totalAyah={total}
          sources={SURAH1_SOURCES_INTERNAL}
          defaultAyah={2}
        />
      ) : (
        <p className="muted">برای این سوره فعلاً صوتی تنظیم نشده است.</p>
=======
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
>>>>>>> parent of 3c48ec7 (Add AyahPlayer for Surah Al-Fatiha audio playback)
      )}
    </main>
  );
}
