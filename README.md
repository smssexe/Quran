# Quran Audio • Frontend MVP (Next.js)

فرانت‌اند آزمایشی برای مرور سوره‌ها و اپیزودها (اپیزود = شماره آیه) — بدون بک‌اند.

## اجرای سریع با Docker

```bash
docker compose up --build
# سپس باز کنید: http://localhost:3000
```

## ساختار صفحات
- `/` — صفحه اصلی
- `/surahs` — فهرست سوره‌ها (نام + تعداد آیات)
- `/surahs/[id]` — نمایش اپیزودها بر اساس تعداد آیات (برای تست، تا 300 مورد نمایش داده می‌شود)

## داده‌ها
لیست سوره‌ها در مسیر `data/surahs.ts` قرار دارد (الآن چند سوره‌ی اول را گذاشته‌ایم). می‌توانید بقیه سوره‌ها را به همان آرایه اضافه کنید.

## نکته
این نسخه فقط UI است و پخش صوت انجام نمی‌دهد. در مرحله‌ی بعد، لینک اپیزودها را از بک‌اند (FastAPI) دریافت خواهیم کرد.

## CI/CD با GitHub Actions و Docker Hub
این مخزن شامل workflow آماده است که:
- روی هر push به `main` بیلد می‌گیرد.
- روی تگ‌هایی با الگوی `vX.Y.Z` علاوه‌بر بیلد، **Release** می‌سازد و **ایمیج Docker** را به Docker Hub پوش می‌کند.

### تنظیم متغیرهای مخفی (Secrets)
در GitHub → Settings → Secrets and variables → Actions دو Secret بساز:
- `DOCKERHUB_USERNAME` — نام کاربری Docker Hub
- `DOCKERHUB_TOKEN` — Access Token از Docker Hub (نه پسورد)

اگر نام ریپازیتوری‌ت در Docker Hub چیز دیگری است، مقدار `IMAGE_NAME` را در فایل
`.github/workflows/ci-release.yml` تغییر بده (فرمت: `username/repo`).

### تریگر ریلیز
برای ساخت نسخه و انتشار ایمیج با تگ نسخه:
```bash
git tag v1.0.0
git push origin v1.0.0
```
در این حالت:
- GitHub Release با یادداشت خودکار ساخته می‌شود.
- ایمیج Docker با تگ‌های `v1.0.0`, `1.0`, و `sha-...` به Docker Hub پوش می‌شود.
