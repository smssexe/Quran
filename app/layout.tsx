import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Quran Audio • Frontend MVP',
  description: 'نسخه آزمایشی فرانت‌اند برای مرور سوره‌ها و اپیزودها',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">Quran Audio</div>
            <nav className="nav">
              <Link href="/">خانه</Link>
              <Link href="/surahs">سوره‌ها</Link>
            </nav>
          </header>
          {children}
          <footer className="footer">
            <span className="muted">MVP برای تست رابط کاربری • بدون بک‌اند</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
