import React, { useState } from "react";
import YoutubeSearch from "./components/YoutubeSearch";
import YoutubeVideoDetail from "./components/YoutubeVideoDetail";
import { Container, Row, Col, Card } from "react-bootstrap";

const App: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <Container fluid className={`min-vh-100 p-3 ${!hasSearched ? "d-flex justify-content-center align-items-center" : ""}`}>
      <Row className={hasSearched ? "mb-4" : ""}>
        <Col xs={12}>
          <Card className="w-100 border-0">
            <Card.Header className="w-100 border-0 fw-bold fs-2">YouTube Integrator</Card.Header>
            <Card.Body className="w-100">
              {!selectedVideoId ? (
                <YoutubeSearch
                  onSelectVideo={(id) => {
                    setSelectedVideoId(id);
                  }}
                  onFirstSearch={handleSearch}
                  showCompact={hasSearched}
                />
              ) : (
                <YoutubeVideoDetail
                  videoId={selectedVideoId}
                  onBack={() => setSelectedVideoId(null)}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
