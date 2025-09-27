import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../../redux/actions/loginAction";

import { createData } from "../../../services/baseService";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const logout = async () => {
            try {
                await createData("auth/logout", {});
            } catch (err) {
                console.error("Lỗi logout:", err);
            } finally {
                localStorage.clear();
                dispatch(checkLogin(false));
                navigate("/");
            }
        };

        logout();
    }, [dispatch, navigate]);

    return null; 
}