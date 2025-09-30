import { Button, Col, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { alertError } from '../../../../utils/alerts';
import { handleUpdate } from '../../../../utils/handles';

export default function AccountUpdatePasswordModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    console.log(record);

    const handleUpdatePassword = async (values) => {
        if(values.newPassword !== values.rePassword){
            alertError("Mật khẩu nhập không trùng khớp","");
            return;
        }
        const options = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        };
        await handleUpdate(dispatch, "admin/account/change-password", "accounts", record._id, options, () => onCancel());
    };

    return (<>
        <Modal
            open={open}
            title={`Đổi mật khẩu cho tài khoản ${record?.username ? record?.username : ""}`}
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