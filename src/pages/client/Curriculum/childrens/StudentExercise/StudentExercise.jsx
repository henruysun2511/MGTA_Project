import { Checkbox, Col, Input, Row, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import useFetch from '../../../../../hooks/useFetch';
import useQuery from '../../../../../hooks/useQuery';
const { Search } = Input;

export default function StudentExercise({ classId }) {
    const navigate = useNavigate();

    const skillData = [];
    const skillOptions = skillData ? skillData.map((sk) => ({
        value: sk.id,
        label: sk.name
    })) : [];

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    });

    const [data] = useFetch(`exercise-class/exercises/${classId}`, query, {});
    console.log(data);
    const exerciseData = data?.items ? data.items : [];
    console.log(exerciseData)

    const handleWatchDetail = (id) => {
        navigate(`/exerciseDetail/:${id}`);
    }

    return (
        <>
            <Space direction='vertical' size="large" style={{ width: "100%" }}>
                <Search
                    placeholder="Tìm kiếm tên bài tập"
                    size="large"
                    style={{ width: "100%", fontSize: "18px" }}
                    onChange={(e) => setFilter(prev => ({
                        ...prev,
                        searchText: e.target.value
                    }))}
                />
                <Space direction='horizontal' size="middle" style={{ width: "100%" }}
                    onChange={(checkedValues) => setFilter(prev => ({
                        ...prev,
                        selectedSkills: checkedValues
                    }))}>
                    <p>Kỹ năng: </p> <Checkbox.Group options={skillOptions} />
                </Space>


                <div className="practice__list">
                    <Row gutter={15}>
                        {
                            exerciseData ? exerciseData.map(exercise => (
                                <Col span={4} key={exercise._id}>
                                    <div className="practice__item">
                                        <h3>{exercise.exerciseId.title}</h3>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-users"></i>
                                            <p>Lớp {exercise.classId.className}</p>
                                        </div>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-clock"></i>
                                            <p> phút</p>
                                        </div>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-circle-question"></i>
                                            <p> câu hỏi</p>
                                        </div>

                                        <div className="practice__tag"></div>

                                        <div className="practice__status ps--1">
                                            Chưa làm
                                        </div>
                                        <div className="button__detail" onClick={() => handleWatchDetail(exercise._id)}>
                                            Xem chi tiết
                                        </div>
                                    </div>
                                </Col>
                            ))
                                : <p>Chưa có bài tập nào được giao</p>
                        }


                    </Row>
                </div>
            </Space>
        </>
    )
}