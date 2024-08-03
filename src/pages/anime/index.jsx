import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { Card, Col, Container, Row, Spinner, Form, Button } from 'react-bootstrap';
import styles from '../../styles/AnimeList.module.css';
import Link from 'next/link';

export async function getServerSideProps(context) {
    const res = await fetch('https://api.jikan.moe/v4/anime?&limit=12');
    const data = await res.json();

    const genresRes = await fetch('https://api.jikan.moe/v4/genres/anime');
    const genresData = await genresRes.json();

    return { props: { initialData: data.data, genres: genresData.data } };
}

const popularGenres = [
    { mal_id: 1, name: 'Action' },
    { mal_id: 2, name: 'Adventure' },
    { mal_id: 4, name: 'Comedy' },
    { mal_id: 8, name: 'Drama' },
    { mal_id: 10, name: 'Fantasy' },
];

const AnimeList = ({ initialData, genres }) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [selectedGenre, setSelectedGenre] = useState('');

    const bottomRef = useRef(null);

    const fetchData = async (page, searchQuery = '', genreId = '') => {
        if (loading) return; // Prevent fetch if already loading
        setLoading(true);

        let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=12`;
        if (searchQuery) {
            url += `&q=${searchQuery}`;
        }
        if (genreId) {
            url += `&genres=${genreId}`;
        }

        try {
            const res = await fetch(url);

            if (res.status === 429) { // Handle rate limit error
                console.warn('Rate limit exceeded. Please wait before making more requests.');
                setLoading(false);
                return;
            }

            const newData = await res.json();
            if (Array.isArray(newData.data)) {
                setData((prevData) => page === 1 ? newData.data : [...prevData, ...newData.data]);
                setFilteredData((prevData) => page === 1 ? newData.data : [...prevData, ...newData.data]);
            } else {
                console.error('Data is not an array:', newData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        const newSearchInput = e.target.value;
        setSearchInput(newSearchInput);
        setPage(1);
        fetchData(1, newSearchInput, selectedGenre);
    };

    const handleGenreFilter = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);

        if (genreId) {
            fetchData(1, searchInput, genreId);
        } else {
            setFilteredData(data);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }, { threshold: 1.0 });

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
        };
    }, [loading]);

    useEffect(() => {
        if (page === 1) return;
        fetchData(page, searchInput, selectedGenre);
    }, [page]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <div className={"container-md d-flex justify-content-center align-items-center flex-wrap"}>
            <h1 className="mb-4">Anime List</h1>
            <Form className="mb-4 w-100">
                <Form.Control
                    type="text"
                    placeholder="Search Anime"
                    value={searchInput}
                    onChange={handleSearch}
                />
            </Form>
            <div className="mb-4">
                <Button onClick={() => handleGenreFilter('')} className="me-2">All</Button>
                {popularGenres?.map((genre) => (
                    <Button key={genre.mal_id} onClick={() => handleGenreFilter(genre.mal_id)} className="me-2">
                        {genre.name}
                    </Button>
                ))}
            </div>
            <Container className="d-flex min-vh-100 justify-content-center align-items-center flex-column mt-5 flex-wrap">
                <Row className="d-flex">
                    {filteredData?.map((anime, index) => (
                        <Col key={index} md={3} className="mb-5 d-flex justify-content-center">
                            <Link href={`/anime/${anime.mal_id}`} style={{textDecoration: "none"}}>
                                <Card className={`shadow-sm border-0 h-100 ${styles.cardHover}`}>
                                    <div className="position-relative" style={{width: '100%', height: '300px'}}>
                                        <Image
                                            src={anime.images.webp.large_image_url}
                                            alt={anime.title}
                                            fill={true}
                                            style={{ objectFit: "cover" }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="rounded-top"
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title className="text-center">{anime.title}</Card.Title>
                                        <Card.Text className="card-text">Episodes: {anime.episodes}</Card.Text>
                                        <div className="d-flex flex-wrap">
                                            {anime.genres.map((genre, idx) => (
                                                <span key={idx} className="badge bg-primary me-1 mt-1">{genre.name}</span>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                {loading && (
                    <div className="d-flex justify-content-center mt-4">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
                <div ref={bottomRef} className="w-100 d-flex justify-content-center mt-4" style={{ height: '1px' }}></div>
            </Container>
        </div>
    );
};

export default AnimeList;
