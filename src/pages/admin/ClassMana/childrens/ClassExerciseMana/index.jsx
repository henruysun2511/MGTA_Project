import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAction } from "../../../../../redux/actions/baseAction";
import { getAllData } from "../../../../../services/baseService";
import ClassExerciseCreateModal from './ClassExerciseCreateModal';
import ClassExerciseFilter from './ClassExerciseFilter';
import ClassExerciseTable from "./ClassExerciseTable";


export default function ClassExerciseMana({ classId }) {
    const dispatch = useDispatch();
    const id = classId;
    useEffect(() => {
        getAllData("deadlines").then((res) => { dispatch(fetchAction("deadlines", res)) });
        getAllData("exercises").then((res) => { dispatch(fetchAction("exercises", res)) });
    }, [dispatch])

    const deadlineData = useSelector((state) => state.deadlines.list).filter(dl => !dl.deleted);
    const exerciseData = useSelector((state) => state.exercises.list).filter(ex => !ex.deleted);

    const deadlineDataByClassId = deadlineData.filter((item) => String(item.classId) === String(id));

    const [openModal, setModalVisible] = useState(false);

    return (
        <>
            <Space direction='vertical' size="large" style={{ width: "100%" }}>
                <ClassExerciseFilter />
                <div style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        size=" middle"
                        icon={<PlusOutlined />}
                        onClick={() => { setModalVisible(true) }}
                    >
                        Giao thêm bài tập mới
                    </Button>
                </div>
                <ClassExerciseTable deadlineDataByClassId={deadlineDataByClassId} exerciseData={exerciseData}/>
            </Space>

            <ClassExerciseCreateModal open={openModal} onClose={() => setModalVisible(false)} 
            exerciseData={exerciseData} classId ={id}/>
        </>
    )
}