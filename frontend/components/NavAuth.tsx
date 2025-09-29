'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavAuth() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasToken(!!localStorage.getItem('quran_token'));
    }
  }, []);

  return (
    <nav className='nav' style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
