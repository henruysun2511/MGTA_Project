import { Button, Col, DatePicker, Form, Modal, Select } from 'antd';
import dayjs from "dayjs";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUpdate } from '../../../../../utils/handles';

export default function ClassExerciseUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const exerciseData = useSelector(state => state.exercises.list || []);
    const exerciseOptions = exerciseData.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    useEffect(() => {
        if (open && record) {
            const exercise = exerciseData.find((r) => String(r._id) === String(record.exerciseId));
            form.setFieldsValue({
                exerciseId: exercise ? String(exercise._id) : undefined,
                due_date: record.due_date
                    ? dayjs(record.due_date, "DD/MM/YYYY")
                    : null
            });
        }
    }, [open, record, exerciseData, form]);

    const handleUpdateClassExercise = async (values) => {
        const formatted = values.due_date.format("YYYY-MM-DD");
        const options = {
            classId: record.classId,
            exerciseId: values.exerciseId,
            due_date: formatted
        };
         await handleUpdate(dispatch, "admin/exercise-class", "deadlines", record._id, options, ()=> onCancel()); 
    };

    return (<>
        <Modal
            open={open}
            title="Cập nhật bài tập giao cho lớp"
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdateClassExercise}>
                <Form.Item
                    name="exerciseId"
                    label="Bài tập"
                    rules={[{ required: true, message: 'Vui lòng chọn bài tập' }]}
                >
                    <Select placeholder="Chọn bài tập" options={exerciseOptions}>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="due_date"
                    label="Thời hạn nộp bài"
                    rules={[{ required: true, message: 'Vui lòng chọn thời hạn nộp bài' }]}
                >
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>


                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Lưu bài tập</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}