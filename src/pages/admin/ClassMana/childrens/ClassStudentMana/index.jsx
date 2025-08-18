import { Space } from 'antd';
import { useEffect } from 'react';
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
    
    return (
    <>
        <Space direction='vertical' size="large" style={{ width: "100%" }}>
            <ClassStudentFilter />
            <ClassStudentTable classStudentData={classStudentData} />
        </Space>
    </>
    )
}