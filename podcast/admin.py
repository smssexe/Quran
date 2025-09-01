from django.contrib import admin
from .models import Series, Speaker, Audio, AudioFile


@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
prepopulated_fields = {"slug": ("title",)}


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
prepopulated_fields = {"slug": ("name",)}


class AudioFileInline(admin.TabularInline):
model = AudioFile
extra = 1


@admin.register(Audio)
class AudioAdmin(admin.ModelAdmin):
list_display = ("title", "series", "speaker", "published_at")
list_filter = ("series", "speaker")
search_fields = ("title", "description")
prepopulated_fields = {"slug": ("title",)}
inlines = [AudioFileInline]