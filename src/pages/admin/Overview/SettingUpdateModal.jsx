import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Spin, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleUpdate, handleUploadImage } from '../../../utils/handles';

export default function SettingUpdateModal({ open, onCancel, settingData }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && settingData) {
            form.setFieldsValue({
                fb: settingData[0].fb || "",
                email: settingData[0].email || "",
                phone: settingData[0].phone || "",
                hotline: settingData[0].hotline || "",
                webName: settingData[0].webName || "",
            });
        }
    }, [open, settingData, form]);


    const handleUpdateProfile = async (values) => {
        let uploadedUrls = settingData[0]?.logo || []; 

        if (values.logo && values.logo.length > 0) {
            uploadedUrls = await handleUploadImage(values.logo, setLoading);
        }

        const options = {
            ...values,
            _id: settingData._id,
            logo: uploadedUrls
        };

        await handleUpdate(dispatch, "admin/setting", "settings", "",options, () => onCancel());
    };

    return (
    <>
        <Modal
            open={open}
            title="Cập nhật thông tin"
            onCancel={onCancel}
            footer={null}
            width={600}
            confirmLoading={loading}
        >
            <Spin spinning={loading} tip="Đang xử lý...">
                <Form layout="vertical" form={form} onFinish={handleUpdateProfile}>
                    <Form.Item
                        name="fb"
                        label="facebook"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="email"
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
                        name="hotline"
                        label="Số hotline"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="webName"
                        label="website"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="logo"
                        name="logo"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload accept="image/*" beforeUpload={() => false} >
                            <Button icon={<UploadOutlined />}>Chọn file</Button>
                        </Upload>
                    </Form.Item>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </Col>
                </Form>
            </Spin>
        </Modal>
    </>)
}