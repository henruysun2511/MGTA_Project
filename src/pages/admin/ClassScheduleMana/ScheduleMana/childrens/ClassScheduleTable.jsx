import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../../hooks/usePagination';
import { softDeleteAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';
import { formatDateFromApi } from "../../../../../utils/formatDate";
import ClassScheduleUpdateModal from './ClassScheduleUpdateModal';
const { Column } = Table;

export default function ClassScheduleTable({ classScheduleData, classData, classSessionData }) {
    const initialData = classScheduleData.map((item, index) => ({
        ...item,
        className: classData.find(cls => String(cls.id) === String(item.classId))?.className || "",
        classSessionName: classSessionData.find(cls => String(cls.id) === String(item.classSessionId))?.name || "",
        schedule: formatDateFromApi(classScheduleData[index].schedule)
    }));

    const dispatch = useDispatch();

    const handleSoftDeleteClassSchedule = async (item) => {
        dispatch(softDeleteAction("classschedules", item.id));
        const options = {
            ...item,
            deleted: true
        }
        const res = await updateData("classschedules", item.id, options);
        if (res) {
            alert("Đã chuyển vào thùng rác");
        } else {
            alert("Không thể xóa");
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const dataSource = initialData.filter(item => !item.deleted)
    const { getPagination, getIndex } = usePagination(10);

    return (<>
        <Table dataSource={dataSource}
            pagination={getPagination(dataSource.length)}>
            <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
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
            record={editingRecord} />
    </>)
}