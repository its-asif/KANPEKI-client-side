import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const PublicList = () => {
    const [publicList, setPublicList] = useState([]);
    const axiosPublic = useAxiosPublic();
    

    // Update status of list
    const getPublicList = async() => {
        const result = await axiosPublic.get('/animelist/public');
        console.log(result.data);
        setPublicList(result.data);
    }
    useEffect(  () =>  {
        getPublicList();
    },[])

    return (
        <div class="container max-w-3xl px-4 mx-auto sm:px-8 mt-10">
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                 <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    #
                                </th>
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    List Name
                                </th>
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Created at
                                </th>
                                
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Created By
                                </th>
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                publicList.map((list, index) => (
                                    <tr key={list._id}>
                                       
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {index + 1}
                                            </p>
                                        </td>
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {list.listName}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {list.createdAt}
                                            </p>
                                        </td>
                                        
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {list.createdby}
                                            </p>
                                        </td>
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                                            <div className="flex gap-4 flex-col md:flex-row">
                                                <Link to={`/animelist/${list._id}`}>
                                                    <button className="btn btn-sm bg-gray-700 text-white">Details</button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
    );
};

export default PublicList;