import { DeleteOutlined, EditOutlined, EyeOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertConfirm } from '../../../../utils/alerts';
import { handleDelete, handleUpdate } from '../../../../utils/handles';
import AccountUpdateClassModal from './AccountUpdateClassModal';
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
                (cl) => String(cl._id) === String(studentDataByAccountId.classId?._id)
            )
            : null;

        return {
            ...account,
            name: studentDataByAccountId ? studentDataByAccountId.name : "N/A",
            class: classDataByStudentId ? classDataByStudentId.className : "Chưa phân lớp",
        };
    });

    const handleActivate = async (record) => {
        console.log(record._id)
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
    const [openEditClassModal, setOpenEditClassModal] = useState(false);
    const [openWatchDetailModal, setOpenWatchDetailModal] = useState(false);

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
                                        onClick={() => { setOpenEditClassModal(true); setEditingRecord(record); }}
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
            </Table>

            <AccountUpdateClassModal classData={classData} studentData={studentData} open={openEditClassModal} onCancel={() => setOpenEditClassModal(false)} record={editingRecord} />
            <AccountWatchDetailModal classData={classData} studentData={studentData} open={openWatchDetailModal} onCancel={() => setOpenWatchDetailModal(false)} record={editingRecord} />
        </>
    )
}