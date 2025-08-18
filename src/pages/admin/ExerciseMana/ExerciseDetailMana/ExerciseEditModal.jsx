import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateExerciseAction } from "../../../../redux/actions/exerciseAction";
import { editExercise } from "../../../../services/exerciseService";


export default function ExerciseEditModal({ open, onCancel, skillOptions, exerciseData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const skills = skillOptions.map(s => ({ label: s.name, value: s.id }));
  useEffect(() => {
    if (open && exerciseData?.length > 0) {
      const data = exerciseData[0];

      form.setFieldsValue({
        title: data.title || '',
        skillId: data.skillId || [],
        unit: data.unit || '',
        totalQuestion: data.totalQuestion || 0
      });
    }
  }, [open, exerciseData, form]);

  const handleSubmit = async (values) => {

    const id = exerciseData[0].id;

    const options = {
      title: values.title,
      skillId: values.skillId,
      unit: values.unit,
      totalQuestion: values.totalQuestion,
      totalTime: values.totalTime
    };

    const response = await editExercise(id, options);
    if (response) {
      dispatch(updateExerciseAction(response));
      alert("Cập nhật bài tập thành công");
    } else {
      alerrt("Cập nhật bài tập thất bại")
    }
    onCancel();
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
            <Form.Item name="totalTime" label="Thời gian làm (Phút)" rules={[{ required: true }]}>
              <InputNumber min={0} defaultValue={0} step={5} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="skillId" label="Kĩ năng" rules={[{ required: true }]}>
              <Select options={skills} mode="tags" placeholder="Nhập kỹ năng" />
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
