import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
      <div className={"container-fluid vh-100"}>
        <Container fluid className="d-flex justify-content-center align-items-center flex-column bg-light p-5">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4">Welcome to Narmer&apos;s AnimeList</h1>
              <p className="lead">Discover and track your favorite anime.</p>
              <Button variant="primary" size="lg">Get Started</Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Card>
                <div className={"imgContainer"}>
                  <Card.Img variant="top" src="https://cdn.myanimelist.net/images/anime/12/52091.jpg"/>
                </div>
                <Card.Body>
                  <Card.Title>Popular Anime</Card.Title>
                  <Card.Text>
                    Explore the most popular anime series and movies.
                  </Card.Text>
                  <Button variant="primary">View More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <div className={"imgContainer"}>
                  <Card.Img variant="top" src="https://cdn.myanimelist.net/images/anime/12/52091.jpg"  />
                </div>
                <Card.Body>
                  <Card.Title>New Releases</Card.Title>
                  <Card.Text>
                    Stay updated with the latest anime releases.
                  </Card.Text>
                  <Button variant="primary">View More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <div className={"imgContainer d-flex justify-content-center align-items-center flex-column bg-light"}>
                  <Card.Img variant="top" src="https://cdn.myanimelist.net/images/anime/12/52091.jpg"/>
                </div>
                <Card.Body>
                  <Card.Title>Top Rated</Card.Title>
                  <Card.Text>
                    Check out the top-rated anime by fans.
                  </Card.Text>
                  <Button variant="primary">View More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default LandingPage;
