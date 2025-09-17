import { Button, Col, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { handleCreate } from '../../../../../utils/handles';

export default function SkillCreateModal({ open, onCancel }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleAddSkill = async (values) => {
        const options = {
            ...values
        }
        await handleCreate(dispatch, "admin/skill", "skills", options, () => onCancel());
    }

    return (
        <>
            <Modal
                open={open}
                title="Thêm kỹ năng mới"
                onCancel={onCancel}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={handleAddSkill}>
                    <Form.Item
                        name="skillName"
                        label=""
                        rules={[{ required: true, message: 'Vui lòng chọn tên kỹ năng' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Thêm kỹ năng</Button>
                    </Col>
                </Form>
            </Modal>
        </>
    )
}