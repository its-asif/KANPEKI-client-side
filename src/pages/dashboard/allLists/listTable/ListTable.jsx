import { Link } from "react-router-dom";


const ListTable = ({allList}) => {
    return (
        <div class="container max-w-3xl px-4 mx-auto sm:px-8 mt-10">
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    #
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    List Name
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Created at
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    status
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Description
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allList.map((list, index) => (
                                    <tr key={list._id}>
                                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {index + 1}
                                            </p>
                                        </td>
                                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {list.listName}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {list.createdAt}
                                            </p>
                                        </td>
                                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
                                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {list.description}
                                            </p>
                                        </td>
                                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <Link to={`/animelist/${list._id}`}>
                                                <button className="btn btn-sm btn-ghost">Details</button>
                                            </Link>
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