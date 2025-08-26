import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAction } from "../../../../../redux/actions/baseAction";
import { getAllData } from "../../../../../services/baseService";
import ClassExerciseTable from './/ClassExerciseTable';
import ClassExerciseCreateModal from './ClassExerciseCreateModal';
import ClassExerciseFilter from './ClassExerciseFilter';

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

    const [filters, setFilters] = useState({
        keyword: "",
        date: null,
        sort: "all"
    });

    const handleFilterChange = ({ type, value }) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const filteredDeadlineData = deadlineDataByClassId.map(dl => {
        const exercise = exerciseData.find(ex => String(ex.id) === String(dl.exerciseId));
        return {
            ...dl,
            exerciseName: exercise ? exercise.title : "Không xác định",
            deadline: dl.deadline
        };
    })
        .filter(item => {
            // filter keyword theo tên bài tập
            if (filters.keyword && !item.exerciseName.toLowerCase().includes(filters.keyword.toLowerCase())) {
                return false;
            }

            // filter theo ngày hạn nộp
            if (filters.date) {
                const selectedDate = filters.date.startOf("day"); 
                const deadlineDate = dayjs(item.due_date).startOf("day");
                if (!deadlineDate.isSame(selectedDate)) return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (filters.sort === "asc/date") {
                return new Date(a.due_date) - new Date(b.due_date);
            }
            if (filters.sort === "desc/date") {
                return new Date(b.due_date) - new Date(a.due_date);
            }
            return 0;
        });

    return (
        <>
            <Space direction='vertical' size="large" style={{ width: "100%" }}>
                <ClassExerciseFilter onFilterChange={handleFilterChange} />
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
                <ClassExerciseTable deadlineDataByClassId={filteredDeadlineData} exerciseData={exerciseData} />
            </Space>

            <ClassExerciseCreateModal
                open={openModal}
                onClose={() => setModalVisible(false)}
                exerciseData={exerciseData}
                classId={id}
            />
        </>
    )
}