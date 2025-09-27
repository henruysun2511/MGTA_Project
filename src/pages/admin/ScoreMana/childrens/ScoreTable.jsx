import { DeleteOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatDateFromApi, formatDuration } from "../../../../utils/formatDate";
import { handleDelete } from '../../../../utils/handles';
import ScoreWatchDetailModal from './ScoreWatchDetailModal';
const { Column } = Table;

export default function ScoreTable({ resultData, pagination }) {
    const dispatch = useDispatch();
    const dataSource = resultData.map(rs => {
        return {
            ...rs,
            username: rs?.studentId?.name || "N/A",
            exerciseTitle: rs?.exerciseId?.title || "N/A",
            endTime: formatDateFromApi(rs.endTime),
            duration: formatDuration(rs.duration)
        };
    });

    const [editingRecord, setEditingRecord] = useState(null);
    const [openWatchDetailModal, setOpenWatchDetailModal] = useState(false);

    const handleSoftDeleteScore = async (item) => {
        await handleDelete(dispatch, "admin/exercise/result", "scores", item._id, `điểm của ${item.username}`);
    }

    return (<>
        <Table dataSource={dataSource} pagination={false}>
            <Column title="STT" key="index" render={(text, record, index) =>
                ((pagination?.currentPage - 1) * pagination?.limit) + index + 1
            } />
            <Column title="Họ và tên" dataIndex="username" key="username" />
            <Column title="Bài tập" dataIndex="exerciseTitle" key="exerciseName" />
            <Column title="Thời gian làm bài" dataIndex="duration" key="duration" />
            <Column title="Nộp lúc" dataIndex="endTime" key="endTime" />
            <Column title="Điểm" dataIndex="score" key="score" />

            <Column
                title="Hành động"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => handleSoftDeleteScore(record)} />
                        </Tooltip>
                    </Space>
                )}
            />

        </Table>

        <ScoreWatchDetailModal open={openWatchDetailModal} onCancel={() => setOpenWatchDetailModal(false)} record={editingRecord} />
    </>)
}