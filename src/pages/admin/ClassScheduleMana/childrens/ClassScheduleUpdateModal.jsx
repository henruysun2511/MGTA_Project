import { Button, Col, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from "dayjs";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from '../../../../redux/actions/baseAction';
import { updateData } from '../../../../services/baseService';

export default function ClassScheduleUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const classData = useSelector((state) => state.classes.list);
    const classSessionData = useSelector((state) => state.classsessions.list);

    const classOptions = classData.map((item) => ({
        value: item.id,
        label: item.className,
    }));

    const classSessionOptions = classSessionData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                classId: record.classId,
                classSessionId: record.classSessionId,
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

        const res = await updateData("classschedules", record.id, options);
        if (res) {
            dispatch(updateAction("classschedules", res));
            alert("Cập nhật lịch học thành công");
            onCancel(); 
        } else {
            alert("Cập nhật lịch học thất bại");
        }
    };

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