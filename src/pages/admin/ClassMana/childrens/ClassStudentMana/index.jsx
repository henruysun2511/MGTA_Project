import { Pagination, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../../hooks/useFetch';
import useQuery from '../../../../../hooks/useQuery';
import { fetchAction } from '../../../../../redux/actions/baseAction';
import ClassStudentFilter from './ClassStudentFilter';
import ClassStudentTable from './ClassStudentTable';

export default function ClassStudentMana({ classId }) {
    const dispatch = useDispatch(); 

    const [query, updateQuery, resetQuery] = useQuery({ page: 1, limit: 10 });

    const [studentDataRes] = useFetch("admin/student/students", query, {});
    console.log(studentDataRes)

    useEffect(() => {
        if (studentDataRes) {
            dispatch(fetchAction("students", studentDataRes?.students?.items));
        }
    }, [studentDataRes, dispatch]);

    const studentData = useSelector(state => state.students.list || []).filter(st => !st.deleted);
    const classStudentData = studentData.filter((item) => String(item.classId?._id) === String(classId));


    const handleFilterChange = (newFilter) => {
        updateQuery({
            ...newFilter,
            page: 1, // reset về page 1 khi filter
        });
    };

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };


    return (
        <>
            <Space direction='vertical' size="large" style={{ width: "100%" }}>
                <ClassStudentFilter onFilterChange={handleFilterChange} />
                <ClassStudentTable classStudentData={studentData} pagination={studentDataRes?.students?.pagination} />

                {studentDataRes?.students?.pagination && (
                    <Pagination
                        current={studentDataRes.students.pagination.currentPage}
                        pageSize={studentDataRes.students.pagination.limit}
                        total={studentDataRes.students.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                )}
            </Space>
        </>
    )
}