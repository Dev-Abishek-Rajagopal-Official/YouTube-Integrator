from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .services.youtube_api_client import YouTubeAPIClient
from .serializers import VideoItemSerializer, VideoDetailItemSerializer

class YouTubeSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get("q", "")
        if not query:
            return Response({"error": "Missing query param 'q'"}, status=400)
        
        client = YouTubeAPIClient()
        result = client.search_videos(query)

        # print(result)

        serializer = VideoItemSerializer(result.get("items", []), many=True)
        return Response(
            {
                "pageInfo": result.get("pageInfo"),
                "data":serializer.data
            }
            )


class YouTubeVideoDetailAPIView(APIView):
    def get(self, request):
        video_id = request.query_params.get("id", "")
        if not video_id:
            return Response({"error": "Missing query param 'id'"}, status=400)

        client = YouTubeAPIClient()
        result = client.get_video_details(video_id)
        print(result)
        items = result.get("items", [])

        if not items:
            return Response({"error": "Video not found"}, status=404)

        serializer = VideoDetailItemSerializer(items[0])
        return Response(serializer.data)
