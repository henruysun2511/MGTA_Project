import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../../../../hooks/useFetch";
import { handleUpdate } from "../../../../../utils/handles";


export default function ExerciseEditModal({ open, onCancel, exerciseData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [skillDataRes] = useFetch("admin/skill/skills", {}, {});
  const skillData = skillDataRes || [];
  
  const skillOptions = skillData.map(skill => ({
    value: skill._id,
    label: skill.skillName
  }));

  useEffect(() => {
    if (open && exerciseData) {
      form.setFieldsValue({
        title: exerciseData.title || '',
        skillId: exerciseData.skillId?.map(s => s._id) || [],
        unit: exerciseData.unit || '',
        totalQuestion: exerciseData.totalQuestion || 0,
        duration: exerciseData.duration || 0
      });
    }
  }, [open, exerciseData, form]);

  const handleSubmit = async (values) => {
    const id = exerciseData._id;
    const options = {
      ...exerciseData,
      title: values.title,
      skillId: values.skillId || [],
      unit: values.unit,
      totalQuestion: values.totalQuestion,
      duration: values.duration
    };

    await handleUpdate(dispatch, "admin/exercise", "exercises", id, options, () => onCancel());
  }

  return (
    <Modal width={900} title="SỬA THÔNG TIN CHUNG" open={open} onCancel={onCancel} footer={null}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="title" label="Tên bài tập" rules={[{ required: true }]}>
              <Input placeholder="Nhập tên bài tập" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="duration" label="Thời gian làm (Phút)" rules={[{ required: true }]}>
              <InputNumber min={0} defaultValue={0} step={5} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="skillId" label="Kĩ năng" rules={[{ required: true }]}>
              <Select options={skillOptions} mode="tags" placeholder="Nhập kỹ năng" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
              <Input placeholder="Nhập unit" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="totalQuestion" label="Tổng số câu hỏi" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>


          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">Lưu bài tập</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
