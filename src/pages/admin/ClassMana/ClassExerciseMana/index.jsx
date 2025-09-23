import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import ClassExerciseCreateModal from './childrens/ClassExerciseCreateModal';
import ClassExerciseFilter from './childrens/ClassExerciseFilter';
import ClassExerciseTable from './childrens/ClassExerciseTable';

export default function ClassExerciseMana({ classId }) {
    const dispatch = useDispatch();
    const id = classId;
    const [data] = useFetch(`admin/exercise-class/${id}`, {}, {});
    const deadlineData = useSelector((state) => state.deadlines.list || []);
    const [exerciseDataRes] = useFetch(`admin/exercise/exercises`, {}, {});
    const exerciseData = exerciseDataRes?.exercises?.items ? exerciseDataRes?.exercises?.items : [];
    const [openModal, setModalVisible] = useState(false);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("deadlines", data.items));
        }
    }, [data, dispatch])


    const [filters, setFilters] = useState({
        keyword: "",
        date: null,
        sort: "all"
    });

    const handleFilterChange = ({ type, value }) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    // const filteredDeadlineData = deadlineDataByClassId.map(dl => {
    //     const exercise = exerciseData.find(ex => String(ex.id) === String(dl.exerciseId));
    //     return {
    //         ...dl,
    //         exerciseName: exercise ? exercise.title : "Không xác định",
    //         deadline: dl.deadline
    //     };
    // })
    //     .filter(item => {
    //         // filter keyword theo tên bài tập
    //         if (filters.keyword && !item.exerciseName.toLowerCase().includes(filters.keyword.toLowerCase())) {
    //             return false;
    //         }

    //         // filter theo ngày hạn nộp
    //         if (filters.date) {
    //             const selectedDate = filters.date.startOf("day"); 
    //             const deadlineDate = dayjs(item.due_date).startOf("day");
    //             if (!deadlineDate.isSame(selectedDate)) return false;
    //         }

    //         return true;
    //     })
    //     .sort((a, b) => {
    //         if (filters.sort === "asc/date") {
    //             return new Date(a.due_date) - new Date(b.due_date);
    //         }
    //         if (filters.sort === "desc/date") {
    //             return new Date(b.due_date) - new Date(a.due_date);
    //         }
    //         return 0;
    //     });

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
                <ClassExerciseTable deadlineData={deadlineData} />
            </Space>

            <ClassExerciseCreateModal
                open={openModal}
                onCancel={() => setModalVisible(false)}
                exerciseData={exerciseData}
                classId={id}
            />
        </>
    )
}