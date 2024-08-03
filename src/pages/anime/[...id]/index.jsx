import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Link from "next/link";

export async function getServerSideProps(context) {
    const { id } = context.query;
    let data = null;

    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        data = await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return { props: { data } };
}

const Index = ({ data }) => {
    const {
        title,
        title_japanese,
        synopsis,
        images,
        trailer,
        aired,
        rating,
        score,
        genres,
        themes,
        studios,
        producers,
        licensors
    } = data.data;

    return (
        <div className="container my-5">
            <div className="row mb-4">
                <div className="col-12">
                    <Link href={`/anime`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                            </svg>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Image
                        src={images.webp.large_image_url}
                        alt={title}
                        className="img-fluid rounded mb-3"
                        width={300}
                        height={450}
                        layout="responsive"
                    />
                </div>
                <div className="col-md-8">
                    <h1>{title}</h1>
                    <h4>{title_japanese}</h4>
                    <p><strong>Rating:</strong> {rating}</p>
                    <p><strong>Score:</strong> {score}</p>
                    <p><strong>Aired:</strong> {aired.string}</p>
                    <p><strong>Genres:</strong> {genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Themes:</strong> {themes.map(theme => theme.name).join(', ')}</p>
                    <p><strong>Studios:</strong> {studios.map(studio => studio.name).join(', ')}</p>
                    <p><strong>Producers:</strong> {producers.map(producer => producer.name).join(', ')}</p>
                    <p><strong>Licensors:</strong> {licensors.map(licensor => licensor.name).join(', ')}</p>
                    <div className="mb-3">
                        <a href={data.data.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View on MyAnimeList</a>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h3>Synopsis</h3>
                    <p>{synopsis}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h3>Trailer</h3>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            className="embed-responsive-item"
                            src={trailer.embed_url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Index;
