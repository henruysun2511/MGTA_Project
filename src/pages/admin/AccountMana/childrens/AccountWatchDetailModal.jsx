import { Modal, Table } from 'antd';
const { Column } = Table;

export default function AccountWatchDetailModal({ classData, studentData, open, onCancel, record }) {

    if (!record) {
        return (
            <Modal
                title="Chi tiết tài khoản"
                open={open}
                onCancel={onCancel}
                footer={null}
            >
                <p>Không có dữ liệu để hiển thị</p>
            </Modal>
        );
    }

    const studentByAccountId = studentData.find(
        (st) => st.accountId && st.accountId._id === record._id
    ) || null;

    const classByStudentId = studentByAccountId?.classId
        ? classData.find((cl) => String(cl._id) === String(studentByAccountId.classId._id))
        : null;

    return (
        <Modal
            title={`Chi tiết tài khoản: ${record.username}`}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <p>Họ và tên: {studentByAccountId ? studentByAccountId.name : "N/A"}</p>
            <p>Lớp: {classByStudentId ? classByStudentId.className : "Chưa phân lớp"}</p>
            <p>Trạng thái: {record.status}</p>
            <p>Email: {studentByAccountId ? studentByAccountId.email : "N/A"}</p>
            <p>Địa chỉ: {studentByAccountId ? studentByAccountId.address : "N/A"}</p>
            <p>Trường: {studentByAccountId ? studentByAccountId.school : "N/A"}</p>
            <p>Phụ huynh: {studentByAccountId ? studentByAccountId.parentName : "N/A"}</p>
            <p>Số điện thoại phụ huynh: {studentByAccountId ? studentByAccountId.parentPhone : "N/A"}</p>

        </Modal>
    );
}