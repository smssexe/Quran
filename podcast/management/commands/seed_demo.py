from django.core.management.base import BaseCommand
from django.utils import timezone

from podcast.models import Series, Speaker, Audio


class Command(BaseCommand):
    help = "Seed demo data for homepage listing"

    def handle(self, *args, **options):
        series, _ = Series.objects.get_or_create(
            slug="ramadan", defaults={"title": "ماه رمضان", "description": "سخنرانی‌ها"}
        )
        speaker, _ = Speaker.objects.get_or_create(
            slug="hassani", defaults={"name": "استاد حسنی", "bio": ""}
        )

        created = 0
        for i in range(1, 6):
            slug = f"demo-{i}"
            _, was_created = Audio.objects.get_or_create(
                slug=slug,
                defaults={
                    "title": f"سخنرانی نمونه {i}",
                    "description": "نمونه برای تست فهرست صفحه اصلی",
                    "series": series,
                    "speaker": speaker,
                    "published_at": timezone.now() - timezone.timedelta(days=i),
                },
            )
            created += int(was_created)

        self.stdout.write(self.style.SUCCESS(f"Seed complete. New items: {created}"))

