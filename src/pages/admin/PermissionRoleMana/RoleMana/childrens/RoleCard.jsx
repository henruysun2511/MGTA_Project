import {
    DeleteOutlined,
    EditOutlined,
    SafetyOutlined
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleDelete } from '../../../../../utils/handles';
import RoleUpdateModal from './RoleUpdateModal';

export default function RoleCard({ role }) {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const dispatch = useDispatch();

    const handleDeleteRole = async (value) => {
        await handleDelete(dispatch, "admin/role", "roles", value._id, value.name);
    }

    return (
        <>
            <div className='role__card'>
                <SafetyOutlined className='role__icon' />
                <div>
                    <h2>{role.name}</h2>
                    <p>{role.description}</p>
                </div>
                <div className='role__action'>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            style={{}}
                            onClick={() => { setOpenUpdateModal(true); setEditingRecord(role) }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            icon={<DeleteOutlined />}
                            size="small"
                            style={{}}
                            onClick={() => handleDeleteRole(role)}
                        />
                    </Tooltip>

                </div>
            </div>

            <RoleUpdateModal open={openUpdateModal} onCancel={() => setOpenUpdateModal(false)} record={editingRecord} />
        </>
    )
}