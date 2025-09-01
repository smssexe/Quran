from django.urls import path
from . import views, feeds

urlpatterns = [
    path("", views.index, name="index"),
    path("a/<slug:slug>/", views.detail, name="detail"),
    path("a/<slug:slug>/stream-url/", views.signed_url, name="signed_url"),
    path("rss/", feeds.PodcastFeed(), name="rss"),
]
