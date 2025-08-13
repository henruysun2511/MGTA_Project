import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import padding1 from "../../../components/Padding";
import { getAllClass } from "../../../services/classService";
import { getAllSkills } from "../../../services/skillService";
import AssignmentFilter from "./components/AssignmentFilter";
import AssignmentKeyModal from "./components/AssignmentKeyModal";
import AssignmentFormModal from "./components/AssignmentModal";
import AssignmentCard from "./components/AssisgnmentCard";

export default function AssignmentListPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [totalKey, setTotalKey] = useState(0);
  const [assignmentData, setAssignmentData] = useState(null);


  const dispatch = useDispatch();
  useEffect(() => {
    // Gọi API và dispatch dữ liệu vào store
    getAllSkills().then(data => dispatch({ type: "FETCH_SKILLS", payload: data }));
    getAllClass().then(data => dispatch({ type: "FETCH_CLASSES", payload: data }));
    getAllAsignment().then(data => dispatch({ type: "FETCH_ASSIGNMENTS", payload: data }));
  }, [dispatch]);

  const skillListData = useSelector(state => state.skillReducer.skillList);
  const classListData = useSelector(state => state.classReducer.classList);
  const assignmentListData = useSelector(state => state.assignmentReducer.assignmentList);
  //Lấy danh sách bài tập chưa xóa
  const activeAssignments = assignmentListData.filter(a => !a.isDeleted);

  const skillOptions = skillListData.map(item => ({ label: item.name, value: item.id }));
  const classOptions = classListData.map(item => ({ label: item.name, value: item.id }));

  const handleSubmit = (values) => {
    // Lưu tạm vào state để chuyển sang nhập đáp án
    setAssignmentData(values);
    setTotalKey(values.totalQuestion);
    setFormOpen(false);
    setAnswerOpen(true);
  };

  return (
    <>
      <div style={padding1}>
        <Space direction="vertical" size='large' style={{ width: "100%" }}>
          <AssignmentFilter skillOptions={skillOptions} classOptions={classOptions} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setFormOpen(true)}>Thêm bài tập mới</Button>
          </div>
          <Row gutter={[16, 16]}>
            {activeAssignments.map(item => (
              <Col xl={4} key={item.id}>
                <AssignmentCard item={item} classListData={classListData} skillListData={skillListData} />
              </Col>
            ))}
          </Row>
        </Space>
      </div>


      <AssignmentFormModal
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        classOptions={classOptions}
        skillOptions={skillOptions}
      />

      <AssignmentKeyModal
        visible={answerOpen}
        onClose={() => setAnswerOpen(false)}
        totalQuestion={totalKey}
        assignmentData={assignmentData}
      />
    </>


  );
}

