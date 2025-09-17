import { Button, Col, Form, Input, Modal, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { createAction } from '../../../../../redux/actions/baseAction';
import { createData } from '../../../../../services/baseService';
import { alertError, alertSuccess } from '../../../../../utils/alerts';
export default function ClassSessionCreateModal({open, onCancel}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleAddClassSession = async (values) => {
        const options ={
            ...values,
            startTime: values.startTime.format("HH:mm"),
            endTime: values.endTime.format("HH:mm"),
        }

        const res = await createData("admin/class-session", options);
        if (res.statusCode === 201) {
            dispatch(createAction("classsessions", res.data));
            alertSuccess(res.message);
            onCancel();
        } else {
            alertError(res.message);
        }
    }

    return (<>
        <Modal
            open={open}
            title="Thêm ca học mới"
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={handleAddClassSession}>
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
                        minuteStep={5}  // bước nhảy 5 phút
                    />
                </Form.Item>

                <Form.Item
                    name="endTime"
                    label="Giờ kết thúc"
                    rules={[{ required: true, message: 'Vui lòng giờ kết thúc' }]}
                >
                    <TimePicker
                        format="HH:mm"
                        minuteStep={5}  // bước nhảy 5 phút
                    />
                </Form.Item>

                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Thêm ca học</Button>
                </Col>
            </Form>
        </Modal>

    </>)
}