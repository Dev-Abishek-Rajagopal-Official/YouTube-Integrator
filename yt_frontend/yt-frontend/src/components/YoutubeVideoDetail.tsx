import React, { useEffect, useState } from "react";
import type { VideoDetail } from "../types";
import { Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

interface Props {
  videoId: string;
  onBack: () => void;
}

momentDurationFormatSetup(moment);

const YoutubeVideoDetail: React.FC<Props> = ({ videoId, onBack }) => {
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const formattedDuration = (duration: string) => {
    const dur = moment.duration(duration);
    const hours = dur.hours();
    const minutes = dur.minutes();
    const seconds = dur.seconds();
  
    if (hours > 0) {
      return dur.format("h:mm:ss", { trim: false });
    } else {
      return dur.format("mm:ss", { trim: false });
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/youtube/video?id=${videoId}`);
        const data = await res.json();
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
      setLoading(false);
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!video) {
    return <Alert variant="warning">No video data available.</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <div className="ratio ratio-16x9 mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.snippet.title}
            allowFullScreen
          />
        </div>
        <Card.Title>{video.snippet.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {video.snippet.channelTitle} • Published on{" "}
          {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text>{video.snippet.description}</Card.Text>

        <p className="mt-3 mb-1"><strong>Views:</strong> {Number(video.statistics.viewCount).toLocaleString()}</p>
        <p><strong>Likes:</strong> {Number(video.statistics.likeCount).toLocaleString()}</p>
        <p><strong>Comments:</strong> {Number(video.statistics.commentCount).toLocaleString()}</p>
        <p><strong>Favorites:</strong> {Number(video.statistics.favoriteCount).toLocaleString()}</p>
        <p><strong>Licensed Content:</strong> {video.contentDetails.licensedContent.toLocaleString()}</p>
        <p><strong>Duration:</strong> {formattedDuration(video.contentDetails.duration)}</p>
        {video.snippet.tags && video.snippet.tags.length > 0 && (
  <div className="mb-3">
    <strong>Tags:</strong>
    <div className="d-flex flex-wrap gap-2 mt-2">
      {video.snippet.tags.map((tag, index) => (
        <Badge key={index} bg="primary">
          {tag}
        </Badge>
      ))}
    </div>
  </div>
)}

        <Button variant="secondary" onClick={onBack}>
          ← Back to Search
        </Button>
      </Card.Body>
    </Card>
  );
};

export default YoutubeVideoDetail;
