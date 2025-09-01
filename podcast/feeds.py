from django.contrib.syndication.views import Feed
from django.urls import reverse
from .models import Audio

class PodcastFeed(Feed):
    title = "Podcast"
    link = "/rss/"
    description = "Latest episodes"

    def items(self):
        return Audio.objects.order_by("-published_at")[:50]

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.description

    def item_link(self, item):
        return reverse("detail", args=[item.slug])
