import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { fetchAction } from "../../../redux/actions/baseAction";
import Section1 from "./childrens/section1";
import Section2 from "./childrens/section2";
import "./profile.scss";

export default function Profile() {
    const dispatch = useDispatch();
    const [studentDataRes] = useFetch("student/profile", {}, {});

    useEffect(() => {
        if (studentDataRes) {
            dispatch(fetchAction("students", [studentDataRes]));
        }
    }, [dispatch, studentDataRes]);

    return (
        <>
            <Section1 />
            <Section2 />
        </>
    )
}