import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SearchByName from "./searchByName/SearchByName";


const AnimeList = () => {
    const [animeList, setAnimeList] = useState([ ]);
    const [animeData, setAnimeData] = useState([]);
    const [allData, setAllData] = useState({});
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const getList = async() =>{
        const res = await axiosPublic.get(`/animeList/id/${id}`);
        console.log(res.data[0]);
        setAllData(res.data[0])
    }

    useEffect( () =>{
        getList();
        // fetchAnimeData();
    } , [animeList, setAnimeList])

    const fetchAnimeData = async() => {
        setAnimeData([]);
        console.log(allData.animeList);
        {allData.animeList && allData.animeList.forEach( async(animeId) => { 
            console.log(animeId);
            await fetch(`https://api.jikan.moe/v4/anime/${animeId.id}/full`)
                .then((response) => response.json())
                .then((data) => {
                    setAnimeData((prev) => [...prev, { ...data.data, ...animeId}]);
                });
        })}
        console.log(animeData);
    }

    console.log(animeData)

    useEffect(() => {
        fetchAnimeData();

    }, [allData]);

    
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
                {/* <h1 className="text-2xl font-bold my-4"> List ID : {id}</h1> */}

                {/* card information */}
                <div>
                    <div class="flex flex-col justify-start w-fit  gap-4 p-4 px-10 bg-white shadow-xl rounded-xl dark:bg-gray-800 md:flex-row mx-auto my-10">
                       
                        <div class="flex flex-col justify-between">
                            <div class="flex items-start justify-between my-2 text-gray-700 dark:text-white md:m-0">
                                <p class="text-2xl md:text-3xl font-bold leading-5 mr-2">
                                    {allData.listName}
                                </p>
                                <button class="text-red-400 hover:text-red-600 ">
                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zm128 0q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                            <div className="text-left text-gray-500 text-sm">
                                {allData.description}
                            </div>


                            <div class="flex items-center my-2 font-semibold  text-gray-500 dark:text-gray-400">
                                <div className="text-green-800 flex items-center">
                                    <svg width="10" height="10" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z">
                                        </path>
                                    </svg>
                                    123,344,893 views
                                </div>
                                <div className="text-red-800 flex items-center">
                                    <svg width="10" height="10" fill="currentColor" class="ml-6 mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z">
                                        </path>
                                    </svg>
                                    45 876 likes
                                </div>
                            </div>


                            <div class="flex items-start my-2 ">
                                <div class="relative my-auto">
                                    <a href="#" class="relative block ">
                                        <img alt="profil" src={allData.userPhoto} class="mx-auto object-cover rounded-full h-10 w-10  "/>
                                    </a>
                                    <svg width="10" height="10" fill="currentColor" class="absolute bottom-0 right-0 w-4 h-4 p-1 -mx-1 -my-1 text-white bg-blue-600 rounded-full fill-current" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="flex flex-col items-start justify-center ml-2">
                                    <span class="flex items-center font-bold text-gray-600 dark:text-gray-200">
                                        {allData.createdby}
                                        <span class="block w-2 h-2 ml-1 bg-green-500 rounded-full">
                                        </span>
                                    </span>
                                    <span class="text-sm text-gray-400">
                                        {allData.userEmail}
                                    </span>
                                    <span class="text-sm text-gray-400">
                                        {allData.createdAt}
                                    </span>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* search bar... 
                on pause fetch data and show options according to search field */}
                <SearchByName animeList={animeList} setAnimeList={setAnimeList} listId ={id} />

                {/* add id */}
                {/* <form className="join" onSubmit={handleAddID}>
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
                </form> */}
            </div>

            <div className="overflow-x-auto mx-10 my-16">
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
                                    {anime.status}
                                    {/* <select className="form-select">
                                        <option>Completed</option>
                                        <option>Watching</option>
                                        <option>Plan to Watch</option>
                                        <option>On Hold</option>
                                        <option>Dropped</option>
                                    </select> */}
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
                                    {anime.rating}
                                    {/* <div className="flex items-center gap-1 justify-center">
                                        <input type="number" className="form-control w-10 border-2 rounded-md border-slate-500 p-1" min="1" max="10" />
                                        <button className="btn btn-ghost btn-xs">edit</button>
                                    </div> */}

                                </td>
                                <td className="text-center">{anime.type}</td>
                                <td className="text-center flex flex-wrap gap-x-2 gap-y-2 justify-center">
                                    {
                                            anime.genres.map((gen) => (
                                                // console.log(gen),
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