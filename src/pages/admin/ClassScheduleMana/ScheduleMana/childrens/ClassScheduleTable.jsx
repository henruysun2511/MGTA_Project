import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatDateFromApi } from "../../../../../utils/formatDate";
import { handleDelete } from '../../../../../utils/handles';
import ClassScheduleUpdateModal from './ClassScheduleUpdateModal';
const { Column } = Table;

export default function ClassScheduleTable({ classScheduleData, classData, classSessionData, pagination }) {
    const dispatch = useDispatch();

    const initialData = classScheduleData?.map((item, index) => ({
        ...item,
        className: item.classId?.className || classData.find(cls => String(cls._id) === String(item.classId))?.className || "",
        classSessionName: item.classSessionId?.classSessionName || classSessionData.find(cls => String(cls._id) === String(item.classSessionId))?.classSessionName || "",
        schedule: formatDateFromApi(item.schedule)
    }));

    const handleSoftDeleteClassSchedule = async (item) => {
        await handleDelete(dispatch, "admin/class-schedule", "classschedules", item._id, "lịch học");
    }

    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);


    return (<>
        <Table dataSource={initialData} pagination={false} rowKey="_id">
            <Column
                title="STT"
                key="index"
                render={(text, record, index) =>
                    ((pagination?.currentPage - 1) * pagination?.limit) + index + 1
                }
            />
            <Column title="Ca học" dataIndex="classSessionName" key="shift" />
            <Column title="Lớp" dataIndex="className" key="classroom" />
            <Column title="Lịch" dataIndex="schedule" key="schedule" />
            <Column title="Link zoom" dataIndex="linkZoom" key="zoom" />
            <Column
                title="Hành động"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <Tooltip title="Chỉnh sửa">
                            <EditOutlined onClick={() => { setOpenModal(true); setEditingRecord(record); }} />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => handleSoftDeleteClassSchedule(record)} />
                        </Tooltip>

                    </Space>
                )}
            />
        </Table>

        <ClassScheduleUpdateModal open={openModal}
            onCancel={() => { setOpenModal(false); setEditingRecord(null); }}
            record={editingRecord}
            classData={classData}
            classSessionData={classSessionData}
        />
    </>)
}