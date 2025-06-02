import React, { useState } from "react";
import type { VideoItem } from "../types";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

interface Props {
  onSelectVideo: (videoId: string) => void;
  onFirstSearch: () => void;
  showCompact: boolean;
}

const YoutubeSearch: React.FC<Props> = ({ onSelectVideo, onFirstSearch, showCompact }) => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setVideos(data.data);
      onFirstSearch();
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Form
        className={`d-flex ${showCompact ? "flex-row" : "flex-column"} mb-4`}
        onSubmit={(e) => {
          e.preventDefault();
          searchVideos();
        }}
      >
        <Form.Control
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={showCompact ? "" : "mb-3"}
        />
        <Button variant="danger" className={showCompact ? "ms-2" : ""} onClick={searchVideos} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

      {videos.length > 0 && (
        <Row>
          {videos.map((video) => (
            <Col key={video.id.videoId} xs={12} className="mb-3">
              <Card onClick={() => onSelectVideo(video.id.videoId || video.id)}
                style={{ cursor: "pointer" }}>
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{video.snippet.title}</Card.Title>
                      <Card.Text className="text-muted">{video.snippet.channelTitle}</Card.Text>
                      <Card.Text className="text-muted">{video.snippet.description}</Card.Text>
                      <Card.Text className="text-muted">Published at: 
                        {new Date(video.snippet.publishedAt).toLocaleDateString()}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default YoutubeSearch;
