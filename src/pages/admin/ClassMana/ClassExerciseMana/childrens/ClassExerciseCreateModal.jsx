import { Button, Col, DatePicker, Form, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { handleCreate } from "../../../../../utils/handles";


export default function ClassExerciseCreateModal({ open, onCancel, exerciseData, classId }) {
    const dispatch = useDispatch();

    const exerciseOptions = exerciseData.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const handleAddClassExercise = async (values) => {
        const formatted = values.due_date.format("YYYY-MM-DD");;
        const options = {
            exerciseId: values.exerciseId,
            classId: classId,
            due_date: formatted
        };

        await handleCreate(dispatch, "admin/exercise-class", "deadlines", options, () => onCancel());
    }

    return (
        <>
            <Modal open={open} onCancel={onCancel} title={`Giao bài tập cho lớp `} width={500} footer={null}>
                <Form layout="vertical" onFinish={handleAddClassExercise}>
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
                        <Button type="primary" htmlType="submit">Thêm bài tập</Button>
                    </Col>
                </Form>
            </Modal>
        </>
    )

}