import { Checkbox, Col, Input, Row, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const { Search } = Input;

export default function StudentExercise({ deadlineData, exerciseData, skillData, classData }) {
    const navigate = useNavigate();

    const skillOptions = skillData.map((sk) => ({
        value: sk.id,
        label: sk.name
    }));

    const [filter, setFilter] = useState({
        searchText: "",
        selectedSkills: []
    });

    const filteredDeadlineData = deadlineData.filter(dl => {
        const exercise = exerciseData.find(ex => ex.id === dl.exerciseId);
        if (!exercise) return false;

        const matchSearch = exercise.title
            .toLowerCase()
            .includes(filter.searchText.toLowerCase());

        const matchSkill =
            filter.selectedSkills.length === 0 ||
            filter.selectedSkills.some(skillId => exercise.skillId.includes(skillId));

        // nếu có thêm điều kiện xóa thì check luôn
        const matchDelete = !exercise.deleted;

        return matchSearch && matchSkill && matchDelete;
    });

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
                        {filteredDeadlineData.length > 0 ? (filteredDeadlineData?.map((dl) => {
                            const exercise = exerciseData.find(ex => ex.id === dl.exerciseId);

                            // Lấy tên kỹ năng của bài tập này
                            const skillNames = exercise?.skillId.map(skillId => {
                                const skill = skillData.find(s => s.id === skillId);
                                return skill ? skill.name : null;
                            })

                            return (
                                <Col span={4} key={exercise.id}>
                                    <div className="practice__item">
                                        <h3>{exercise.title}</h3>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-users"></i>
                                            <p>Lớp {classData.className}</p>
                                        </div>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-clock"></i>
                                            <p>{exercise.totalTime} phút</p>
                                        </div>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-circle-question"></i>
                                            <p>{exercise.totalQuestion} câu hỏi</p>
                                        </div>

                                        {/* Hiển thị danh sách kỹ năng */}
                                        <div className="practice__tag">
                                            {skillNames.map((name, idx) => (
                                                <p key={idx}>
                                                    # {name}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="practice__status ps--1">
                                            Chưa làm
                                        </div>
                                        <div className="button__detail" onClick={() => handleWatchDetail(dl.id)}>Xem chi tiết</div>
                                    </div>
                                </Col>
                            )
                        })) : (<i>Không tìm thấy bài tập nào được giao</i>)}
                    </Row>
                </div>
            </Space>
        </>
    )
}