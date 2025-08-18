import {
    CheckOutlined,
    CloseSquareOutlined,
    EditOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import { Button, Input, Table, Tabs } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateExerciseAction } from "../../../../redux/actions/exerciseAction";
import { editExercise } from "../../../../services/exerciseService";

export default function ExerciseQuestionList({exerciseData}) {
    const dispatch = useDispatch();
    const [editableQuestions, setEditableQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
   

    useEffect(() => {
        if (exerciseData[0]?.questions) {
            // Tạo bản copy để edit
            setEditableQuestions(exerciseData[0].questions.map(q => ({ ...q })));
        }
    }, []);

     console.log(editableQuestions)
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
        if (exerciseData[0]?.questions) {
            setEditableQuestions(exerciseData[0].questions.map(q => ({ ...q })));
        }
        setIsEditing(false);
    };

    const handleAddQuestion = () => {
        const newIndex = editableQuestions.length + 1;
        setEditableQuestions([...editableQuestions, { index: newIndex, answer: "" }]);
    };

    const handleSave = async () => {
        const options = {
            questions: editableQuestions,
            totalQuestion: editableQuestions.length
        };
        const response = await editExercise(exerciseData[0].id, options);
        if (response) {
            dispatch(updateExerciseAction(response));
            alert("Sửa câu hỏi thành công");
        } else {
            alert("Sửa câu hỏi thất bại");
        }
        setIsEditing(false);
    };

    const items = [
        {
            key: '1',
            label: 'Đáp án',
            children: (
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
            ),
        },
        {
            key: '2',
            label: 'Ảnh đề',
            children: <div style={{ padding: "0 150px" }}>Ảnh đề ở đây</div>,
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )
}