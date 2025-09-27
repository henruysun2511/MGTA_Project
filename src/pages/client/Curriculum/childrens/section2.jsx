import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import Container2 from "../../../../components/Container/container2";
import useFetch from '../../../../hooks/useFetch';
import StudentClassZoom from './StudentClassZoom/StudentClassZoom';
import StudentExercise from "./StudentExercise/StudentExercise";

export default function Section2() {
    const accessToken = localStorage.getItem("accessToken");
    const roleId = localStorage.getItem("roleId");
    const roleEnv = import.meta.env.VITE_ROLE_ID;

    // Danh sách lớp
    const [classDataRes] = useFetch('class/classes', {}, {})
    const classData = classDataRes?.classes ?? [];

    // Lớp của học sinh đang đăng nhập
    const [classStudentDataRes] = useFetch('student/class', {}, {})
    const classStudentData = classStudentDataRes?.classId ?? null;

    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        if (accessToken) {
            if (classStudentData?._id) {
                setSelectedClass(classStudentData);
            }
        } else {
            if (classData.length > 0) {
                setSelectedClass(classData[0]);
            }
        }
    }, [accessToken, classData, classStudentData]);

    const items = [
        {
            key: '1',
            label: 'Học zoom',
            children: selectedClass ? <StudentClassZoom classId={selectedClass._id} /> : null,
        },
        {
            key: '2',
            label: 'Bài tập',
            children: selectedClass ? <StudentExercise classId={selectedClass._id} /> : null,
        },
    ];


    return (
        <>
            <div class="class__wrap">
                <Container2>
                    <h1>Danh sách lớp</h1>
                    <ul className='class__list'>
                        {
                            accessToken ?
                                <>
                                    {roleId === roleEnv ?
                                        (
                                            classData ? classData.map(cls => (
                                                <li
                                                    className={selectedClass?._id === cls._id ? "active" : ""}
                                                    key={cls.id}
                                                    onClick={() => setSelectedClass(cls)}
                                                >
                                                    {cls.className}
                                                </li>
                                            )) : <p>Lỗi khi tải lớp</p>
                                        ) :
                                        (
                                            classStudentData ? (
                                                <li className='active'>
                                                    {classStudentData.className}
                                                </li>
                                            ) : (
                                                <li>Chưa phân lớp
                                                </li>
                                            )

                                        )
                                    }
                                </> :
                                (
                                classData ? classData.map(cls => (
                                    <li
                                        className={selectedClass?._id === cls._id ? "active" : ""}
                                        key={cls.id}
                                        onClick={() => setSelectedClass(cls)}
                                    >
                                        {cls.className}
                                    </li>
                                )) : <p>Lỗi khi tải lớp</p>
                            )
                        }
                        {/* {
                            accessToken ? (
                                classStudentData ? (
                                    <li className='active'>
                                        {classStudentData.className}
                                    </li>
                                ) : (
                                    <li>Chưa phân lớp
                                    </li>
                                )

                            ) : (
                                classData ? classData.map(cls => (
                                    <li
                                        className={selectedClass?._id === cls._id ? "active" : ""}
                                        key={cls.id}
                                        onClick={() => setSelectedClass(cls)}
                                    >
                                        {cls.className}
                                    </li>
                                )) : <p>Lỗi khi tải lớp</p>
                            )
                        } */}
                    </ul>
                </Container2>
            </div>
            <div class="curriculumn__section-2">
                <Container2>
                    <Tabs defaultActiveKey="1" items={items} centered size='large' />
                </Container2>
            </div >
        </>
    )
}

