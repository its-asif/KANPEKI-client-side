import axios from "axios";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const Search = () => {
    const { register, handleSubmit } = useForm();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     console.log(e);
    //     setSearch(e.target.value);
    // }

    useEffect(() => {
        const url = `https://api.jikan.moe/v4/anime?q=${search}&limit=24`;
        axios.get(url)
            .then(res => {
                console.log(res.data.data);
                setSearchResults(res.data.data);
            })
            .catch(err => console.log(err));
    }, [ search, setSearchResults]);

    return (
        <div>
            {/* Search Bar */}
            <div className="my-10 text-center">
            <form 
            onSubmit={handleSubmit((data) => setSearch(data.searched))}
            className="join">
                <div>
                    <div>
                        <input 
                        {...register("searched")}
                        className="input input-bordered join-item" 
                        placeholder="Enter Anime Name"/>
                    </div>
                </div>
                <div className="indicator">
                    <input className="btn join-item"
                        type="submit" value="Search"
                    />
                </div>
            </form>
            </div>

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 m-10">
                {
                    searchResults?.map((anime) => ( 
                        <div className="card bordered shadow-lg " key={anime.mal_id}>
                            <figure><img src={anime.images.webp.image_url} className="w-full h-72" alt="Shoes" /></figure>
                            <div className="card-body gap-0 p-4">
                                <h2 className="card-title">{anime.title_english} </h2>
                                <p  className="text-sm*:">
                                    {
                                        // show only 100 characters
                                        anime.synopsis?.length > 150 ? anime.synopsis.substring(0, 150) + "..." : anime.synopsis
                                    }
                                </p>

                                {/* episodes, duration, score */}
                                <p className="text-sm ">Episodes : {anime.episodes} </p>
                                <p className="text-sm">Duration : {anime.duration} </p>
                                <p className="text-sm">Score : {anime.score} </p>

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
    );
};

export default Search;