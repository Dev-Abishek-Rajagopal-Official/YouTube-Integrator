import requests
import os

class YouTubeAPIClient:
    BASE_URL = "https://www.googleapis.com/youtube/v3"

    def __init__(self):
        self.api_key = os.getenv("YOUTUBE_API_KEY")

    def search_videos(self, query: str, max_results=10):
        url = f"{self.BASE_URL}/search"
        params = {
            "q": query,
            "part": "snippet",
            "type": "video",
            "maxResults": max_results,
            "key": self.api_key
        }
        response = requests.get(url, params=params)
        return response.json()

    def get_video_details(self, video_id: str):
        url = f"{self.BASE_URL}/videos"
        params = {
            "id": video_id,
            "part": "snippet,contentDetails,statistics",
            "key": self.api_key
        }
        response = requests.get(url, params=params)
        return response.json()
