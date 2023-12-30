import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRouter = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    // console.log(user);
    if(loading) return <p>Loading...</p>;

    if (user) {
        return children;
    }
    else if( user == null ) return <Navigate to="/login" replace />; 
};

export default PrivateRouter;