import './globals.css';
import Link from 'next/link';
import NavAuth from '../components/NavAuth';

export const metadata = { title: 'Quran Audio • Frontend', description: 'Next.js + OTP' };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='فا' dir='rtl'>
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
