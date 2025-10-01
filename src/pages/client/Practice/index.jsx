import { Col, Input, Row, Space, Statistic } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { createData } from "../../../services/baseService";
import { alertConfirm, alertSuccess, alertWarning } from "../../../utils/alerts";
import "./practice.scss";
const { Countdown } = Statistic;

export default function Practice() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const cleanId = id.replace(/^:/, "");

    const [data] = useFetch(`exercise/${cleanId}`, {}, {});
    const exerciseData = data || {};

    const multipleChoiceQuestions =
        exerciseData?.questions?.filter((q) => q.answer.length === 1) || [];
    const essayQuestions =
        exerciseData?.questions?.filter((q) => q.answer.length > 1) || [];

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [endTime, setEndTime] = useState(false);

    useEffect(() => {
        if (exerciseData?.duration) {
            const deadline = Date.now() + exerciseData.duration * 60 * 1000;
            setTimeLeft(deadline);
        }
    }, [exerciseData?.duration]);

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        setAnswers((prev) => ({
            ...prev,
            [selectedQuestion]: value,
        }));
    };

    const handleSubmit = async () => {
        const options = {
            answers: exerciseData.questions.map((q) => ({
                index: q.index,
                answer: answers[q.index] || "",
            })),
        };
        if (endTime) {
            let result = await alertWarning("Đã hết thời gian làm bài, vui lòng nộp bài", "Nộp bài");
            if (result.isConfirmed) {
                const res = await createData(`exercise/submit/${exerciseData._id}`, options);
                if (res?.data?._id) {
                    const alert = await alertSuccess("Nộp bài thành công", "Xem kết quả");
                    if (alert.isConfirmed) {
                        navigate(`/score/${res.data._id}`);
                    }
                }
            }
        } else {
            let result = await alertConfirm("Xác nhận nộp bài", "", "Ok", "Hủy");
            if (result.isConfirmed) {
                const res = await createData(`exercise/submit/${exerciseData._id}`, options);
                if (res?.data?._id) {
                    const alert = await alertSuccess("Nộp bài thành công", "Xem kết quả");
                    if (alert.isConfirmed) {
                        navigate(`/score/${res.data._id}`);
                    }
                }
            }
        }
    };

    const handleBackClick = async () => {
        const response = await alertConfirm(
            "Thoát?",
            "Những thay đổi sẽ không được lưu",
            "Thoát",
            "Hủy"
        );
        if (response.isConfirmed) {
            navigate(-1);
        }
    };

    return (
        <div className="practice">
            <div className="practice__wrap">
                <div className="button__back" onClick={handleBackClick}>
                    Thoát
                </div>
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div className="test__wrap"></div>
                        <div className="image__list">
                            {exerciseData.images ? (
                                exerciseData.images.map((img, index) => (
                                    <div className="inner-image" key={index}>
                                        <img src={img} alt="" />
                                    </div>
                                ))
                            ) : (
                                <h3>Lỗi hiển thị ảnh</h3>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <div className="question__wrap">
                            <h3>Thời gian làm bài: </h3>
                            <div className="time">
                                {timeLeft ? (
                                    <Countdown
                                        title=""
                                        value={timeLeft}
                                        format="HH:mm:ss"
                                        onFinish={() => {
                                            setEndTime(true);
                                            handleSubmit();
                                        }}
                                    />
                                ) : (
                                    <p>Đang tải...</p>
                                )}
                            </div>

                            <div className="button__submit" onClick={handleSubmit}>
                                NỘP BÀI
                            </div>

                            <h4 className="alert">
                                Vui lòng chọn câu hỏi và nhập đáp án tương ứng
                            </h4>

                            <h3>Trắc nghiệm</h3>
                            <div className="question__number">
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
                                    })
                                ) : (
                                    <h3 className="infomation">
                                        Không có câu hỏi trắc nghiệm
                                    </h3>
                                )}
                            </div>

                            <h3>Điền chữ</h3>
                            <div className="question__number qn--1">
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
                                    <h3 className="infomation">Không có câu hỏi tự luận</h3>
                                )}
                            </div>

                            <h3>Câu trả lời</h3>
                            <Space direction="vertical" size="middle">
                                <label htmlFor="answer">
                                    Câu số: {selectedQuestion ?? "-"}
                                </label>
                                <Input
                                    id="answer"
                                    placeholder="Nhập câu trả lời vào đây"
                                    value={answers[selectedQuestion] || ""}
                                    onChange={handleAnswerChange}
                                    size="large"
                                    disabled={!selectedQuestion}
                                />
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
