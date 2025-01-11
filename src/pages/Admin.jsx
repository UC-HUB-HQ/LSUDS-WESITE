import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/User";
const Admin = () => {

    // const navigate = useNavigate();

    // const { login } = useUser();

    // async function init() {
    //     try {
    //         const loggedIn = await account.get();
    //         setUser(loggedIn);
    //     }
    //     catch (err) {
    //         setUser(null);
    //         navigate;
    //     }
    // }
    
    // useEffect(() => {
    // init();
    // }, []);

    return (
        <h1>Admin Page</h1>
    )
}

export default Admin