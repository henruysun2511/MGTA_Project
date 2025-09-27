import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Spin, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleUpdate, handleUploadImage } from '../../../../utils/handles';

export default function ProfileUpdateModal({ open, onCancel, studentData }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && studentData) {
            form.setFieldsValue({
                name: studentData.name || "",
                email: studentData.email || "",
                phone: studentData.phone || "",
                address: studentData.address || "",
                school: studentData.school || "",
                class: studentData.class || "",
                parentName: studentData.parentName || "",
                parentPhone: studentData.parentPhone || "",
                parentEmail: studentData.parentEmail || "",
            });
        }
    }, [open, studentData, form]);


    const handleUpdateProfile = async (values) => {
        let uploadedUrls = studentData?.image || []; 

        if (values.image && values.image.length > 0) {
            uploadedUrls = await handleUploadImage(values.image, setLoading);
        }

        const options = {
            ...values,
            image: uploadedUrls
        };

        await handleUpdate(dispatch, "student", "students", "", options, () => onCancel());
    };

    return (<>
        <Modal
            open={open}
            title="Cập nhật thông tin"
            onCancel={onCancel}
            footer={null}
            width={800}
            confirmLoading={loading}
        >
            <Spin spinning={loading} tip="Đang xử lý...">
                <Form layout="horizontal" form={form} onFinish={handleUpdateProfile}>
                    <p>Thông tin học sinh</p>
                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="school"
                        label="Trường"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="class"
                        label="Lớp"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh đại diện"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true }]}
                    >
                        <Upload accept="image/*" beforeUpload={() => false} >
                            <Button icon={<UploadOutlined />}>Chọn file</Button>
                        </Upload>
                    </Form.Item>
                    <p>Thông tin phụ huynh</p>
                    <Form.Item
                        name="parentName"
                        label="Họ và tên"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="parentPhone"
                        label="Số điện thoại"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="parentEmail"
                        label="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập email phụ huynh' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </Col>
                </Form>
            </Spin>
        </Modal>
    </>)
}