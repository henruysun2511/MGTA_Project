import { Checkbox, Col, Input, Pagination, Row, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useFetch from '../../../../../hooks/useFetch';
import useQuery from '../../../../../hooks/useQuery';
import { alertInfo } from '../../../../../utils/alerts';
const { Search } = Input;

export default function StudentExercise({ classId }) {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    });

    const [data] = useFetch(`exercise-class/exercises/${classId}`, query, {});
    const exerciseData = data?.items ? data.items : [];

    const [skillResData] = useFetch("skill/skills", {}, {})
    const skillData = skillResData ? skillResData.skills : [];
    const skillOptions = skillData ? skillData.map((sk) => ({
        value: sk._id,
        label: sk.skillName
    })) : [];

    const handleWatchDetail = (id) => {
        if (!accessToken) {
            alertInfo("Vui lòng đăng nhập để tiếp tục");
        } else {
            navigate(`/exerciseDetail/:${id}`);
        }
    }

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    const [filter, setFilter] = useState({
        searchText: "",
        selectedSkills: []
    });


    const filteredExercises = exerciseData.filter((exercise) => {
        const titleMatch = exercise.exerciseId.title
            .toLowerCase()
            .includes(filter.searchText.toLowerCase());

        const skillMatch =
            filter.selectedSkills.length === 0 ||
            exercise.exerciseId?.skillId?.some((sk) =>
                filter.selectedSkills.includes(sk._id)
            );

        return titleMatch && skillMatch;
    });

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
                <Space direction="horizontal" size="middle" style={{ width: "100%" }}>
                    <p>Kỹ năng: </p>
                    <Checkbox.Group
                        options={skillOptions}
                        onChange={(checkedValues) =>
                            setFilter((prev) => ({
                                ...prev,
                                selectedSkills: checkedValues
                            }))
                        }
                    />
                </Space>


                <div className="practice__list">
                    <Row gutter={15}>
                        {
                            filteredExercises ? filteredExercises.map(exercise => (
                                <Col key={exercise._id} xs={24} sm={12} md={8} lg={6} xl={4} >
                                    <div className="practice__item">
                                        <h3>{exercise.exerciseId.title}</h3>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-users"></i>
                                            <p>Lớp {exercise.classId?.className || "N/A"}</p>
                                        </div>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-clock"></i>
                                            <p>{exercise.exerciseId?.duration || "N/A"} phút</p>
                                        </div>
                                        <div className="practice__icon">
                                            <i className="fa-solid fa-circle-question"></i>
                                            <p>{exercise.exerciseId?.totalQuestion || "N/A"} câu hỏi</p>
                                        </div>

                                        <div className="practice__tag">
                                            {exercise.exerciseId?.skillId?.map(skill => (
                                                <p key={skill._id}>#{skill.skillName}</p>
                                            ))
                                            }
                                        </div>
                                        <div className="button__detail" onClick={() => handleWatchDetail(exercise.exerciseId._id)}>
                                            Xem chi tiết
                                        </div>
                                    </div>
                                </Col>
                            ))
                                : <p>Chưa có bài tập nào được giao</p>
                        }
                    </Row>
                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                        {data?.pagination && (
                            <Pagination
                                current={data.pagination.currentPage}
                                pageSize={data.pagination.limit}
                                total={data.pagination.count}
                                onChange={handlePageChange}
                                showSizeChanger
                                pageSizeOptions={['5', '10', '20', '50']}
                            />
                        )}
                    </div>
                </div>
            </Space>
        </>
    )
}