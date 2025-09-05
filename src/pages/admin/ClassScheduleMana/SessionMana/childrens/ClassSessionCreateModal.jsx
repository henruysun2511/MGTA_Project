import { Button, Col, Form, Input, Modal, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { createAction } from '../../../../../redux/actions/baseAction';
import { createData } from '../../../../../services/baseService';

export default function ClassSessionCreateModal({open, onCancel}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleAddClassSession = async (values) => {
        const options ={
            ...values,
            startTime: values.startTime.format("HH:mm"),
            endTime: values.endTime.format("HH:mm"),
        }

        const res = await createData("classsessions", options);
        if (res) {
            dispatch(createAction("classsessions", res));
            alert("Thêm ca học mới thành công");
            onCancel();
        } else {
            alert("Thêm ca học mới thất bại");
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
                    name="name"
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