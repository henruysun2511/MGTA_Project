import { DeleteOutlined, EditOutlined, EyeOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../hooks/usePagination';
import { updateAction } from '../../../../redux/actions/baseAction';
import { updateData } from '../../../../services/baseService';
import AccountUpdateClassModal from './AccountUpdateClassModal';
import AccountWatchDetailModal from './AccountWatchDetailModal';
const { Column, ColumnGroup } = Table;


export default function AccountTable({ accountData, studentData, classData }) {
    const dispatch = useDispatch();

    const dataSource = accountData.map((account) => {
        const studentDataByAccountId = studentData.find((st) => st.accountId === account.id);
        const classDataByStudentId = studentDataByAccountId ?
            classData.find((cl) => String(cl.id) === String(studentDataByAccountId.classId)) : null;

        return {
            ...account,
            name: studentDataByAccountId ? studentDataByAccountId.name : "N/A",
            class: classDataByStudentId ? classDataByStudentId.className : "Chưa phân lớp",
        };

    }).filter((acc) => acc.role === "student");

    const handleActivate = async (record) => {
        const res = await updateData("accounts", record.id, { ...record, status: "active" });
        if (res) {
            dispatch(updateAction("accounts", res));
            alert(`Tài khoản ${record.username} đã kích hoạt`);
        }
    }

    const handleInactive = async (record) => {
        const res = await updateData("accounts", record.id, { ...record, status: 'inactive' });
        if (res) {
            dispatch(updateAction("accounts", res));
            alert(`Tài khoản ${record.username} đã vô hiệu hóa.`);
        }
    }

    const handleDeleteAccount = async (record) => {
        const res = await updateData("accounts", record.id, { ...record, deleted: true });
        if (res) {
            dispatch(updateAction("accounts", res));
            alert(`Tài khoản ${record.username} đã xóa.`);
        }
    }

    const { getPagination, getIndex } = usePagination(10);
    const [editingRecord, setEditingRecord] = useState(null);
    const [openEditClassModal, setOpenEditClassModal] = useState(false);
    const [openWatchDetailModal, setOpenWatchDetailModal] = useState(false);

    return (
        <>
            <Table dataSource={dataSource} pagination={getPagination(dataSource.length)}>
                <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
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
                                        onClick={() => {setOpenEditClassModal(true); setEditingRecord(record);} }
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
                                <EyeOutlined onClick={() => {setOpenWatchDetailModal(true); setEditingRecord(record);}} />
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

            <AccountUpdateClassModal open={openEditClassModal} onCancel={() => setOpenEditClassModal(false)} record={editingRecord}/>
            <AccountWatchDetailModal open={openWatchDetailModal} onCancel={() => setOpenWatchDetailModal(false)} record={editingRecord} />
        </>
    )
}