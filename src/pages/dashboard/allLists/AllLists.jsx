import { useForm } from "react-hook-form";
import ListTable from "./listTable/ListTable";
import { useState, useId, useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const AllLists = ({user}) => {
    const { register, handleSubmit } = useForm();
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [toggle, setToogle] = useState(true);
    const [allList, setAllList] = useState([]);
    const axiosPublic = useAxiosPublic();
    // console.log(user);


    // Post New list to Database
     const newListData = async(data) => {
        const newData = {
            listName : data.listName,
            createdAt : new Date().toLocaleDateString(),
            statusPublic : false,
            description : data.description,
            createdby : user.displayName,
            userEmail : user.email,
            userPhoto : user.photoURL,
            animeList : []
        }
        
        
        if (allList.find((list) => list.listName === newData.listName)) {
            // alert("List already exists with this name");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'List already exists with this name',
                showConfirmButton: false,
                timer: 1500
              })
        } else {
            
           await axiosPublic.post('/animelist', newData)
            .then( res => {
                console.log(res.data)
                
                setIsFormOpen(false);
                
                console.log(data.listName)

                setToogle(!toggle);
            })
        }
     }
     
    // GET animelist from database 
     const getListData = async() =>{
        const result = await axiosPublic.get(`/animelist/${user?.email}`)
        console.log(result.data);
        setAllList(result.data);
     }

     useEffect( () =>{
        getListData();
     }, [toggle])
     
    return (
        <div className="mt-10">

            {/* Add List */}
            <div  className="text-center">
                <div className={`btn btn-wide font-semibold text-lg ${isFormOpen? "btn-error text-white" : "btn-warning"}`}
                    onClick={() => setIsFormOpen(!isFormOpen)}
                >
                    {isFormOpen? 'Close Form' : 'Add a New List'}
                </div>
            </div>

            {/* Form - input listname, description, id(auto) */}
            { isFormOpen &&
            <div className="m-10 md:w-1/3 mx-auto">
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
                    {...register("description")}
                    className="textarea h-24 textarea-bordered"></textarea>

                    <div className="mt-10">
                        <input type="submit" value="Add List" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            }

            <ListTable allList={allList} toggle={toggle} setToogle={setToogle} />
        </div>
    );
};

export default AllLists;