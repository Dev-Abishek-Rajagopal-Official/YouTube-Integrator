from django.urls import path
from .views import YouTubeSearchAPIView, YouTubeVideoDetailAPIView

urlpatterns = [
    path("search/", YouTubeSearchAPIView.as_view(), name="youtube-search"),
    path("video/", YouTubeVideoDetailAPIView.as_view(), name="youtube-video-detail"),
]
