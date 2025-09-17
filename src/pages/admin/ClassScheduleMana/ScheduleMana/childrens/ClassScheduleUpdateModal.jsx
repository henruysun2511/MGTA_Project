import { Button, Col, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from "dayjs";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleUpdate } from '../../../../../utils/handles';

export default function ClassScheduleUpdateModal({ open, onCancel, record, classData, classSessionData }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const classOptions = classData?.map((item) => ({
        value: item._id,
        label: item.className,
    }));

    const classSessionOptions = classSessionData?.map((item) => ({
        value: item._id,
        label: item.classSessionName,
    }));

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                classId: record.classId?._id,
                classSessionId: record.classSessionId?._id,
                linkZoom: record.linkZoom,
                schedule: record.schedule
                    ? dayjs(record.schedule, "DD/MM/YYYY")
                    : null
            });
        }
    }, [open, record, form]);

    const handleUpdateClassSchedule = async (values) => {
        const formatted = values.schedule.format("YYYY-MM-DD");
        const options = {
            ...values,
            id: record.id,
            schedule: formatted
        };

        await handleUpdate(dispatch, "admin/class-schedule", "classschedules", record._id, options, ()=> onCancel());
    }

    return (<>
        <Modal
            open={open}
            title="Cập nhật lịch học"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdateClassSchedule}>
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
                    <Button type="primary" htmlType="submit">Lưu lịch học</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}