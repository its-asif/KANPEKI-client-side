import { Outlet } from "react-router-dom";
import Navbar from "../pages/main/shared/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar />  
            <Outlet />
        </div>
    );
};

export default Main;