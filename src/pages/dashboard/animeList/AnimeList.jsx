import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AnimeList = () => {
    const [animeList, setAnimeList] = useState([ 52991, 51009 ]);
    const [animeData, setAnimeData] = useState([]);

    useEffect(() => {
        setAnimeData([]);
        animeList.forEach((animeId) => {
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.data);
                    setAnimeData((prev) => [...prev, data.data]);
                });
        })
        console.log(animeData);

    }, [animeList, setAnimeData]);

    
    const handleAddID = (e) => {
        e.preventDefault();
        const animeId = e.target.animeId.value;
        console.log(animeId);
        
        if (animeList.includes(animeId)) {
            alert("Anime ID already exists");
        } else {
            setAnimeList((prev) => [...prev, animeId]);
        }
    }

    return (
        <div>
            {/* add id section */}
            <div className="my-10 text-center">
                <form className="join" onSubmit={handleAddID}>
                    <div>
                        <div>
                            <input className="input input-bordered join-item" 
                            name="animeId"
                            placeholder="Enter Anime ID" />
                        </div>
                    </div>
                    <div className="indicator">
                        <input className="btn join-item" type="submit" value="Add" />
                    </div>
                </form>
            </div>

            <div className="overflow-x-auto mx-10 mt-16">
                <table className="table ">
                    {/* head */}
                    <thead>
                    <tr className="text-center">
                        <th>Status</th>
                        <th>Title</th>
                        <th>Personal Rating</th>
                        <th>Type</th>
                        <th>Tags</th>
                        <th>MAL Score</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* data */}
                    {
                        animeData.map((anime) => (
                            <tr key={anime.mal_id}>
                                <td  className="text-center">
                                    <select className="form-select">
                                        <option>Completed</option>
                                        <option>Watching</option>
                                        <option>Plan to Watch</option>
                                        <option>On Hold</option>
                                        <option>Dropped</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={anime.images.webp.image_url} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold">{anime.title_english}</div>
                                        <div className="text-sm opacity-50">{anime.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    {/* input rating from 1 to 10 with edit and save button*/}
                                    <div className="flex items-center gap-1 justify-center">
                                        <input type="number" className="form-control w-10 border-2 rounded-md border-slate-500 p-1" min="1" max="10" />
                                        <button className="btn btn-ghost btn-xs">edit</button>
                                    </div>

                                </td>
                                <td className="text-center">{anime.type}</td>
                                <td className="text-center flex flex-wrap gap-x-2 gap-y-2">
                                    {
                                        anime.genres.map((gen) => (
                                            console.log(gen),
                                            <a key={gen.mal_id} className="badge bg-slate-100 text-slate-800"
                                                href={gen.url}
                                            >{gen.name}</a>
                                        ))
                                    }
                                </td>
                                <td className="text-center">{anime.score}</td>
                                <td className="text-center">
                                    <Link to={`/animeDeails/${anime.mal_id}`}>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                    {/* footer */}
                    
                </table>
            </div>
        </div>
    );
};

export default AnimeList;