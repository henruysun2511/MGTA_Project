import { DeleteOutlined, EditOutlined, EyeOutlined, RetweetOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertConfirm } from '../../../../utils/alerts';
import { handleDelete, handleUpdate } from '../../../../utils/handles';
import AccountUpdateClassModal from './AccountUpdateClassModal';
import AccountUpdatePasswordModal from './AccountUpdatePasswordModal';
import AccountUpdateRoleModal from './AccountUpdateRoleModal';
import AccountWatchDetailModal from './AccountWatchDetailModal';
const { Column, ColumnGroup } = Table;


export default function AccountTable({ accountData, studentData, classData, pagination }) {
    const dispatch = useDispatch();

    const dataSource = accountData.map((account) => {
        const studentDataByAccountId = studentData.find(
            (st) => st.accountId && st.accountId._id === account._id
        );

        const classDataByStudentId = studentDataByAccountId?.classId
            ? classData.find(
                (cl) => cl._id === studentDataByAccountId.classId?._id
            )
            : null;

        return {
            ...account,
            roleId: account ? account.roleId?._id : "N/A",
            roleName: account ? account.roleId?.name : "N/A",
            name: studentDataByAccountId ? studentDataByAccountId.name : "N/A",
            class: classDataByStudentId ? classDataByStudentId.className : "Chưa phân lớp",
        };
    });

    const handleActivate = async (record) => {
        const result = await alertConfirm(`Kích hoạt tài khoản ${record.username || ""} ?`, "", "Xác nhận", "Hủy");
        if (result.isConfirmed) {
            await handleUpdate(dispatch, "admin/account/change-status", "accounts", record._id, { ...record, status: "active" });
        }
    }

    const handleInactive = async (record) => {
        const result = await alertConfirm(`Vô hiệu hóa tài khoản ${record.username || ""} ?`, "", "Xác nhận", "Hủy");
        if (result.isConfirmed) {
            await handleUpdate(dispatch, "admin/account/change-status", "accounts", record._id, { ...record, status: "inactive" });
        }
    }

    const handleDeleteAccount = async (record) => {
        await handleDelete(dispatch, "admin/account", "accounts", record._id, record.username);
    }

    const [editingRecord, setEditingRecord] = useState(null);
    const [openUpdateClassModal, setOpenUpdateClassModal] = useState(false);
    const [openUpdateRoleModal, setOpenUpdateRoleModal] = useState(false);
    const [openWatchDetailModal, setOpenWatchDetailModal] = useState(false);
    const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);

    return (
        <>
            <Table dataSource={dataSource} pagination={false}>
                <Column title="STT" key="index" render={(text, record, index) => ((pagination?.currentPage - 1) * pagination?.limit) + index + 1} />
                <Column title="Họ và tên" dataIndex="name" key="name" />
                <Column title="Username" dataIndex="username" key="username" />
                <Column
                    title="Lớp"
                    dataIndex="class"
                    key="classId"
                    render={(className, record) => (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{className}</span>
                            {className === "Chưa phân lớp" && (
                                <Tooltip title="Phân lớp">
                                    <EditOutlined
                                        style={{ color: "#1890ff", cursor: "pointer" }}
                                        onClick={() => { setOpenUpdateClassModal(true); setEditingRecord(record); }}
                                    />
                                </Tooltip>
                            )}
                        </div>
                    )}
                />

                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Tooltip title="Xem chi tiết tài khoản">
                                <EyeOutlined onClick={() => { setOpenWatchDetailModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                            <Tooltip title="Xóa tài khoản">
                                <DeleteOutlined onClick={() => handleDeleteAccount(record)} />
                            </Tooltip>
                            <Tooltip title="Đổi mật khẩu">
                                <RetweetOutlined onClick={() => {setOpenUpdatePasswordModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                        </Space>
                    )}
                />

                <Column
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                    render={(status, record) => (
                        <>
                            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                <Button
                                    type={status === 'active' ? 'default' : 'primary'}
                                    onClick={() => handleActivate(record)}
                                >
                                    {status === 'active' ? 'Đã kích hoạt' : 'Kích hoạt'}

                                </Button>
                                {record.status === 'active' && (
                                    <Tooltip title="Vô hiệu hóa tài khoản">
                                        <StopOutlined onClick={() => handleInactive(record)} />
                                    </Tooltip>
                                )}
                            </div>
                        </>
                    )}
                />

                <Column
                    title="Vai trò"
                    dataIndex="roleName"
                    key="roleName"
                    render={(roleName, record) => (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>{roleName}</span>
                            <Tooltip title="Sửa vai trò">
                                <EditOutlined
                                    style={{ color: "#1890ff", cursor: "pointer" }}
                                    onClick={() => { setOpenUpdateRoleModal(true); setEditingRecord(record); }}
                                />
                            </Tooltip>
                        </div>
                    )}
                />

            </Table>


            <AccountUpdateClassModal classData={classData} studentData={studentData} open={openUpdateClassModal} onCancel={() => setOpenUpdateClassModal(false)} record={editingRecord} />
            <AccountWatchDetailModal classData={classData} studentData={studentData} open={openWatchDetailModal} onCancel={() => setOpenWatchDetailModal(false)} record={editingRecord} />
            <AccountUpdateRoleModal open={openUpdateRoleModal} onCancel={() => setOpenUpdateRoleModal(false)} record={editingRecord} />
            <AccountUpdatePasswordModal open={openUpdatePasswordModal} onCancel={()=> setOpenUpdatePasswordModal(false)} record={editingRecord} />
        </>
    )
}