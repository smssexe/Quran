import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>خانه</h1>
      <p className="muted">اینجا صفحه‌ی اصلی است. برای آزمون، بخش سوره‌ها را ببینید.</p>

      <section style={{marginTop: 24}}>
        <div className="card">
          <h3>سوره‌ها</h3>
          <p className="muted">مرور نام سوره‌ها و اپیزودها (بر اساس تعداد آیات)</p>
          <Link className="button" href="/surahs">ورود به فهرست سوره‌ها</Link>
        </div>
      </section>
    </main>
  );
}
