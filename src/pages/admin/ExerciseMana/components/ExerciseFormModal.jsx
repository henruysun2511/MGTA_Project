import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from "antd";
import { useEffect } from "react";

export default function ExcerciseFormModal({ open, onCancel, onSubmit, skillOptions, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || { grade: "all", skills: [] });
    }
  }, [open, initialValues, form]);

  return (
    <Modal width={900} title="THÊM BÀI TẬP MỚI" open={open} onCancel={onCancel} footer={null}>
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="title" label="Tên bài tập" rules={[{ required: true }]}>
              <Input placeholder="Nhập tên bài tập" />
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
            <Form.Item name="totalTime" label="Thời gian làm" rules={[{ required: true }]}>
              <InputNumber min={5} defaultValue={10} step={5} style={{width: "100%"}}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="totalQuestion" label="Tổng số câu hỏi" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tải đề bài (Ảnh)"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true }]}
            >
              <Upload beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Chọn file</Button>
              </Upload>
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