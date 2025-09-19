import { Button, Col, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleUpdate } from '../../../../../utils/handles';

export default function RoleUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                name: record.name || "",
                description: record.description || ""
            });
        }
    }, [open, record, form]);

    const handleUpdateRole = async (values) => {
        const options = {
            ...values,
        };
        await handleUpdate(dispatch, "admin/role", "roles", record._id, options, () => onCancel());
    }

    return (<>
        <Modal
            open={open}
            title="Chỉnh sửa vai trò"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdateRole}>
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
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}