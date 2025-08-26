import { Space } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import { fetchAction } from '../../../redux/actions/baseAction';
import { getAllData } from '../../../services/baseService';
import ScoreFilter from './childrens/ScoreFilter';
import ScoreTable from './childrens/ScoreTable';


export default function ScoreMana() {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllData("results").then((res) => { dispatch(fetchAction("results", res)); });
        getAllData("classes").then((res) => { dispatch(fetchAction("classes", res)); });
        getAllData("students").then((res) => { dispatch(fetchAction("students", res)); });
        getAllData("exercises").then((res) => { dispatch(fetchAction("exercises", res)); });
    }, [dispatch]);

    const resultData = useSelector((state) => state.results.list);
    const studentData = useSelector((state) => state.students.list).filter(ex => !ex.deleted);
    const classData = useSelector((state) => state.classes.list).filter(ex => !ex.deleted);
    const exerciseData = useSelector((state) => state.exercises.list).filter(ex => !ex.deleted);

   const [filters, setFilters] = useState({
        search: "",
        sort: "all",
        class: "all",
        exercise: "all"
    });

    const handleFilterChange = ({ type, value }) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const filteredResults = resultData
        .filter(r => {
            const student = studentData.find(s => s.id === r.studentId);
            const exercise = exerciseData.find(e => e.id === r.exerciseId);

            if (filters.search && student && !student.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            if (filters.class !== "all") {
                if (!student || student.classId !== filters.class) return false;
            }

            if (filters.exercise !== "all") {
                if (!exercise || exercise.id !== filters.exercise) return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (filters.sort === "asc/score") return a.score - b.score;
            if (filters.sort === "dsc/score") return b.score - a.score;
            if (filters.sort === "asc/duration") return a.duration.localeCompare(b.duration);
            if (filters.sort === "dsc/duration") return b.duration.localeCompare(a.duration);
            return 0;
        });

    return (
        <>
            <div style={padding1}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                    <ScoreFilter classData={classData} exerciseData={exerciseData} onFilterChange={handleFilterChange}/>
                    <ScoreTable resultData={filteredResults} studentData={studentData} classData={classData} exerciseData={exerciseData} />
                </Space>
            </div>
        </>
    )
}