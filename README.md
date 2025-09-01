# Podcast MVP (Django)

## راه‌اندازی با virtualenv (بدون Docker)
1) ساخت محیط مجازی
   - Windows (PowerShell):
     ```powershell
     py -3 -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - Linux/macOS:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

2) نصب پیش‌نیازها
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

3) مقداردهی محیط
```bash
cp .env.sample .env   # در ویندوز: copy .env.sample .env
# مقادیر S3/CDN را در .env تنظیم کنید.
```

4) اجرای مهاجرت‌ها و ساخت ادمین
```bash
python manage.py migrate
python manage.py createsuperuser
```

5) اجرای محلی
```bash
python manage.py runserver
```

- پنل: http://127.0.0.1:8000/admin/
- RSS:  http://127.0.0.1:8000/rss/

> فعلاً دیتابیس SQLite است. در گام بعد Postgres/Redis اضافه می‌کنیم.
