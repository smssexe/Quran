from django.db import models
from django.utils import timezone

class Series(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Speaker(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Audio(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    series = models.ForeignKey(Series, on_delete=models.SET_NULL, null=True, blank=True)
    speaker = models.ForeignKey(Speaker, on_delete=models.SET_NULL, null=True, blank=True)
    published_at = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class AudioFile(models.Model):
    audio = models.ForeignKey(Audio, related_name="files", on_delete=models.CASCADE)
    file = models.FileField(upload_to="audio/")
    mime = models.CharField(max_length=100, default="audio/mpeg")
    duration_seconds = models.PositiveIntegerField(default=0)
    bitrate_kbps = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.audio.title} ({self.mime})"
