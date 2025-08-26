import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAction } from '../../../../../redux/actions/baseAction';
import { getAllData } from '../../../../../services/baseService';
import ClassStudentFilter from './ClassStudentFilter';
import ClassStudentTable from './ClassStudentTable';

export default function ClassStudentMana({ classId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllData("students").then((res) => { dispatch(fetchAction("students", res)) });
    }, [dispatch]);

    const studentData = useSelector(state => state.students.list).filter(st => !st.deleted);
    const classStudentData = studentData.filter((item) => String(item.classId) === String(classId));

    const [filters, setFilters] = useState({
        keyword: "",
        sort: "all",
    });

    const handleFilterChange = ({ type, value }) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };

    const filteredStudentData = classStudentData
        .filter((st) => {
            if (
                filters.keyword &&
                !st.name.toLowerCase().includes(filters.keyword.toLowerCase())
            ) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (filters.sort === "asc/name") {
                return a.name.localeCompare(b.name, "vi", { sensitivity: "base" });
            }
            if (filters.sort === "desc/name") {
                return b.name.localeCompare(a.name, "vi", { sensitivity: "base" });
            }
            return 0;
        });

    return (
        <>
            <Space direction='vertical' size="large" style={{ width: "100%" }}>
                <ClassStudentFilter onFilterChange={handleFilterChange}/>
                <ClassStudentTable classStudentData={filteredStudentData} />
            </Space>
        </>
    )
}