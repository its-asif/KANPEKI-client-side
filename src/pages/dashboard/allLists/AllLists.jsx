import { useForm } from "react-hook-form";
import ListTable from "./listTable/ListTable";
import { useState, useId } from "react";


const AllLists = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { register, handleSubmit } = useForm();

    const [allList, setAllList] = useState([ 
        {
            id: 154538365,
            listName : "Super Anime List",
            createdAt : "12/09/2020",
            statusPublic : false,
            description : "text Description"
        },
        {
            id: 234243239,
            listName : "Super Anime List",
            createdAt : "11/11/2019",
            statusPublic : true,
            description : "text Description 12121"
        }
     ]);

     const newListData = (data) => {
        const newData = {
            id: new Date().getTime(),
            listName : data.listName,
            createdAt : new Date().toLocaleDateString(),
            statusPublic : false,
            description : data.descriptin
        }
        // console.log(newData);
        if (allList.find((list) => list.listName === newData.listName)) {
            alert("List already exists with this name");
        } else {
            setAllList((prev) => [...prev, newData]);
        }
     }
     
    return (
        <div className="mt-10">

            {/* Add List */}
            <div  className="text-center">
                <div className="btn btn-wide btn-warning"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                >
                    {isFormOpen? 'Close Form' : 'Add List'}
                </div>
            </div>

            {/* Form - input listname, description, id(auto) */}
            { isFormOpen &&
            <div className="m-10 w-1/3 mx-auto">
                <form className="form-control"
                    onSubmit={handleSubmit((data) => newListData(data))}
                >
                    <label className="label">
                        <span className="label-text">List Name</span>
                    </label> 
                    <input type="text" placeholder="List Name" 
                    className="input input-bordered" 
                    {...register("listName", {required: true}) }
                    />

                    <label className="label">
                        <span className="label-text">Description</span>
                    </label> 
                    <textarea placeholder="Description" 
                    {...register("description", {required: true})}
                    className="textarea h-24 textarea-bordered"></textarea>

                    <div className="mt-10">
                        <input type="submit" value="Add List" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            }

            <ListTable allList={allList} />
        </div>
    );
};

export default AllLists;