import { Button, Col, DatePicker, Form, Modal, Select } from 'antd';
import dayjs from "dayjs";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from '../../../../../redux/actions/baseAction';
import { updateData } from '../../../../../services/baseService';

export default function ClassStudentUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const exerciseData = useSelector((state) => state.exercises.list).filter(ex => !ex.deleted);
    const exerciseOptions = exerciseData.map((item) => ({
        value: item.id,
        label: item.title,
    }));

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                exerciseId: record.exerciseId,
                due_date: record.due_date ? dayjs(record.due_date, "YYYY-MM-DD") : null
            });
        }
    }, [open, record, form]);

    const handleUpdateClassExercise = async (values) => {
        const formatted = values.due_date.format("YYYY-MM-DD");
        const options = {
            classId: record.classId,
            exerciseId: values.exerciseId,
            due_date: formatted
        };

        const res = await updateData("deadlines", record.id, options);
        if (res) {
            dispatch(updateAction("deadlines", res));
            alert("Cập nhật bài tập thành công");
            onCancel();
        } else {
            alert("Cập nhật bài tập thất bại");
        }
    };

    return (<>
        <Modal
            open={open}
            title="Cập nhật lịch học"
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