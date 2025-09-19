import { Button, Col, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { handleCreate } from '../../../../../utils/handles';

export default function RoleCreateModal({ open, onCancel}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleAddRole = async (values) => {
        const options = {
            ...values,
        }
        console.log(options)
        await handleCreate(dispatch, "admin/role", "roles", options, () => onCancel());
    }

    return (<>
        <Modal
            open={open}
            title="Thêm vai trò mới"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleAddRole}>
                <Form.Item
                    name="name"
                    label="Vai trò"
                    rules={[{ required: true, message: 'Vui lòng nhập vai trò' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                    <Input />
                </Form.Item>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </Col>
            </Form>
        </Modal>

    </>)
}