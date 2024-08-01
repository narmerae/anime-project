import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'

export async function getServerSideProps(context) {
    console.log(context.params)
    const res = await fetch(`https://api.jikan.moe/v4/anime?&limit=12`)
    const data = await res.json()
    return { props: { data: data.data } }
}


const AnimeList = ({data}) => {
    return (
        <div className="container-md d-flex justify-content-center align-items-center flex-column">
            <h1>Anime List</h1>
            <div className="row d-flex">
                {data.map((anime) => (
                    <div key={anime.mal_id} className="col-md-3 mt-4 mb-1 container-md d-flex justify-content-center align-items-center flex-column">
                        <div className="card">
                            <div className="card-body">
                                <Image src={anime.images.jpg.large_image_url} alt={anime.title} fill={true}></Image>
                            </div>
                        </div>
                        <h5 className="card-title">{anime.title}</h5>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimeList;