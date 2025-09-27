import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container/index";
import useFetch from "../../../hooks/useFetch";
import { formatDuration } from "../../../utils/formatDate";
import "./score.scss";

export default function Score() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const cleanId = id.replace(/^:/, "");

    const [data] = useFetch(`exercise/result/${cleanId}`, {}, {});
    const resultData = data ? data : {};
    console.log(data)
    console.log(resultData?.answers);

    const multipleChoiceAnswers = (resultData?.answers || []).filter(q => q?.studentAnswer?.length === 1);
    const essayAnswers = (resultData?.answers || []).filter(q => q?.studentAnswer?.length > 1);

    const total = resultData?.answers?.length || 0;
    const correct = resultData?.correctCount || 0;
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;

    return (
        <>
            <div class="score">
                <Container>
                    <div class="score__common">
                        <div class="overview">
                            <p>Thời gian hoàn thành: {formatDuration(resultData.duration) || "N/A"}</p>
                            <p>Tỉ lệ trả lời đúng: {accuracy}%</p>
                            {
                                resultData.score === 10 && (<p>Xuất sắc!</p>)
                            }{
                                resultData.score < 10  && (<p>Cô khen!</p>)
                            }{
                                resultData.score < 6 && (<p>Tiến bộ nha!</p>)
                            }
                            {
                                resultData.score < 5 && (<p>Cố thêm chút nữa nhé!</p>)
                            }
                        </div>
                        <div class="your-score">
                            <h3>{resultData.score || "N/A"}/10</h3>
                            <p>Điểm</p>
                        </div>
                    </div>
                    <div class="score__detail">
                        <div class="sta right">
                            <i class="fa-solid fa-circle-check"></i>
                            <h2>Số câu đúng</h2>
                            <h3>{resultData.correctCount || "N/A"}</h3>
                            <p>câu hỏi</p>
                        </div>
                        <div class="sta wrong">
                            <i class="fa-solid fa-circle-xmark"></i>
                            <h2>Số câu sai</h2>
                            <h3>{resultData.incorrectCount}</h3>
                            <p>câu hỏi</p>
                        </div>
                        <div class="sta non">
                            <i class="fa-solid fa-ban"></i>
                            <h2>Bỏ qua</h2>
                            <h3>0</h3>
                            <p>câu hỏi</p>
                        </div>
                    </div>
                    <div class="key">
                        <h2>Đáp án</h2>
                        <h3>Trắc nghiệm</h3>
                        <div class="key__list">
                            <Row>
                                <Col span={8}>
                                    {multipleChoiceAnswers.map(as => {
                                        return (
                                            <div class="key__item">
                                                <p class="number">{as.index}</p>
                                                <div class="new-key">{as.correctAnswer}:</div>
                                                {
                                                    as.isCorrect === true ? (
                                                        <>
                                                            <div class="old-answer">{as.studentAnswer}</div>
                                                            <i class="fa-solid fa-check right"></i>
                                                        </>

                                                    ) : (
                                                        <>
                                                            <div class="old-answer"><del>{as.studentAnswer}</del></div>
                                                            <i class="fa-solid fa-xmark wrong"></i>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                    }
                                </Col>
                                <Col span={8}>
                                </Col>
                                <Col span={8}>
                                </Col>
                            </Row>
                        </div>
                        <h3>Điền đáp án</h3>
                        {essayAnswers.map((es) => (
                            <div className="key-item" key={es.index}>
                                <p className="number">{es.index}</p>
                                <div className="new-key">{es.correctAnswer}</div>
                                {es.isCorrect ? (
                                    <>
                                        <div className="old-answer">{es.studentAnswer}</div>
                                        <i className="fa-solid fa-check right"></i>
                                    </>
                                ) : (
                                    <>
                                        <div className="old-answer">
                                            <del>{es.studentAnswer}</del>
                                        </div>
                                        <i className="fa-solid fa-xmark wrong"></i>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </Container >
            </div >
        </>
    )
}