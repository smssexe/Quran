'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

type Profile = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
};

export default function ProfilePage() {
  const [data, setData] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('quran_token');
    if (!token) { setError('ابتدا وارد شوید.'); return; }
    api('GET', '/me', undefined, token)
      .then((res) => {
        setData(res);
        setFirstName(res.first_name || '');
        setLastName(res.last_name || '');
      })
      .catch((e:any) => setError(e.message || 'خطا در دریافت پروفایل'));
  }, []);

  const save = async () => {
    setError(null); setInfo(null); setSaving(true);
    try {
      const token = localStorage.getItem('quran_token');
      if (!token) throw new Error('توکن یافت نشد؛ دوباره وارد شوید.');
      const updated = await api('PUT', '/me', { first_name: firstName, last_name: lastName }, token);
      setData(updated);
      setInfo('تغییرات ذخیره شد.');
    } catch (e:any) {
      setError(e.message || 'ذخیره‌سازی ناموفق بود');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      <h1>پروفایل</h1>
      {error && <div className="alert" style={{borderColor:'#a33'}}>❌ {error}</div>}
      {info && <div className="alert">✅ {info}</div>}
      {data && (
        <div className="card" style={{maxWidth:520}}>
          <h3>اطلاعات کاربر</h3>

          <div className="form" style={{marginTop:8}}>
            <label className="muted">نام</label>
            <input className="input" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="نام"/>
            <label className="muted">نام خانوادگی</label>
            <input className="input" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="نام خانوادگی"/>
            <button className="button" onClick={save} disabled={saving}>{saving ? 'در حال ذخیره...' : 'ذخیره'}</button>
          </div>

          <div className="muted" style={{marginTop:10}}>ایمیل: {data.email || '—'}</div>
          <div className="muted">موبایل: {data.phone || '—'}</div>
          <div className="muted">شناسه: {data.id}</div>

          <button className="button" style={{marginTop:12}}
            onClick={()=>{localStorage.removeItem('quran_token'); location.href='/'}}>
            خروج
          </button>
        </div>
      )}
    </main>
  );
}
