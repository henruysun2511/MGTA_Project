import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleDelete } from "../../../../../utils/handles";
import PermissionUpdateModal from "./PermissionUpdateModal";

export default function PermissionCard({ permissionData }) {
    const dispatch = useDispatch();
    const [editingRecord, setEditingRecord] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const handleDeletePermission = async (value) => {
        await handleDelete(dispatch, "admin/permission", "permissions", value._id, value.name);
    } 

    return (
        <>
            <div className="permission__item">
                <div className="permission__commom">
                    <div className="permission__method">{permissionData.method}</div>
                    <div className="permission__info">
                        <h3>{permissionData.name}</h3>
                        <p>{permissionData.apiPath}</p>
                    </div>
                </div>
                <div className='permission__action'>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            style={{}}
                            onClick={() => { setOpenUpdateModal(true); setEditingRecord(permissionData) }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            icon={<DeleteOutlined />}
                            size="small"
                            style={{}}
                            onClick={() => handleDeletePermission(permissionData)}
                        />
                    </Tooltip>

                </div>
            </div>

            <PermissionUpdateModal record={editingRecord} open={openUpdateModal} onCancel={() => setOpenUpdateModal(false)} />
        </>
    )
}