import { Tabs } from 'antd';
import { useState } from 'react';
import { useSelector } from "react-redux";
import Container2 from "../../../../components/Container/container2";
import StudentClassZoom from './StudentClassZoom/StudentClassZoom';
import StudentExercise from "./StudentExercise/StudentExercise";

export default function Section2() {
    const classData = useSelector(state => state.classes.list)?.filter(cl => !cl.deleted) || [];
    const classScheduleData = useSelector(state => state.classschedules.list)?.filter(cls => !cls.deleted) || [];
    const classSessionData = useSelector(state => state.classsessions.list)?.filter(cls => !cls.deleted) || [];
    const deadlineData = useSelector(state => state.deadlines.list)?.filter(dl => !dl.deleted) || [];
    const exerciseData = useSelector(state => state.exercises.list)?.filter(ex => !ex.deleted) || [];
    const skillData = useSelector(state => state.skills.list)?.filter(sk => !sk.deleted) || [];

    const accessToken = localStorage.getItem("accessToken");

    // account hiện tại
    const accountData = useSelector(state => state.accounts.list).filter(
        acc => !acc.deleted && acc.status === "active"
    ) || [];

    const currentAccount = accountData.find(
        acc => String(acc.accessToken) === String(accessToken)
    );

    // danh sách học sinh
    const studentData = useSelector(state => state.students.list).filter(
        st => !st.deleted
    ) || [];

    // tìm học sinh theo accountId
    const currentStudent = currentAccount
        ? studentData.find(st => st.accountId === currentAccount.id)
        : null;

    const currentClass = currentStudent ? classData.find(cls => cls.id === currentStudent.classId) : [];

    const [selectedClass, setSelectedClass] = useState(currentClass || classData[0]);
 
    const filteredSchedules = selectedClass
        ? classScheduleData.filter(cs => cs.classId === selectedClass.id)
        : [];
    const filteredDeadlines = selectedClass
        ? deadlineData.filter(dl => dl.classId === selectedClass.id)
        : [];
    const filteredSessions = selectedClass
        ? classSessionData.filter(cs =>
            filteredSchedules.some(fs => String(fs.classSessionId) === String(cs.id))
        )
        : [];
    const filteredExercise = selectedClass
        ? exerciseData.filter(ex =>
            filteredDeadlines.some(dl => String(dl.exerciseId) === String(ex.id))
        )
        : [];

    const items = [
        {
            key: '1',
            label: 'Học zoom',
            children: <StudentClassZoom
                classScheduleData={filteredSchedules}
                classSessionData={filteredSessions} />,
        },
        {
            key: '2',
            label: 'Bài tập',
            children: <StudentExercise
                deadlineData={filteredDeadlines}
                exerciseData={filteredExercise}
                classData={selectedClass}
                skillData={skillData} />,
        },
    ];

    return (
        <>
            <div class="class__wrap">
                <Container2>
                    <h1>Danh sách lớp</h1>
                    <ul className='class__list'>
                        {
                            accessToken && currentClass && currentAccount?.status === "active" ? (
                                <li>{currentClass.className || "Chưa phân lớp"}</li>
                            ) : (
                                classData.map(cls => (
                                    <li
                                        className={selectedClass?.id === cls.id ? "active" : ""}
                                        key={cls.id}
                                        onClick={() => setSelectedClass(cls)}
                                    >
                                        {cls.className}
                                    </li>
                                ))
                            )
                        }
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