import { Button, Col, Form, Input, Modal, TimePicker } from 'antd';
import dayjs from "dayjs";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';
import { alertError, alertSuccess } from '../../../../../utils/alerts';

export default function ClassSessionUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                classSessionName: record.classSessionName || 'N/A',
                startTime: record.startTime ? dayjs(record.startTime, "HH:mm") : null,
                endTime: record.endTime ? dayjs(record.endTime, "HH:mm") : null,
            });
        }
    }, [open, record, form]);

    const handleUpdateClassSession = async (values) => {
        const options = {
            ...values,
            startTime: values.startTime.format("HH:mm"),
            endTime: values.endTime.format("HH:mm")
        };

        const res = await updateData("admin/class-session", record._id, options);
        if (res.statusCode === 200) {
            dispatch(updateAction("classsessions", res.data));
            alertSuccess(res.message);
            onCancel();
        } else {
            alertError(res.message);
        }
    };

    return (<>
        <Modal
            open={open}
            title="Chỉnh sửa ca học"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdateClassSession}>
                <Form.Item
                    name="classSessionName"
                    label="Ca học"
                    rules={[{ required: true, message: 'Vui lòng chọn ca học' }]}
                >
                    <Input placeholder="Ca 1, Ca 2,.." />
                </Form.Item>

                <Form.Item
                    name="startTime"
                    label="Giờ bắt đầu"
                    rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
                >
                    <TimePicker
                        format="HH:mm"
                        minuteStep={5}
                    />
                </Form.Item>

                <Form.Item
                    name="endTime"
                    label="Giờ kết thúc"
                    rules={[{ required: true, message: 'Vui lòng giờ kết thúc' }]}
                >
                    <TimePicker
                        format="HH:mm"
                        minuteStep={5}
                    />
                </Form.Item>

                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Lưu ca học</Button>
                </Col>
            </Form>
        </Modal>

    </>)
}