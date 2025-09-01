from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.conf import settings
from .models import Audio
from urllib.parse import urlparse, urlunparse




def index(request):
items = Audio.objects.order_by("-published_at").select_related("series", "speaker")
return render(request, "podcast/index.html", {"items": items})




def detail(request, slug):
item = get_object_or_404(Audio, slug=slug)
return render(request, "podcast/detail.html", {"item": item})




def signed_url(request, slug):
item = get_object_or_404(Audio, slug=slug)
f = item.files.first()
if not f:
return JsonResponse({"error": "no_file"}, status=404)
url = f.file.url # django-storages presigned URL
# اگر CDN داریم و private است، معمولاً CDN هم presign/secure-link می‌خواهد. این نسخه ساده است.
if settings.CDN_BASE_URL:
# جایگزینی host با CDN برای حالت public (در آینده می‌توان امضای CDN را اضافه کرد)
parsed = urlparse(url)
cdn = urlparse(settings.CDN_BASE_URL)
url = urlunparse((cdn.scheme or parsed.scheme, cdn.netloc, parsed.path, parsed.params, parsed.query, parsed.fragment))
return JsonResponse({"url": url})