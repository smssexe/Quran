from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings


class MediaStorage(S3Boto3Storage):
default_acl = "private" # لینک امضاشده
file_overwrite = False


def url(self, name, parameters=None, expire=None, http_method=None):
# اگر CDN تعریف شده، از CDN استفاده کن
if settings.CDN_BASE_URL:
base = settings.CDN_BASE_URL.rstrip("/")
# برای محتوای عمومی می‌توان مستقیم CDN داد؛ اینجا چون private است، presigned بهتر است
return super().url(
name,
parameters=parameters,
expire=expire or settings.SIGNED_URL_TTL,
http_method=http_method,
)