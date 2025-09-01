from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings

class MediaStorage(S3Boto3Storage):
    default_acl = "private"  # presigned links
    file_overwrite = False

    def url(self, name, parameters=None, expire=None, http_method=None):
        # Return presigned URL with custom TTL
        return super().url(
            name,
            parameters=parameters,
            expire=expire or settings.SIGNED_URL_TTL,
            http_method=http_method,
        )
