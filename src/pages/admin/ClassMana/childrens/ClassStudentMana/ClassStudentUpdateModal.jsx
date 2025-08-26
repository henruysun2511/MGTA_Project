import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';

export default function ClassStudentUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    console.log(record)
    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                name: record.name,
                school: record.school,
                address: record.address,
                parentName: record.parentName,
                parentPhone: record.parentPhone,
            });
        }
    }, [open, record, form]);

    const handleUpdateClassStudents = async (values) => {
        const res = await updateData("students", record.id, values);
        if (res) {
            dispatch(updateAction("students", res));
            alert("Cập nhật thông tin học sinh thành công");
            onCancel();
        } else {
            alert("Cập nhật thông tin học sinh thất bại");
        }
    };



    return (<>
        <Modal
            open={open}
            title="Cập nhật lịch học"
            onCancel={onCancel}
            footer={null}
            width={900}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdateClassStudents}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="Học sinh" rules={[{ required: true }]}>
                            <Input placeholder="Nhập tên học sinh" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="school" label="Trường" rules={[{ required: true }]}>
                            <Input placeholder="Nhập trường" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="parentName" label="Phụ huynh" rules={[{ required: true }]}>
                            <Input placeholder="Nhập họ tên phụ huynh" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="parentPhone" label="Số điện thoại phụ huynh" rules={[{ required: true }]}>
                            <Input placeholder="Nhập số điện thoại phụ huynh" />
                        </Form.Item>
                    </Col>

                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Lưu bài tập</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </>)
}