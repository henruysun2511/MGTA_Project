import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchAction } from "../../../redux/actions/baseAction";
import { getAllData } from "../../../services/baseService";
import Section1 from "./childrens/section1";
import Section2 from "./childrens/section2";
import "./curriculumn.scss";
function Curriculum() {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllData("classes").then((res) => { dispatch(fetchAction("classes", res)); });
        getAllData("deadlines").then((res) => { dispatch(fetchAction("deadlines", res)); });
        getAllData("exercises").then((res) => { dispatch(fetchAction("exercises", res)); });
        getAllData("classschedules").then((res) => { dispatch(fetchAction("classschedules", res)); });
        getAllData("classsessions").then((res) => { dispatch(fetchAction("classsessions", res)); });
        getAllData("skills").then((res) => { dispatch(fetchAction("skills", res)); });
        getAllData("accounts").then((res) => { dispatch(fetchAction("accounts", res)); });
        getAllData("students").then((res) => { dispatch(fetchAction("students", res)); });
        getAllData("results").then((res) => { dispatch(fetchAction("results", res)); });
    }, [dispatch]);

    return (
        <>
            <Section1 />
            <Section2 />
        </>
    );
}

export default Curriculum;