# Podcast MVP

## پیش‌نیاز

- Docker و Docker Compose
- تنظیم Bucket روی S3/MinIO + (اختیاری) CDN

## راه‌اندازی

```bash
cp .env.sample .env
# ویرایش مقادیر S3/CDN در .env


# ساخت و اجرا
docker compose up --build -d


# مایگریشن و سوپریوزر (اگر در command وب اجرا نشد)
docker compose exec web python manage.py migrate
docker compose exec web python manage.py createsuperuser


# جمع‌آوری استاتیک (Whitenoise)
docker compose exec web python manage.py collectstatic --noinput
```
