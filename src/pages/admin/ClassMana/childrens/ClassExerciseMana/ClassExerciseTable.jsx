import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../../../../hooks/usePagination';
import { softDeleteAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';
import ClassExerciseUpdateModal from "./ClassExerciseUpdateModal";
const { Column } = Table;

export default function ClassExerciseTable({ deadlineDataByClassId, exerciseData }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const classExerciseData = deadlineDataByClassId.map((item, index) => ({
        ...item,
        exerciseName: exerciseData.find(ex => String(ex.id) === String(item.exerciseId))?.title || "",
        exerciseId: exerciseData.find(ex => String(ex.id) === String(item.exerciseId))?.id || "",
    }));

    const { getPagination, getIndex } = usePagination(5);
    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const handleSoftDeleteClassExercise = async (item) => {
        dispatch(softDeleteAction("deadlines", item.id));
        const res = await updateData("deadlines", item.id, { ...item, deleted: true });
        if (res) {
            alert("Đã chuyển vào thùng rác");
        } else {
            alert("Không thể xóa");
        }
    }

    return (
        <>
            <Table dataSource={classExerciseData} pagination={getPagination(classExerciseData.length)}
            >
                <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                <Column title="Bài tập" dataIndex="exerciseName" key="shift" />
                <Column title="Hạn nộp" dataIndex="due_date" key="shift" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Tooltip title="Chỉnh sửa">
                                <EditOutlined onClick={() => { setOpenModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <DeleteOutlined onClick={() => handleSoftDeleteClassExercise(record)} />
                            </Tooltip>
                            <Tooltip title="Xem chi tiết">
                                <EyeOutlined onClick={() => { navigate(`/admin/exerciseDetailMana/:${record.exerciseId}`) }} />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>

            <ClassExerciseUpdateModal onCancel={() => setOpenModal(false)} open={openModal} record={editingRecord} />

        </>
    )
}