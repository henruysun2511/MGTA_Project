import { Tabs } from 'antd';
import Container2 from "../../../../components/Container/container2";
import useFetch from '../../../../hooks/useFetch';
import StudentClassZoom from './StudentClassZoom/StudentClassZoom';
import StudentExercise from "./StudentExercise/StudentExercise";

export default function Section2() {
    const accessToken = localStorage.getItem("accessToken");

    const [classDataRes] = useFetch('class/classes', {}, {})
    console.log(classDataRes);

    const [classStudentDataRes] = useFetch('student/class', {}, {})
    console.log(classStudentDataRes)

    const currentClass = [];
    const classData = []
    const currentAccount = [];
    const items = [
        {
            key: '1',
            label: 'Học zoom',
            children: <StudentClassZoom />,
        },
        {
            key: '2',
            label: 'Bài tập',
            children: <StudentExercise/>,
        },
    ];


    //Chưa đăng nhập
    //Hiện tất danh sách lớp
    //Đăng nhập rồi
    //Chưa phân lớp: hiện chưa phân lớp
    //Đã phân lớp: hiện lớp đó

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