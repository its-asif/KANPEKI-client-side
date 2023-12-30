import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AnimeList from "./animeList/AnimeList";
import AllLists from "./allLists/AllLists";


const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {/* Title */}
            <h1 className="text-4xl font-bold text-center"> 
                Welcome {user.displayName}
            </h1>
            <h2 className="text-3xl text-center">
                Let's make your anime list
            </h2>

            {/* anime list create section */}
            <AllLists />

            {/* Table */}
            <AnimeList />
        </div>
    );
};

export default Dashboard;