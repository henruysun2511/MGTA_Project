import { PlusOutlined } from '@ant-design/icons';
import { Button, Pagination, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from '../../../../hooks/useFetch';
import useQuery from '../../../../hooks/useQuery';
import { fetchAction } from '../../../../redux/actions/baseAction';
import ClassExerciseCreateModal from './childrens/ClassExerciseCreateModal';
import ClassExerciseTable from './childrens/ClassExerciseTable';

export default function ClassExerciseMana({ classId }) {
    const dispatch = useDispatch();
    const id = classId;
    const [data] = useFetch(`admin/exercise-class/${id}`, {}, {});
    const deadlineData = useSelector((state) => state.deadlines.list || []);
    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 50
    });
    const [exerciseDataRes] = useFetch(`admin/exercise/exercises`, query, {});
    const exerciseData = useSelector(state => state.exercises.list || []);
    const [openModal, setModalVisible] = useState(false);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("deadlines", data.items));
        }
    }, [data, dispatch])

    useEffect(() => {
        if (exerciseDataRes) {
            dispatch(fetchAction("exercises", exerciseDataRes.exercises?.items));
        }
    }, [exerciseDataRes, dispatch])

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    return (
        <>
            <Space direction='vertical' size="large" style={{ width: "100%" }}>
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
                <ClassExerciseTable deadlineData={deadlineData} pagination={data?.pagination} />
                {data?.pagination && (
                    <Pagination
                        current={data.pagination.currentPage}
                        pageSize={data.pagination.limit}
                        total={data.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                )}
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