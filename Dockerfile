FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
ENV PORT=8000

# Default command: migrate DB, collect static, and run Gunicorn
CMD ["/bin/sh","-lc","python manage.py migrate && python manage.py collectstatic --noinput && exec gunicorn config.wsgi:application -b 0.0.0.0:$PORT --workers 2"]
