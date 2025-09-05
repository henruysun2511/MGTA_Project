import { Button, Col, DatePicker, Form, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../../../../redux/actions/baseAction";
import { createData } from "../../../../../services/baseService";
import { alertSuccess } from "../../../../../utils/alerts";


export default function ClassExerciseCreateModal({ open, onClose, exerciseData, classId }) {
    const dispatch = useDispatch();

    const classDataById = useSelector(state => state.classes.list).filter(item => item.id === classId);
    const className = classDataById[0]?.className;

    const exerciseOptions = exerciseData.map((item) => ({
        value: item.id,
        label: item.title,
    }));

    const handleAddClassExercise = async (values) => {
        const formatted = values.due_date.format("YYYY-MM-DD");;
        const options = {
            exerciseId: values.exerciseId,
            classId: classId,
            due_date: formatted
        };

        const res = await createData("deadlines", options);
        if (res) {
            dispatch(createAction("deadlines", res));
            // const nofityOptions = {
            //     message: `Giáo viên đã giao thêm bài tập mới`,
            // }
            // const res2 = await createData("nofitications", nofityOptions);

            alertSuccess("Giao bài tập thành công");
            onClose();
        } else {
            alert("Giao bài tập thất bại");
        }
    }
    return (
        <>
            <Modal open={open} onCancel={onClose} title={`Giao bài tập cho lớp ${className}`} width={500} footer={null}>
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