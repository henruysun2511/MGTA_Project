import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDateFromApi } from "../../../../../utils/formatDate";
import { handleDelete } from '../../../../../utils/handles';
import ClassExerciseUpdateModal from "./ClassExerciseUpdateModal";
const { Column } = Table;

export default function ClassExerciseTable({ deadlineData, pagination}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const classExerciseData = deadlineData ? deadlineData.map((item, index) => ({
        ...item,
        key: index,
        exerciseName: item.exerciseId ? item.exerciseId.title : 'N/A',
        exerciseId: item.exerciseId ? item.exerciseId._id : 'N/A',
        due_date: formatDateFromApi(item.due_date)
    })) : [];

    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const handleSoftDeleteClassExercise = async (item) => {
        await handleDelete(dispatch, "admin/exercise-class", "deadlines", item._id, "");
    }

    return (
        <>
            <Table dataSource={classExerciseData} pagination={false}
            >
                <Column title="STT" key="index" render={(text, record, index) =>  (((pagination?.currentPage - 1) * pagination?.limit) + index + 1)}/>
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