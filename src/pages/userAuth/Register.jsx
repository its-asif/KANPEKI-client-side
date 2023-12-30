import { useContext } from "react";
import AuthProvider, { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
    const { abcd } = useContext(AuthContext);

    console.log(abcd);
    return (
        <div>
            this is register
        </div>
    );
};

export default Register;