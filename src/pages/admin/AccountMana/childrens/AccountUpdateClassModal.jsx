import { Button, Form, Modal, Select, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { alertError } from '../../../../utils/alerts';
import { handleUpdate } from '../../../../utils/handles';
const { Column } = Table;

export default function AccountUpdateClassModal({ open, onCancel, record, classData, studentData }) {
    const dispatch = useDispatch();

    const classOptions = classData.map(cl => ({
        label: cl.className,
        value: cl._id
    }));

    const studentByAccountId = record
        ? studentData.find(st => st.accountId?._id === record._id)
        : null;

    console.log(studentData);
    console.log(studentByAccountId);

    const handleUpdateClassStudents = async (values) => {
        if (!record) return;
        if (record.status === "inactive") {
            alertError("Tài khoản này chưa được kích hoạt. Vui lòng kích hoạt trước khi phân lớp.");
            return;
        }

        const options = {

            classId: values.classId,
        }

        await handleUpdate(dispatch, 'admin/student/add-class', "students", studentByAccountId._id, options, () => onCancel());
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
