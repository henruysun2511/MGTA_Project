import { Button, Col, Form, Input, Row, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAction } from "../../../redux/actions/baseAction";
import { getDataBySpecificId } from "../../../services/baseService";
import { formatDateFromApi } from '../../../utils/formatDate';
import './exerciseDetail.scss';
const Column = { Table }

export default function ExerciseDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const cleanId = id.replace(/^:/, "");

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Lấy deadline theo id
                const deadlines = await getDataBySpecificId("deadlines", "id", cleanId);
                dispatch(fetchAction("deadlines", deadlines));
                if (!deadlines || deadlines.length === 0) return;

                const exerciseId = deadlines[0].exerciseId;

                // Lấy exercise theo exerciseId
                const exercises = await getDataBySpecificId("exercises", "id", exerciseId);
                dispatch(fetchAction("exercises", exercises));
                if (!exercises || exercises.length === 0) return;

                //Lấy skillIds từ exercise
                if (exercises[0].skillIds?.length) {
                    const skills = await getDataBySpecificId("skills", "id", exercises[0].skillIds);
                    dispatch(fetchAction("skills", skills));
                }

                //Lấy result theo exerciseId
                const results = await getDataBySpecificId("results", "exerciseId", exerciseId);
                dispatch(fetchAction("results", results));

                //Lấy comments theo exerciseId
                const comments = await getDataBySpecificId("comments", "exerciseId", exerciseId);
                dispatch(fetchAction("comments", comments));

                // Lấy toàn bộ studentId từ comments và results
                const studentIds = [
                    ...new Set([
                        ...(comments?.map(c => c.studentId) || []),
                        ...(results?.map(r => r.studentId) || [])
                    ])
                ];


                if (studentIds.length) {
                    const students = await Promise.all(
                        studentIds.map(id => getDataBySpecificId("students", "id", id))
                    );
                    dispatch(fetchAction("students", students.flat()));
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, [dispatch, cleanId]);

    const exerciseData = useSelector(state => state.exercises.list).filter(ex => !ex.deleted) || [];
    const commentData = useSelector(state => state.comments.list).filter(ex => !ex.deleted) || [];
    const resultData = useSelector(state => state.results.list).filter(ex => !ex.deleted) || [];
    const studentData = useSelector(state => state.students.list).filter(s => !s.deleted).sort(
        (a, b) => a.score - b.score
    ) || [];

    // Tạo map id → student để lookup nhanh
    const studentMap = studentData.reduce((acc, s) => {
        acc[s.id] = s;
        return acc;
    }, {});
    console.log(studentMap)

    let tracNghiem = 0;
    let tuLuan = 0;
    if (exerciseData[0]) {
        tracNghiem = exerciseData[0].questions.filter(q => q.answer?.length === 1).length;
        tuLuan = exerciseData[0].questions.filter(q => q.answer?.length > 1).length;
    }

    const handleComment = async (e) => {
        console.log(e);
    }

    return (
        <>
            <div className="section-1">
                <div className="inner-wrap">
                    <Row gutter={20}>
                        <Col span={16}>
                            <div className="col-8">
                                <div className="practice">
                                    <h1>{exerciseData[0]?.title}</h1>
                                    <p>Ngày đăng: {formatDateFromApi(exerciseData[0]?.createAt) || 'N/A'}</p>
                                    <h3>Thông tin chung</h3>
                                    <div className="inner-icon">
                                        <i className="fa-solid fa-users"></i>
                                        <p>Unit: {exerciseData[0]?.unit || 'N/A'}</p>
                                    </div>
                                    <div className="inner-icon">
                                        <i className="fa-solid fa-clock"></i>
                                        <p>Thời gian làm bài: {exerciseData[0]?.totalTime || 'N/A'} phút</p>
                                    </div>
                                    <div className="inner-icon">
                                        <i className="fa-solid fa-circle-question"></i>
                                        <p>Số lượng câu hỏi: {exerciseData[0]?.totalQuestion || 'N/A'} câu hỏi</p>
                                    </div>
                                    <h3>Chi tiết câu hỏi:</h3>
                                    <p className="p1">Câu trắc nghiệm: {tracNghiem} câu</p>
                                    <p className="p1">Câu điền đáp án: {tuLuan} câu</p>
                                </div>

                                {/* Bình luận */}
                                <div className="comment">
                                    <h3>Bình luận</h3>
                                    <Form layout="vertical" onFinish={handleComment}>
                                        <Row>
                                            <Col span={22}>
                                                <Form.Item name="content" label="" rules={[{ required: true }]}>
                                                    <Input size='large' placeholder="Cảm xúc của em sau khi làm bài" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2} style={{ textAlign: "right" }}>
                                                <Button size='large' type="primary" htmlType="submit">Gửi</Button>
                                            </Col>
                                        </Row>
                                    </Form>


                                    {commentData.map(c => {
                                        const student = studentMap[c.studentId];
                                        return (
                                            <div className="comment-user" key={c.id}>
                                                <div className="comment-image">
                                                    <img src={student?.avatar || "default-avatar.png"} alt="" />
                                                </div>
                                                <div className="comment-info">
                                                    <div className="comment-name">{student?.name || "Ẩn danh"}</div>
                                                    <div className="comment-content">{c.content}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Col>

                        {/* Bảng xếp hạng */}
                        <Col span={8}>
                            <div className="rank">
                                <h2>🏆 BẢNG XẾP HẠNG</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Hạng</th>
                                            <th>Học sinh</th>
                                            <th>Lớp</th>
                                            <th>Điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultData.map((r, idx) => {
                                            const student = studentMap[r.studentId];
                                            return (
                                                <tr key={r.id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{student?.name || "Ẩn danh"}</td>
                                                    <td>{student?.className || "N/A"}</td>
                                                    <td>{r.score || "0"}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}
