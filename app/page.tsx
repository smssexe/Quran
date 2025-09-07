import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="kicker">نسخه نمایشی</div>
        <h1>قرآن + تفسیر صوتی — ساده و سریع</h1>
        <p className="muted">برای سورهٔ حمد آیهٔ ۱ با پلیر آروان پخش می‌شود؛ آیه‌های ۲ تا ۷ با پلیر داخلی.</p>
        <div style={{marginTop:16, display:'flex', gap:12, flexWrap:'wrap'}}>
          <Link className="button" href="/surahs">فهرست سوره‌ها</Link>
          <Link className="button" href="/surahs/1#arvan">مشاهده پلیر آروان (آیه ۱)</Link>
        </div>
      </section>
    </main>
  );
}
