import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="kicker">نسخه نمایشی</div>
        <h1>قرآن + تفسیر صوتی — ساده و سریع</h1>
        <p className="muted">سوره‌ها را مرور کن و اپیزودها (بر اساس شماره آیه) را تست کن. برای سورهٔ حمد هر ۷ آیه لینک صوتی دارد.</p>
        <div style={{marginTop:16, display:'flex', gap:12, flexWrap:'wrap'}}>
          <Link className="button" href="/surahs">فهرست سوره‌ها</Link>
          <Link className="button" href="/surahs/1#player">پخش همه آیات سوره حمد</Link>
        </div>
      </section>
    </main>
  );
}
