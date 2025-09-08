# Quran Audio • Split Fullstack (Next.js + FastAPI + SQLite + OTP)

- Frontend و Backend جدا با دو Dockerfile و دو ایمیج
- لاگین OTP (کد در لاگ کانتینر backend)
- SQLite و CORS آماده برای localhost

## اجرا
```bash
docker compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000/docs
```

## تست OTP
1) به /login بروید و ایمیل/موبایل را وارد کنید.
2) لاگ‌ها:
```bash
docker compose logs -f backend | grep OTP
```
3) کد را وارد کنید → سپس /profile.
