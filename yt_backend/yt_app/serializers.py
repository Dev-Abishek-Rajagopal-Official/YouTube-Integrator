from rest_framework import serializers

class ThumbnailSerializer(serializers.Serializer):
    url = serializers.URLField()

class SnippetSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    publishedAt = serializers.DateTimeField()
    channelTitle = serializers.CharField()
    thumbnails = serializers.DictField()
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    # licensedContent = serializers.CharField()

class VideoItemSerializer(serializers.Serializer):
    id = serializers.DictField()
    snippet = SnippetSerializer()

class VideoDetailItemSerializer(serializers.Serializer):
    id = serializers.CharField()
    snippet = SnippetSerializer()
    statistics = serializers.DictField()
    contentDetails = serializers.DictField()

