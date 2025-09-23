import { Tabs } from "antd";
import ClassExerciseMana from "./ClassExerciseMana/index.jsx";
import ClassStudentMana from "./ClassStudentMana/index.jsx";

export default function ClassTab({ classId }) {
    const items = [
        {
            key: "students",
            label: "Danh sách học sinh",
            children:  <ClassStudentMana classId={classId} />,
        },
        {
            key: "exercises",
            label: "Bài tập đã giao",
            children:  <ClassExerciseMana classId={classId} />,
        },
    ];

    return (
        <>
            <Tabs size="large" items={items}/>
        </>
      
    )
}