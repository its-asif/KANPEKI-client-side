import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/main/home/Home";
import TopAnime from "../pages/main/GeneralAnimeSection/TopAnime";
import AnimeDetails from "../pages/main/GeneralAnimeSection/animeDetails/AnimeDetails";
import Login from "../pages/userAuth/Login";
import Register from "../pages/userAuth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";
import AnimeList from "../pages/dashboard/animeList/AnimeList";
import PublicList from "../pages/publicList/PublicList";
import PublicAnimeList from "../pages/publicList/PublicAnimeList";

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
            },
            {
                path: '/register',
                element: <Register/>,
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard/></PrivateRouter>,
            },
            {
                path: 'animelist/:id',
                element: <AnimeList /> ,
            },
            {
                path: '/publicList',
                element: <PublicList/>,
            },
            {
                path: 'publicAnimelist/:id',
                element: <PublicAnimeList /> ,
            },
        ],
    },
]);

export default router;