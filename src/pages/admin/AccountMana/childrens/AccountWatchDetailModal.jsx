import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const { Column } = Table;

export default function AccountWatchDetailModal({ open, onCancel, record }) {
    const dispatch = useDispatch();
    const studentData = useSelector((state) => state.students.list);
    const classData = useSelector((state) => state.classes.list);

    if (!record) {
        // Nếu chưa có record thì render modal rỗng hoặc loading
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

    const studentByAccountId = studentData.find((st) => st.accountId === record.id);
    const classByStudentId = studentByAccountId
        ? classData.find((cl) => String(cl.id) === String(studentByAccountId.classId))
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
            <p>Phụ huynh: {studentByAccountId ? studentByAccountId.parentName : "N/A"}</p>
            <p>Số điện thoại phụ huynh: {studentByAccountId ? studentByAccountId.parentPhone : "N/A"}</p>

        </Modal>
    );
}
