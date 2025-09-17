import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Space } from "antd";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from "../../../hooks/useFetch";
import useQuery from '../../../hooks/useQuery';
import { fetchAction } from '../../../redux/actions/baseAction';
import './ExerciseMana.scss';
import ExerciseCard from "./childrens/ExerciseCard";
import ExerciseCreateModal from "./childrens/ExerciseCreateModal";
import ExerciseFilter from "./childrens/ExerciseFilter";
import ExerciseKeyModal from "./childrens/ExerciseKeyModal";


export default function ExerciseMana() {
    const dispatch = useDispatch();

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10,
    })
    const [data] = useFetch("admin/exercise/exercises", query, {});
    console.log(data);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("exercises", data.exercises?.items))
        }
    }, [data, dispatch]);

    const exerciseData = useSelector(state => state.exercises.list || []).filter(ex => !ex.deleted).reverse();;
    console.log(exerciseData);

    const [skillDataRes] = useFetch("admin/skill/skills", {}, {});
    const skillData = skillDataRes || [];
    console.log(skillData);

    const [formOpen, setFormOpen] = useState(false);
    const [answerOpen, setAnswerOpen] = useState(false);
    const [totalKey, setTotalKey] = useState(0);
    const [exerciseCommonData, setexerciseCommonData] = useState(null);

    const handleSubmit = (values) => {
        // Lưu vào state để chuyển sang nhập đáp án
        setexerciseCommonData(values);
        setTotalKey(values.totalQuestion);
        setFormOpen(false);
        setAnswerOpen(true);
    };

    const handleFilterChange = (newFilter) => {
        updateQuery({
            ...newFilter,
            page: 1,
        });
    };

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    return (
        <>
            <div style={padding1}>
                <Space direction="vertical" size='large' style={{ width: "100%" }}>
                    <ExerciseFilter skillData={skillData} onFilterChange={handleFilterChange} />

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>Thêm bài tập mới</Button>
                    </div>

                    <Row gutter={[16, 16]}>
                        {exerciseData.map((exercise) => (
                            <Col xl={4} key={exercise._id}>
                                <ExerciseCard
                                    exercise={exercise}
                                />
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination*/}
                    {data?.exercises?.pagination && (
                        <Pagination
                            current={data.exercises.pagination.currentPage}
                            pageSize={data.exercises.pagination.limit}
                            total={data.exercises.pagination.count}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20', '50']}
                        />
                    )}

                </Space>
            </div>

            <ExerciseCreateModal
                open={formOpen}
                onCancel={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                skillData={skillData}
            />

            <ExerciseKeyModal
                visible={answerOpen}
                onClose={() => setAnswerOpen(false)}
                totalQuestion={totalKey}
                exerciseData={exerciseCommonData}
            />
        </>

    )
}