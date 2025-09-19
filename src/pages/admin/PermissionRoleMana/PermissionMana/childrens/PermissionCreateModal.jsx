import { Button, Col, Form, Input, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';

import { handleCreate } from '../../../../../utils/handles';

export default function PermissionCreateModal({ open, onCancel }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const methodOptions = [
        {
            value: "GET",
            label: "GET"
        },
        {
            value: "POST",
            label: "POST"
        },
        {
            value: "PATCH",
            label: "PATCH"
        },
        {
            value: "DEL",
            label: "DEL"
        }
    ]

    const handleAddPermission = async (values) => {
        const options = {
            ...values,
        }
        await handleCreate(dispatch, "admin/permission", "permissions", options, () => onCancel());
    }

    return (<>
        <Modal
            open={open}
            title="Thêm quyền hạn mới"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleAddPermission}>
                <Form.Item
                    name="name"
                    label="Quyền hạn"
                    rules={[{ required: true, message: 'Vui lòng nhập vai trò' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="apiPath"
                    label="API"
                    rules={[{ required: true, message: 'Vui lòng nhập đường dẫn api' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="method"
                    label="Phương thức"
                    rules={[{ required: true, message: 'Vui lòng chọn phương thức' }]}
                >
                    <Select options={methodOptions} placeholder="Chọn phương thức"/>
                </Form.Item>
                <Form.Item
                    name="module"
                    label="Module"
                    rules={[{ required: true, message: 'Vui lòng nhập module' }]}
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