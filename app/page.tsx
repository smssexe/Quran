import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="kicker">نسخه نمایشی</div>
        <h1>قرآن + تفسیر صوتی — ساده و سریع</h1>
<<<<<<< HEAD
        <p className="muted">برای سورهٔ حمد آیهٔ ۱ با پلیر آروان پخش می‌شود؛ آیه‌های ۲ تا ۷ با پلیر داخلی.</p>
        <div style={{marginTop:16, display:'flex', gap:12, flexWrap:'wrap'}}>
          <Link className="button" href="/surahs">فهرست سوره‌ها</Link>
          <Link className="button" href="/surahs/1#arvan">مشاهده پلیر آروان (آیه ۱)</Link>
=======
        <p className="muted">سوره‌ها را مرور کن و اپیزودها (بر اساس شماره آیه) را تست کن. فعلاً یک نمونه صوت برای سورهٔ حمد قرار داده‌ایم.</p>
        <div style={{marginTop:16, display:'flex', gap:12, flexWrap:'wrap'}}>
          <Link className="button" href="/surahs">فهرست سوره‌ها</Link>
          <Link className="button" href="/surahs/1#sample">نمونه پخش (سوره حمد)</Link>
>>>>>>> parent of 3c48ec7 (Add AyahPlayer for Surah Al-Fatiha audio playback)
        </div>
      </section>
    </main>
  );
}
