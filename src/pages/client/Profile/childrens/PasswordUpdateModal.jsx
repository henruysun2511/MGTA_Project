import { Button, Col, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { handleUpdate } from '../../../../utils/handles';

export default function PasswordUpdateModal({ open, onCancel }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const accountId = localStorage.getItem("accountId");

    const handleUpdatePassword = async (values) => {
        const options = {
            accountId: accountId,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        };
        await handleUpdate(dispatch, "auth/change-password", "", "", options, () => onCancel());
    };

    return (<>
        <Modal
            open={open}
            title="Cập nhật thông tin"
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Form layout="horizontal" form={form} onFinish={handleUpdatePassword}>
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ'}]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="rePassword"
                    rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu mới' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}