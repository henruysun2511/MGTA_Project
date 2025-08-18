import { Button, Col, Form, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';

export default function ClassStudentChangeClassModal({ open, onCancel, record }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const classData = useSelector((state) => state.classes.list).filter(cl => !cl.deleted);
  const classOptions = classData.map((item) => ({
    value: item.id,
    label: item.className,
  }));

  const currentClass = record
    ? classData.find(cl => String(cl.id) === String(record.classId))?.className || "Chưa xác định"
    : "Chưa xác định";

  const handleChangeClass = async (values) => {
    if (!record) return;  // bảo vệ
    const res = await updateData("students", record.id, { classId: values.classId });
    if (res) {
      dispatch(updateAction("students", res));
      alert("Chuyển lớp thành công");
      onCancel();
    } else {
      alert("Chuyển lớp thất bại");
    }
  };

  return (
    <Modal
      open={open}
      title={record ? `Xác nhận chuyển lớp cho học sinh ${record.name}` : "Chuyển lớp"}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="horizontal" onFinish={handleChangeClass}>
        <Form.Item
          name="classId"
          label={`Từ lớp ${currentClass} sang lớp`}
          rules={[{ required: true, message: "Vui lòng chọn lớp để chuyển" }]}
        >
          <Select placeholder="Chọn lớp" options={classOptions} />
        </Form.Item>

        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">Chuyển lớp</Button>
        </Col>
      </Form>
    </Modal>
  );
}
