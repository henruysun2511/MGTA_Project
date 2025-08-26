import { Button, Col, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { createAction } from '../../../../redux/actions/baseAction';
import { createData } from '../../../../services/baseService';
export default function ClassScheduleCreateModal({ open, onCancel, classData, classSessionData }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const classOptions = classData.map((item) => ({
        value: item.id,
        label: item.className,
    }));

    const classSessionOptions = classSessionData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const handleAddClassSchedule = async (values) => {
        const formatted = values.schedule.format("YYYY-MM-DD");
        const options = {
            ...values,
            schedule: formatted
        }
        const res = await createData("classschedules", options);
        if (res) {
            dispatch(createAction("classschedules", res));
            alert("Thêm lịch học mới thành công");
            onCancel();
        } else {
            alert("Thêm lịch học mới thất bại");
        }
    }

    return (<>
        <Modal
            open={open}
            title="Thêm lịch học mới"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleAddClassSchedule}>
                <Form.Item
                    name="classSessionId"
                    label="Ca học"
                    rules={[{ required: true, message: 'Vui lòng chọn ca học' }]}
                >
                    <Select placeholder="Chọn ca học" options={classSessionOptions}>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="schedule"
                    label="Lịch học"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày học' }]}
                >
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="classId"
                    label="Lớp"
                    rules={[{ required: true, message: 'Vui lòng chọn lớp' }]}
                >
                    <Select placeholder="Chọn lớp" options={classOptions}>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="linkZoom"
                    label="Link Zoom"
                    rules={[{ required: true, message: 'Vui lòng nhập link Zoom' }]}
                >
                    <Input placeholder="https://zoom.us/..." />
                </Form.Item>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Thêm lịch học</Button>
                </Col>
            </Form>
        </Modal>

    </>)
}