import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const SearchByName = ({listId, setAnimeData, animeData}) => {
    const { register, handleSubmit } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const axiosPublic = useAxiosPublic();

  const fetchSearchResults = async(searchTerm) => {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=10`)
    setSearchResults(res.data.data);
    console.log(res.data.data);
    }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        fetchSearchResults(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [ tempId, setTempId ] = useState('');
  const [ clickedData, setClickedData ] = useState({});

  const handleAddAnimeId = (data) => {
    document.getElementById('my_modal_3').showModal();
    console.log(data);
    setClickedData(data);
  }

  const handleAddWithRating = () => {}

  return (
    <div >
        {/* MODAL */}
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {/* name of the anime clicked */}
                <h1 className="text-2xl font-bold">Add to List</h1>
                <h1 className="text-xl font-bold text-left my-2"><span className='font-normal'>Details for</span> {searchResults.find((anime) => anime.mal_id == clickedData.mal_id )?.title_english}</h1>

                {/* take personal rating and status in input and combine it with id and patch in backend */}
                <form onSubmit={handleSubmit((data) => {
                    // console.log(data);
                    console.log( {...clickedData, ...data} )
                    axiosPublic.patch(`/animelist/${listId}`, {...clickedData, ...data});
                    // setAnimeList([...animeList, tempId]);
                    setAnimeData([...animeData, {...clickedData, ...data}]);
                    document.getElementById('my_modal_3').close();
                }
                )} method="dialog" className="flex flex-col gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label> 
                        <select {...register("status")} className="select select-bordered w-full max-w-xs">
                            <option value="watching">Watching</option>
                            <option value="completed">Completed</option>
                            <option value="on_hold">On Hold</option>
                            <option value="dropped">Dropped</option>
                            <option value="plan_to_watch">Plan to Watch</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label> 
                        <select {...register("rating")} className="select select-bordered w-full max-w-xs">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <input className="btn btn-primary" type="submit" value="Add" />
                    </div>
                </form>

            </div>
        </dialog>


        <div className="dropdown mx-10 w-full md:w-1/3">
            {/* <div tabIndex={0} role="search" className="btn m-1">Click</div> */}
            {/* Search Field */}
            <div className="">
                <input
                type="text"
                tabIndex={0} 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Search Anime"
                value={searchTerm}
                onChange={handleChange}
                />
            </div>

            {/*  */}
            { searchTerm.length > 0 &&
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box ">
                {searchResults.map((result) => (
                    <li key={result.mal_id} className="w-full ">
                        <div className='grid grid-cols-3 text-left w-full'>
                            <div className='w-24 h-16 '>
                                <img src={result.images.webp.image_url} className='w-full h-full' />
                            </div>
                            <div className='text-left  col-span-2 px-4'>
                                <h1 className='font-bold'>{result.title_english}</h1>
                                <p className='text-sm'>{result.type} - {result.year}</p>
                                <p className='text-sm'>Rating : {result.score}</p>
                            </div>
                            <button
                                className='btn btn-warning btn-sn'
                                onClick={() => handleAddAnimeId(result)}
                            >Add to List</button>
                        </div>
                    </li>
                ))}
            </ul>}
        </div>


    </div>
  );
};

export default SearchByName;
