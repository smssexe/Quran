import { notFound } from 'next/navigation';
import { SURAHS } from '../../../data/surahs';
import AyahPlayer from '../../../components/AyahPlayer';

export async function generateStaticParams() {
  return SURAHS.map(s => ({ id: String(s.id) }));
}

const SURAH1_SOURCES: Record<number, string> = {
  1: "https://tafsir-quran.s3.ir-thr-at1.arvanstorage.ir/1/001001.mp3",
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
      <p className="muted">اپیزودها بر اساس شماره آیه (۱ تا {total})</p>

      {surah.id === 1 ? (
        <AyahPlayer
          title="سورهٔ حمد"
          totalAyah={total}
          sources={SURAH1_SOURCES}
          defaultAyah={1}
        />
      ) : (
        <p className="muted">برای این سوره فعلاً صوتی تنظیم نشده است.</p>
      )}
    </main>
  );
}
