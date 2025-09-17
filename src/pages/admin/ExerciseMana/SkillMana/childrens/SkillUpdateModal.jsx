import { Button, Col, Form, Input, Modal } from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleUpdate } from '../../../../../utils/handles';

export default function SkillUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                skillName: record.skillName || ""
            });
        }
    }, [open, record, form]);

    const handleUpdateSkill = async (values) => {
        const options = {
            ...values
        }
        console.log(options);
        await handleUpdate(dispatch, "admin/skill", "skills", record._id, options, () => onCancel());
    }

    return (
        <>
            <Modal
                open={open}
                title="Sửa kỹ năng"
                onCancel={onCancel}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={handleUpdateSkill}>
                    <Form.Item
                        name="skillName"
                        label=""
                        rules={[{ required: true, message: 'Vui lòng chọn tên kỹ năng' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Lưu kỹ năng</Button>
                    </Col>
                </Form>
            </Modal>
        </>
    )
}