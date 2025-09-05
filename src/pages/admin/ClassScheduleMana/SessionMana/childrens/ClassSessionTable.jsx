import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../../hooks/usePagination';
import { softDeleteAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';
import ClassSessionUpdateModal from './ClassSessionUpdateModal';
const { Column } = Table;

export default function ClassSessionTable({ classSessionData }) {
    const dispatch = useDispatch();

    const handleSoftDeleteClassSession = async (item) => {        
        const options = {
            ...item,
            deleted: true
        }
        const res = await updateData("classsessions", item.id, options);
        if (res) {
            dispatch(softDeleteAction("classsessions", res.id));
            alert("Đã chuyển vào thùng rác");
        } else {
            alert("Không thể xóa");
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const { getPagination, getIndex } = usePagination(10);

    return (<>
        <Table dataSource={classSessionData}
            pagination={getPagination(classSessionData.length)}>
            <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
            <Column title="Ca học" dataIndex="name" key="name" />
            <Column title="Giờ bắt đầu" dataIndex="startTime" key="startTime" />
            <Column title="Giờ kết thúc" dataIndex="endTime" key="endTime" />
            <Column
                title="Hành động"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <Tooltip title="Chỉnh sửa">
                            <EditOutlined onClick={() => { setOpenModal(true); setEditingRecord(record); }} />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => handleSoftDeleteClassSession(record)} />
                        </Tooltip>

                    </Space>
                )}
            />
        </Table>

        <ClassSessionUpdateModal open={openModal}
            onCancel={() => { setOpenModal(false); setEditingRecord(null); }}
            record={editingRecord} />
    </>)
}