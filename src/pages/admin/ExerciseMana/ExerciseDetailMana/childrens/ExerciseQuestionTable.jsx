import {
    CheckOutlined,
    CloseSquareOutlined,
    EditOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleUpdate } from '../../../../../utils/handles';

export default function ExerciseQuestionTable({ exerciseData }) {
    const dispatch = useDispatch();
    const [editableQuestions, setEditableQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (exerciseData?.questions) {
            // Tạo bản copy để edit
            setEditableQuestions(exerciseData.questions.map(q => ({ ...q })));
        }
    }, [exerciseData]);


    const answerColumns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Câu số', dataIndex: 'cauSo', key: 'cauSo' },
        {
            title: 'Đáp án',
            dataIndex: 'answer',
            key: 'dapAn',
            render: (text, record, index) => (
                <Input
                    disabled={!isEditing}
                    value={editableQuestions[index]?.answer || ""}
                    onChange={(e) => {
                        const newQuestions = [...editableQuestions];
                        newQuestions[index].answer = e.target.value;
                        setEditableQuestions(newQuestions);
                    }}
                />
            ),
        }
    ];

    const answerData = editableQuestions.map((q, i) => ({
        key: i,
        stt: i + 1,
        cauSo: `Câu ${q.index}`,
        answer: q.answer
    }));

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Khôi phục dữ liệu gốc
        if (exerciseData?.questions) {
            setEditableQuestions(exerciseData.questions.map(q => ({ ...q })));
        }
        setIsEditing(false);
    };

    const handleAddQuestion = () => {
        const newIndex = editableQuestions.length + 1;
        setEditableQuestions([...editableQuestions, { index: newIndex, answer: "" }]);
    };

    const handleSave = async () => {
        const options = {
            // ...exerciseData,
            skillId: exerciseData.skillId.map(s => s._id),
            questions: editableQuestions,
            totalQuestion: editableQuestions.length
        };

        await handleUpdate(dispatch, "admin/exercise", "exercise", exerciseData._id, options);
        setIsEditing(false);
    };

    return (
        <>
            <div style={{ padding: "0 0 0 100px", display: "flex", justifyContent: "space-between" }}>
                <Table dataSource={answerData} columns={answerColumns} pagination={false} style={{ width: "80%" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {!isEditing && (
                        <Button icon={<EditOutlined />} type="primary" ghost size='middle' onClick={handleEdit}>
                            Chỉnh sửa
                        </Button>
                    )}
                    {isEditing && (
                        <>
                            <Button icon={<PlusCircleOutlined />} type="primary" ghost size='middle' onClick={handleAddQuestion}>
                                Thêm câu hỏi
                            </Button>
                            <Button icon={<CloseSquareOutlined />} type="primary" ghost size='middle' onClick={handleCancel}>
                                Hủy
                            </Button>
                            <Button icon={<CheckOutlined />} type="primary" ghost size='middle' onClick={handleSave}>
                                Lưu
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}