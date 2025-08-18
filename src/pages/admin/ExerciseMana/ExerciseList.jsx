import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import padding1 from "../../../components/Padding";
import { usePagination } from "../../../hooks/usePagination";
import { fetchAction } from "../../../redux/actions/baseAction";
import { getAllData } from "../../../services/baseService";
import ExerciseCard from "./components/ExerciseCard";
import ExerciseFilter from "./components/ExerciseFilter";
import ExerciseFormModal from "./components/ExerciseFormModal";
import ExerciseKeyModal from "./components/ExerciseKeyModal";


export default function ExerciseList() {
  const [formOpen, setFormOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [totalKey, setTotalKey] = useState(0);
  const [exerciseData, setExerciseData] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllData("skills").then((res) => { dispatch(fetchAction("skills", res)) });
    getAllData("classes").then((res) => { dispatch(fetchAction("classes", res)) });
    getAllData("exercises").then((res) => { dispatch(fetchAction("exercises", res)) });
  }, [dispatch]);

  const exerciseListData = useSelector(state => state.exercises.list);
  const skillListData = useSelector(state => state.skills.list);
  const classListData = useSelector(state => state.classes.list);

  const skillOptions = skillListData.map(item => ({ label: item.name, value: item.id }));
  const classOptions = classListData.map(item => ({ label: item.name, value: item.id }));

  const handleSubmit = (values) => {
    // Lưu tạm vào state để chuyển sang nhập đáp án
    setExerciseData(values);
    setTotalKey(values.totalQuestion);
    setFormOpen(false);
    setAnswerOpen(true);
  };

  const { paginate, getPagination } = usePagination(12);
  const [filters, setFilters] = useState({ keyword: "", skills: [] });

  const filteredExercises = exerciseListData.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(filters.keyword.toLowerCase());
    const matchSkill =
      filters.skills.length === 0 ||
      filters.skills.some(skillId => item.skillId.includes(skillId));
    const matchDelete = !item.deleted;
    return matchSearch && matchSkill && matchDelete;
  });

  return (
    <>
      <div style={padding1}>
        <Space direction="vertical" size='large' style={{ width: "100%" }}>
          <ExerciseFilter skillOptions={skillOptions} onFilterChange={(newFilter) => setFilters({ ...filters, ...newFilter })} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>Thêm bài tập mới</Button>
          </div>
          <Row gutter={[16, 16]}>
            {paginate(filteredExercises).map((item) => (
              <Col xl={4} key={item.id}>
                <ExerciseCard
                  item={item}
                  classListData={classListData}
                  skillListData={skillListData}
                />
              </Col>
            ))}
          </Row>

          {/* Pagination control */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Pagination {...getPagination(filteredExercises.length)} />
          </div>
        </Space>
      </div>

      <ExerciseFormModal
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        classOptions={classOptions}
        skillOptions={skillOptions}
      />

      <ExerciseKeyModal
        visible={answerOpen}
        onClose={() => setAnswerOpen(false)}
        totalQuestion={totalKey}
        exerciseData={exerciseData}
      />
    </>

  );
}

