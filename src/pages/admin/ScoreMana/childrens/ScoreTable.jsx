import { EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { usePagination } from '../../../../hooks/usePagination';
import { formatDateFromApi } from "../../../../utils/formatDate";
import ScoreWatchDetailModal from './ScoreWatchDetailModal';
const { Column } = Table;

export default function ScoreTable({ classData, resultData, studentData, exerciseData }) {
    const dataSource = resultData.map(rs => {
        const studentByStudentId = studentData.find(st => st.id === rs.studentId) || {};
        const classByClassId = classData.find(cl => cl.id === studentByStudentId.classId) || {};
        const exerciseByExerciseId = exerciseData.find(ex => ex.id === rs.exerciseId) || {};

        return {
            ...rs,
            studentName: studentByStudentId.name || "N/A",
            className: classByClassId.className || "N/A",
            exerciseTitle: exerciseByExerciseId.title || "N/A",
            endTime: formatDateFromApi(rs.endTime)
        };
    });

    const { getPagination, getIndex } = usePagination(10);
    const [editingRecord, setEditingRecord] = useState(null);
    const [openWatchDetailModal, setOpenWatchDetailModal] = useState(false);

    return (<>
        <Table dataSource={dataSource} pagination={getPagination(dataSource.length)}>
            <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
            <Column title="Họ và tên" dataIndex="studentName" key="studentName" />
            <Column title="Lớp" dataIndex="className" key="className" />
            <Column title="Bài tập" dataIndex="exerciseTitle" key="exerciseName" />
            <Column title="Thời gian làm bài" dataIndex="duration" key="duration" />
            <Column title="Nộp lúc" dataIndex="endTime" key="endTime" />
            <Column title="Điểm" dataIndex="score" key="score" />

            <Column
                title="Hành động"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <Tooltip title="Xem chi tiết điểm số">
                            <EyeOutlined onClick={() => { setOpenWatchDetailModal(true); setEditingRecord(record); }} />
                        </Tooltip>
                    </Space>
                )}
            />

        </Table>

        <ScoreWatchDetailModal open={openWatchDetailModal} onCancel={() => setOpenWatchDetailModal(false)} record={editingRecord}/>
    </>)
}