import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const ListTable = ({allList, toggle, setToogle}) => {
    const axiosPublic = useAxiosPublic();
    const [isPhone, setIsPhone] = useState(false);

    const updateStatus = async (id, status) => {
        // console.log(id, status);
        const result = await axiosPublic.patch(`/animelist/status/${id}`, {status : status});
        setToogle(!toggle);
        console.log(result.data);
        
    }

    const handleDelete = async (id) => {
        const res = await axiosPublic.delete(`/animelist/${id}`);
        setToogle(!toggle);
        console.log(res.data);
    }

    useEffect(() => {
        if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
            setIsPhone(true) ;
         } else {
            setIsPhone(false) ;
         }
    }, []);

    return (
        <div class="container max-w-3xl px-4 mx-auto sm:px-8 mt-10">
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                { isPhone? null : <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    #
                                </th>}
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    List Name
                                </th>
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Created at
                                </th>
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    status
                                </th>
                                { isPhone? null :
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Description
                                </th>}
                                <th scope="col" class="px-2 md:px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allList.map((list, index) => (
                                    <tr key={list._id}>
                                        { isPhone ? null :
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {index + 1}
                                            </p>
                                        </td>}
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
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200"
                                            onClick={() => updateStatus(list._id, list.statusPublic)}
                                        >
                                            {list.statusPublic ?
                                            <span class="font-semibold btn btn-sm rounded-full bg-green-200 text-green-900 hover:bg-red-200">
                                                Public
                                            </span>
                                            : 
                                            <span class="font-semibold btn btn-sm rounded-full bg-red-200 text-red-900 hover:bg-green-200">
                                                 Private
                                            </span>
                                            }
                                        </td>
                                        { isPhone ? null :
                                            <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {list.description}
                                            </p>
                                        </td>}
                                        <td class="px-2 md:px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                                            <div className="flex gap-4 flex-col md:flex-row">
                                                <Link to={`/animelist/${list._id}`}>
                                                    <button className="btn btn-sm bg-gray-700 text-white">Details</button>
                                                </Link>
                                                <div to={`/animelist/${list._id}`}
                                                    onClick={() => handleDelete(list._id)}
                                                >
                                                    <button className="btn btn-sm btn-error text-white">Delete</button>
                                                </div>
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

export default ListTable;