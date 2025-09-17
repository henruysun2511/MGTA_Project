import { Pagination, Space } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import useQuery from '../../../hooks/useQuery';
import { fetchAction } from '../../../redux/actions/baseAction';
import ScoreFilter from './childrens/ScoreFilter';
import ScoreTable from './childrens/ScoreTable';


export default function ScoreMana() {
    const dispatch = useDispatch();

    const [query, resetQuery, updateQuery] = useQuery({
        limit: 8,
        page: 1
    });

    const [data] = useFetch("admin/exercise/results", query, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("results", data.results?.items));
        }
    }, [data, dispatch]);

    const resultData = useSelector((state) => state.results.list || []);
    console.log(resultData);

    const [classDataRes] = useFetch("admin/class/classes", {}, {});
    const classData = classDataRes?.classes?.items || [];

    const [studentDataRes] = useFetch("admin/student/students", {}, {});
    const studentData = studentDataRes?.students?.items || [];

    const [exerciseDataRes] = useFetch("admin/exercise/exercises", {}, {});
    const exerciseData = exerciseDataRes?.exercises?.items || [];

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
            const student = studentData.find(s => s._id === r.studentId._id);
            const exercise = exerciseData.find(e => e._id === r.exerciseId._id);

            if (filters.search && student && !student.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            if (filters.class !== "all") {
                if (!student || student.classId !== filters.class) return false;
            }

            if (filters.exercise !== "all") {
                if (!exercise || exercise._id !== filters.exercise) return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (filters.sort === "asc/score") return a.score - b.score;
            if (filters.sort === "dsc/score") return b.score - a.score;
            if (filters.sort === "asc/duration") return a.duration - b.duration;
            if (filters.sort === "dsc/duration") return b.duration - a.duration;
            return 0;
        });

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    return (
        <>
            <div style={padding1}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                    <ScoreFilter classData={classData} exerciseData={exerciseData} onFilterChange={handleFilterChange} />
                    <ScoreTable resultData={filteredResults} classData={classData} studentData={studentData} pagination={data?.results?.pagination}/>

                    {data?.results?.pagination && (
                        <Pagination
                            current={data.results.pagination.currentPage}
                            pageSize={data.results.pagination.limit}
                            total={data.results.pagination.count}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20', '50']}
                        />
                    )}
                </Space>
            </div>
        </>
    )
}