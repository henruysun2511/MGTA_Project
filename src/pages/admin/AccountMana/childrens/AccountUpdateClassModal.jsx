import { Button, Form, Modal, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from '../../../../redux/actions/baseAction';
import { updateData } from '../../../../services/baseService';
const { Column } = Table;

export default function AccountUpdateClassModal({ open, onCancel, record }) {
    const dispatch = useDispatch();

    const classData = useSelector(state => state.classes.list).filter(cl => !cl.deleted);
    const classOptions = classData.map(cl => ({
        label: cl.className,
        value: cl.id
    })); 

    const studentData = useSelector(state => state.students.list).filter(st => !st.deleted);
    const studentByAccountId = record
        ? studentData.find(st => st.accountId === record.id)
        : null;

    const handleUpdateClassStudents = async (values) => {
        if (!record) return;
        if(record.status === "inactive") {
            alert("Tài khoản này chưa được kích hoạt. Vui lòng kích hoạt trước khi phân lớp.");
            return;
        }

        const res = await updateData("students", studentByAccountId.id, {
            ...studentByAccountId,
            classId: values.classId,  
        });

        if (res) {
            dispatch(updateAction("students", res));
            alert(`Đã cập nhật lớp cho tài khoản ${record.username} - ${record.name}`);
            onCancel(); 
        }
    };

    return (
        <Modal
            title={record ? `Phân lớp cho tài khoản ${record.username} - ${record.name}` : "Phân lớp"}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleUpdateClassStudents}>
                <Form.Item
                    name="classId"
                    label="Chọn lớp"
                    rules={[{ required: true, message: "Vui lòng chọn lớp!" }]}
                >
                    <Select placeholder="Chọn lớp" options={classOptions} />
                </Form.Item>

                <div style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </div>
            </Form>
        </Modal>
    );
}
