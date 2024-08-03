import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from "next/link";
const LandingPage = () => {
  return (
      <Container fluid className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <Row className="justify-content-center">
          <Col md={8} className="text-center mb-5"> {/* Adjusted column width and added margin-bottom */}
            <h1 className="display-4 fw-bold mb-3">Welcome to Narmer&apos;s AnimeList</h1>
            <p className="lead">Discover and track your favorite anime.</p>
            <Button variant="primary" size="lg" className="px-4">Get Started</Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {[
            { title: "Popular Anime", img: "https://m.media-amazon.com/images/M/MV5BZTI0MDA5MWUtMWMyYS00NWM3LWE5ZmYtYTUxZmMxMGE5Y2IwXkEyXkFqcGdeQXVyNTIxNDgzOTg@._V1_.jpg" },
            { title: "New Releases", img: "https://cdn.myanimelist.net/images/anime/1885/127108l.jpg" },
            { title: "Top Rated", img: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/30fc6bf31dd77e6ffd536dd9f226d917.jpe" },
          ].map(({ title, img }, index) => (
              <Col key={index} md={4} className="mb-4">
                  <Link href={'/anime'}>
                    <Card className={`h-100 shadow position-relative overflow-hidden card-hover`}>
                      <Image
                          src={img}
                          alt={title}
                          className="card-img-top rounded-top"
                          width={500}
                          height={300}

                      />
                      <div className={`card-body-overlay`}>
                        <h3>{title}</h3>
                      </div>
                    </Card>
                  </Link>
              </Col>
          ))}
        </Row>
      </Container>
  );
};

export default LandingPage;
