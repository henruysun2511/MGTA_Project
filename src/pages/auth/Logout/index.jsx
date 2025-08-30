import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../../redux/actions/loginAction";

export default function Logout(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // deleteAllCookies();
    localStorage.clear();

    useEffect(() => {
        dispatch(checkLogin(false));
        navigate("/");
    }, []);
    
    return 
    (<>
    </>)
}