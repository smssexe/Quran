import './globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function NavAuth() {
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => { if (typeof window !== 'undefined') setHasToken(!!localStorage.getItem('quran_token')); }, []);
  return (
    <nav className='nav' style={{display:'flex', gap:8, alignItems:'center'}}>
      <Link className='btn btn--ghost' href='/'>خانه</Link>
      <Link className='btn btn--ghost' href='/surahs'>سوره‌ها</Link>
      {hasToken ? (
        <Link className='btn btn--primary' href='/profile'>پروفایل</Link>
      ) : (
        <Link className='btn btn--primary' href='/login'>ورود</Link>
      )}
    </nav>
  );
}

export const metadata = { title: 'Quran Audio • Frontend', description: 'Next.js + OTP' };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='fa' dir='rtl'>
      <body>
        <div className='container'>
          <header className='header'>
            <Link href='/' className='brand'>Quran<span className='dot'>•</span>Audio</Link>
            <NavAuth/>
          </header>
          {children}
          <footer className='footer'><span className='muted'>Next.js • OTP</span></footer>
        </div>
      </body>
    </html>
  );
}
