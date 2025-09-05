import { Col, Input, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAction } from "../../../redux/actions/baseAction";
import { getDataBySpecificId } from "../../../services/baseService";
import "./practice.scss";
const { Countdown } = Statistic;

export default function Practice() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const cleanId = id.replace(/^:/, "");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercises = await getDataBySpecificId("exercises", "id", cleanId);
                dispatch(fetchAction("exercises", exercises));
            } catch (error) {
                console.error("Fetch error:", error);
            };
        }
        fetchData();
    }, [dispatch, cleanId]);

    const exerciseData = useSelector(state => state.exercises.list).filter(ex => !ex.deleted) || [];
    console.log(exerciseData);

    const multipleChoiceQuestions =
        exerciseData[0]?.questions?.filter((q) => q.answer.length === 1) || [];
    const essayQuestions =
        exerciseData[0]?.questions?.filter((q) => q.answer.length > 1) || [];

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSubmitClick = () => {
        console.log("Nộp bài!");
    };

    const [selectedQuestion, setSelectedQuestion] = useState(null); // số câu đang chọn
    const [answers, setAnswers] = useState({}); // { index: "A" }

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        setAnswers((prev) => ({
            ...prev,
            [selectedQuestion]: value, // cập nhật theo câu đang chọn
        }));
    };

    const handleSubmit = () => {
        const result = Object.entries(answers).map(([index, answer]) => ({
            index: Number(index),
            answer: answer
        }));

        console.log("Danh sách câu trả lời:", result);
    };

    const [deadline, setDeadline] = useState(exerciseData.totalTime); // 30s

    return (
        <>
            <div class="section-1">
                <div class="inner-wrap">
                    <div class="button-back" onclick="handleBackClick()">Thoát</div>
                    <Row gutter={10}>
                        <Col span={18}>
                            <div class="test-wrap"></div>
                            <div class="image-list">
                                {exerciseData.images ? (
                                    exerciseData.images.map(img => {
                                        <div className="inner-image" key={idx}>
                                            <img src={img} alt="" />
                                        </div>
                                    })

                                ) : (
                                    <h3>Lỗi hiển thị ảnh</h3>
                                )
                                }

                            </div>
                        </Col>
                        <Col span={6}>
                            <div class="question-wrap">
                                <h3>Thời gian làm bài: </h3>
                                <div class="time">
                                    <Countdown
                                        title="Thời gian làm bài"
                                        value={Date.now() + (exerciseData[0]?.totalTime || 0) * 1000}
                                        format="HH:mm:ss"
                                        onFinish={() => {
                                            alert("Hết thời gian!");
                                            // ở đây có thể tự động nộp bài
                                            handleSubmit();
                                        }}
                                    />
                                </div>
                                <div className="button-submit" onClick={handleSubmit}>
                                    NỘP BÀI
                                </div>
                                <h4 class="alert">Vui lòng chọn câu hỏi và nhập đáp án tương ứng</h4>
                                <h3>Trắc nghiệm</h3>
                                <div class="question-number">
                                    {multipleChoiceQuestions.length > 0 ? (
                                        multipleChoiceQuestions.map((q) => {
                                            const ans = answers[q.index];
                                            return (
                                                <p
                                                    key={q.index}
                                                    className={ans ? "active" : ""}
                                                    onClick={() => setSelectedQuestion(q.index)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {q.index} {ans ? `: ${ans}` : ""}
                                                </p>
                                            );
                                        }
                                        )
                                    ) : (
                                        <p>Không có câu hỏi trắc nghiệm</p>
                                    )}
                                </div>
                                <h3>Điền chữ</h3>
                                <div class="question-number qn-1">
                                    {essayQuestions.length > 0 ? (
                                        essayQuestions.map((q) => {
                                            const ans = answers[q.index];
                                            return (
                                                <p
                                                    key={q.index}
                                                    className={ans ? "active" : ""}
                                                    onClick={() => setSelectedQuestion(q.index)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {q.index} {ans ? `: ${ans}` : ""}
                                                </p>
                                            );
                                        })
                                    ) : (
                                        <>Không có câu hỏi tự luận</>
                                    )}
                                </div>
                                <h3>Câu trả lời</h3>

                                <label htmlFor="answer">Câu số: {selectedQuestion}</label>
                                <Input
                                    id="answer"
                                    placeholder="Nhập câu trả lời vào đây"
                                    value={answers[selectedQuestion] || ""}
                                    onChange={handleAnswerChange}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}