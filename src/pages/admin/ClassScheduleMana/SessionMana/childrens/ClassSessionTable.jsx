import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAction } from '../../../../../redux/actions/baseAction';
import { deleteData } from '../../../../../services/baseService';
import { alertConfirm, alertError, alertSuccess } from '../../../../../utils/alerts';
import { formatTimeFromApi } from '../../../../../utils/formatDate';
import ClassSessionUpdateModal from './ClassSessionUpdateModal';
const { Column } = Table;

export default function ClassSessionTable({ classSessionData }) {
    const dispatch = useDispatch();

    const handleSoftDeleteClassSession = async (item) => {
        const result = await alertConfirm(
            "Xóa ca học?",
            `Bạn có chắc muốn xóa "${item.classSessionName}" không?`,
            "Xóa",
            "Hủy"
        );
        if (result.isConfirmed) {
            const res = await deleteData("admin/class-session", item._id);
            if (res.statusCode === 200) {
                dispatch(deleteAction("classsessions", res.data._id));
                alertSuccess(res.message);

            } else {
                alertError(res.message);
            }
        }else {
            return;
        } 
    }

    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const dataSource = classSessionData.map(cls => {
        return {
            ...cls,
            startTime: formatTimeFromApi(cls.startTime),
            endTime: formatTimeFromApi(cls.endTime)
        }
    })

    return (<>
        <Table dataSource={dataSource}
            pagination={false}>
            <Column title="STT" key="index" render={(text, record, index) => index}/>
            <Column title="Ca học" dataIndex="classSessionName" key="name" />
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