import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TopAnime = () => {

    const [chked, setChked] = useState(3);
    const [ topAir, setTopAir ] = useState([]);
    const [ upcoming, setUpcoming ] = useState([]);
    const [bypopularity, setBypopularity] = useState([]);
    const [favourite, setFavourite] = useState([]);
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const url = "https://api.jikan.moe/v4/top/anime?filter=";

    const getAir = async () => {
        try{
            const result = await axios.get(url + "airing"+ "&limit=16"); 
            setTopAir(result.data.data);
            console.log(result.data.data)
            await delay(1000);
            getUpcoming();
        }
        catch(err){
            console.log(err);
        }
    } 

    const getUpcoming = async () => {
        try{
            const result = await axios.get(url + "upcoming"+ "&limit=16");
            setUpcoming(result.data.data);
            await delay(1000);
            getFavourite();
        }
        catch(err){
            console.log(err);
        }
    }

    const getByPopularity = async () => {
        try{
            const result = await axios.get(url + "bypopularity"+ "&limit=16");
            console.log("popular anime => " , result.data.data)
           setBypopularity(result.data.data);
           await delay(1000);
           getAir();
        }
        catch(err){
            console.log(err);
        }
    }

    const getFavourite = async () => {
        try{
            const result = await axios.get(url + "favorite"+ "&limit=16");
            setFavourite(result.data.data);
        }
        catch(err){
            console.log(err);
        }
    }

    
    useEffect(() => {
        getByPopularity();
        // getAir();
        // getUpcoming();
        // getFavourite();

    }, []);


    const getlen = (str) => {
        console.log(str.length);
        return str.lenth;
    }

    let len = 0;

    useEffect(() => {
        len = getlen("hello");
    }, []);


    return (
        <div className="mt-10">

{/* Title */}
            <h1 className="text-4xl text-center font-bold mb-10">{
                chked === 1 ? "Top Airing Anime" :
                chked === 2 ? "Anime Upcoming" :
                chked === 3 ? "Most Popular Anime" :
                chked === 4 ? "Favourite Anime" : ""
            }</h1>
            <div role="tablist" className="tabs tabs-lifted grid-cols-4">

{/* Top Airing */}
                <input type="radio" name="my_tabs_2" role="tab" className="tab checked:text-primary" 
                aria-label="Top Airing" 
                checked={chked === 1}
                onClick={() => setChked(1)} />

                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                    topAir?.map((anime) => ( 
                        <div className="card bordered shadow-lg " key={anime.mal_id}>
                            <figure>
                            <img src={anime.images.webp.image_url} 
                            className="w-full h-72" alt="Shoes" 
                            /></figure>
                            <div className="card-body gap-0 p-4">
                                <h2 className="card-title">{anime.title_english} </h2>
                                <p  className="text-sm text-gray-800">
                                    {
                                        // show only 100 characters
                                        anime.synopsis?.length > 150 ? anime.synopsis.substring(0, 150) + "..." : anime.synopsis
                                    }
                                </p>

                                {/* episodes, duration, score */}
                                <p className="text-sm text-gray-800 ">Episodes : {anime.episodes} </p>
                                <p className="text-sm text-gray-800 ">Duration : {anime.duration} </p>
                                <p className="text-sm text-gray-800 ">Score : {anime.score} </p>

                            {/* badges */}
                                <div className="flex items-center gap-x-2 my-4">
                                <span
                                    className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4 rounded-full my-auto"
                                > {anime.type}</span>

                                <span
                                    className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4  rounded-full my-auto"
                                > {anime.status}</span>

                                </div>
                                    <div className="card-actions justify-end">
                                    <Link to={`/animeDeails/${anime.mal_id}`}>
                                        <button className="btn btn-outline btn-warning">Show Details</button>
                                    </Link>
                                    </div>
                                </div>
                        </div>
                    ))
                    }
                </div>
                </div>

{/* Upcoming */}
                <input type="radio" name="my_tabs_2" 
                role="tab" 
                className="tab  checked:text-primary" 
                aria-label="Upcoming" 
                checked={chked === 2}
                onClick={() => setChked(2)}/>

                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                        upcoming.map((anime) => ( 
                            <div className="card bordered shadow-lg " key={anime.mal_id}>
                                <figure>
                                <img src={anime.images.webp.image_url} 
                                className="w-full h-72" alt="Shoes" 
                                /></figure>
                                <div className="card-body gap-0 p-4">
                                    <h2 className="card-title">{anime.title_english} </h2>
                                    <p  className="text-sm text-gray-800">
                                        {
                                            // show only 100 characters
                                            anime.synopsis?.length > 150 ? anime.synopsis.substring(0, 150) + "..." : anime.synopsis
                                        }
                                    </p>

                                    {/* episodes, duration, score */}
                                    <p className="text-sm text-gray-800 ">Episodes : {anime.episodes} </p>
                                    <p className="text-sm text-gray-800 ">Duration : {anime.duration} </p>
                                    <p className="text-sm text-gray-800 ">Score : {anime.score} </p>

                                {/* badges */}
                                    <div className="flex items-center gap-x-2 my-4">
                                    <span
                                        className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4 rounded-full my-auto"
                                    > {anime.type}</span>

                                    <span
                                        className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4  rounded-full my-auto"
                                    > {anime.status}</span>

                                    </div>
                                    <div className="card-actions justify-end">
                                    <Link to={`/animeDeails/${anime.mal_id}`}>
                                        <button className="btn btn-outline btn-warning">Show Details</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>


{/* By Popularity */}
                <input type="radio" name="my_tabs_2" role="tab" 
                className="tab  checked:text-primary w-full px-10" 
                aria-label="By Popularity" 
                checked={chked === 3}
                onClick={() => setChked(3)}
                />

                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                        bypopularity.map((anime) => ( 
                            <div className="card bordered shadow-lg " key={anime.mal_id}>
                                <figure><img src={anime.images.webp.image_url} className="w-full h-72" alt="Shoes" /></figure>
                                <div className="card-body gap-0 p-4">
                                    <h2 className="card-title">{anime.title_english} </h2>
                                    <p  className="text-sm text-gray-800">
                                        {
                                            // show only 100 characters
                                            anime.synopsis?.length > 150 ? anime.synopsis.substring(0, 150) + "..." : anime.synopsis
                                        }
                                    </p>

                                    {/* episodes, duration, score */}
                                    <p className="text-sm text-gray-800 ">Episodes : {anime.episodes} </p>
                                    <p className="text-sm text-gray-800 ">Duration : {anime.duration} </p>
                                    <p className="text-sm text-gray-800 ">Score : {anime.score} </p>

                                {/* badges */}
                                    <div className="flex items-center gap-x-2 my-4">
                                    <span
                                        className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4 rounded-full my-auto"
                                    > {anime.type}</span>

                                    <span
                                        className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4  rounded-full my-auto"
                                    > {anime.status}</span>

                                    </div>
                                    <div className="card-actions justify-end">
                                    <Link to={`/animeDeails/${anime.mal_id}`}>
                                        <button className="btn btn-outline btn-warning">Show Details</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>

{/* Favourite */}
                <input type="radio" name="my_tabs_2" role="tab" 
                className="tab  checked:text-primary" 
                aria-label="Favourite" 
                checked={chked === 4}
                onClick={() => setChked(4)}/>

                <div role="tabpanel" 
                className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                    favourite?.map((anime) => ( 
                        <div className="card bordered shadow-lg " key={anime.mal_id}>
                            <figure><img src={anime.images.webp.image_url} className="w-full h-72" alt="Shoes" /></figure>
                            <div className="card-body gap-0 p-4">
                                <h2 className="card-title">{anime.title_english} </h2>
                                <p  className="text-sm text-gray-800">
                                    {
                                        // show only 100 characters
                                        anime.synopsis?.length > 150 ? anime.synopsis.substring(0, 150) + "..." : anime.synopsis
                                    }
                                </p>

                                {/* episodes, duration, score */}
                                <p className="text-sm text-gray-800 ">Episodes : {anime.episodes} </p>
                                <p className="text-sm text-gray-800 ">Duration : {anime.duration} </p>
                                <p className="text-sm text-gray-800 ">Score : {anime.score} </p>

                            {/* badges */}
                                <div className="flex items-center gap-x-2 my-4">
                                <span
                                    className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4 rounded-full my-auto"
                                > {anime.type}</span>

                                <span
                                    className="badge badge-ghost badge-md bg-amber-400 font-semibold p-4  rounded-full my-auto"
                                > {anime.status}</span>

                                </div>
                                <div className="card-actions justify-end">
                                <Link to={`/animeDeails/${anime.mal_id}`}>
                                    <button className="btn btn-outline btn-warning">Show Details</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                </div>
            </div>
        </div>
    );
};

export default TopAnime;

