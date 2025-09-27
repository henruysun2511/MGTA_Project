import { Col, Row, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { createData } from '../../../services/baseService';
import { alertError } from '../../../utils/alerts';
import { formatDateFromApi } from '../../../utils/formatDate';
import ExerciseDetailComment from './childrens/ExerciseDetailComment';
import ExerciseDetailRanking from './childrens/ExerciseDetailRanking';
import './exerciseDetail.scss';
const Column = { Table }

export default function ExerciseDetail() {
    const { id } = useParams();
    const cleanId = id.replace(/^:/, "");

    const [data] = useFetch(`exercise/${cleanId}`, {}, {});
    const exerciseData = data ? data : {};

    let tracNghiem = 0;
    let tuLuan = 0;
    if (exerciseData) {
        tracNghiem = exerciseData.questions ? exerciseData.questions.filter(q => q.answer?.length === 1).length : 0;
        tuLuan = exerciseData.questions ? exerciseData.questions.filter(q => q.answer?.length > 1).length : 0;
    }

    const navigate = useNavigate();

    const handlePractice = async (id) => {
        const res = await createData(`exercise/start/${id}`, {});
        if (res.statusCode === 201) {
            navigate(`/practice/:${id}`)
        } else {
            alertError("Bài tập đã làm!")
        }
    }

    return (
        <>
            <div className="exercise-detail">
                <div className="exercise-detail__wrap">
                    <Row gutter={20}>
                        <Col span={16}>
                            {
                                exerciseData && (
                                    <div className="exercise-detail__info">
                                        <h1>{exerciseData?.title || "N/A"}</h1>
                                        <p>Ngày đăng: {formatDateFromApi(exerciseData?.createAt) || 'N/A'}</p>
                                        <h3>Thông tin chung</h3>
                                        <div className="exercise-detail__icon">
                                            <i className="fa-solid fa-users"></i>
                                            <p>Unit: {exerciseData?.unit || 'N/A'}</p>
                                        </div>
                                        <div className="exercise-detail__icon">
                                            <i className="fa-solid fa-clock"></i>
                                            <p>Thời gian làm bài: {exerciseData?.duration || 'N/A'} phút</p>
                                        </div>
                                        <div className="exercise-detail__icon">
                                            <i className="fa-solid fa-circle-question"></i>
                                            <p>Số lượng câu hỏi: {exerciseData?.totalQuestion || 'N/A'} câu hỏi</p>
                                        </div>
                                        <h3>Kỹ năng</h3>
                                        <div className="exercise-detail__icon">
                                            {Array.isArray(exerciseData.skillId)
                                                ? exerciseData.skillId.map(skill => (
                                                    <p key={skill._id}>#{skill.skillName}</p>
                                                ))
                                                : []}
                                        </div>
                                        <h3>Chi tiết câu hỏi:</h3>
                                        <p className="p1">Câu trắc nghiệm: {tracNghiem} câu</p>
                                        <p className="p1">Câu điền đáp án: {tuLuan} câu</p>

                                        <div class="button__practice" onClick={() => handlePractice(exerciseData._id)}>LUYỆN TẬP</div>
                                    </div>
                                )
                            }
                            <ExerciseDetailComment exerciseId={cleanId} />
                        </Col>

                        <Col span={8}>
                            <ExerciseDetailRanking exerciseId={cleanId} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

