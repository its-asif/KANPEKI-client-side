import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AnimeList from "./animeList/AnimeList";


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

            {/* Table */}
            <AnimeList />
        </div>
    );
};

export default Dashboard;