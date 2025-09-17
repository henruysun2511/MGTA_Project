import { Button, Col, Form, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUpdate } from '../../../../../utils/handles';

export default function ClassStudentChangeClassModal({ open, onCancel, record }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const classData = useSelector((state) =>
    (state.classes.list || []).filter(cl => !cl.deleted)
  );

  const classOptions = classData.map((item) => ({
    value: item._id,
    label: item.className,
  }));

  const currentClass = record
    ? classData.find(cl => cl._id === record.classId?._id)
    : null;


  // Đồng bộ dữ liệu form khi record thay đổi
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        classId: record.classId?._id || undefined,
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  const handleChangeClass = async (values) => {
    if (!record) return;
    await handleUpdate(
      dispatch,
      "admin/student",
      "students",
      record._id,
      { classId: values.classId },
      () => onCancel()
    );
  };

  return (
    <Modal
      open={open}
      title={
        record
          ? `Xác nhận chuyển lớp cho học sinh ${record.name}`
          : "Chuyển lớp"
      }
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="horizontal" onFinish={handleChangeClass}>
        <Form.Item
          name="classId"
          label={`Từ lớp ${currentClass ? currentClass.className : "Chưa xác định"} sang lớp`}
          rules={[{ required: true, message: "Vui lòng chọn lớp để chuyển" }]}
        >
          <Select placeholder="Chọn lớp" options={classOptions} />
        </Form.Item>

        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Chuyển lớp
          </Button>
        </Col>
      </Form>
    </Modal>
  );
}
