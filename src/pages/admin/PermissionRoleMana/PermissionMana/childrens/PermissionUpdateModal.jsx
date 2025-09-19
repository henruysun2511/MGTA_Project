import { Button, Col, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleUpdate } from '../../../../../utils/handles';

export default function PermissionUpdateModal({ open, onCancel, record }) {
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

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                name: record.name || "",
                apiPath: record.apiPath || "",
                method: record.method || "",
                module: record.module || ""
            });
        }
    }, [open, record, form]);

    const handleUpdatePermission = async (values) => {
        const options = {
            ...values,
        };
        await handleUpdate(dispatch, "admin/permission", "permissions", record._id, options, () => onCancel());
    }

    return (<>
        <Modal
            open={open}
            title="Chỉnh sửa quyền hạn"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdatePermission}>
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
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}