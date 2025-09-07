import { notFound } from 'next/navigation';
import { SURAHS } from '../../../data/surahs';
import ArvanIframe from '../../../components/ArvanIframe';
import AyahPlayer from '../../../components/AyahPlayer';

export async function generateStaticParams() {
  return SURAHS.map(s => ({ id: String(s.id) }));
}

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

export default function SurahDetail({ params }: { params: { id: string } }) {
  const surahId = Number(params.id);
  const surah = SURAHS.find(s => s.id === surahId);
  if (!surah) return notFound();

  const total = surah.ayahCount;

  return (
    <main>
      <h1>{surah.name}</h1>
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
      )}
    </main>
  );
}
