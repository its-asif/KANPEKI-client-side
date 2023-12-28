import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/main/home/Home";
import TopAnime from "../pages/main/GeneralAnimeSection/TopAnime";
import AnimeDetails from "../pages/main/GeneralAnimeSection/animeDetails/AnimeDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/top-anime",
                element: <TopAnime />,
            },
            {
                path: "/animeDeails/:id",
                element: <AnimeDetails />,
            }
        ],
    },
]);

export default router;