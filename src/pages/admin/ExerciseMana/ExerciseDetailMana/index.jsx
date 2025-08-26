import {
  ArrowLeftOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import padding1 from "../../../../components/Padding";
import { fetchAction } from '../../../../redux/actions/baseAction';
import { getAllData, getDataById } from '../../../../services/baseService';
import { formatDateFromApi } from '../../../../utils/formatDate';
import ExerciseEditModal from './ExerciseEditModal';
import ExerciseImageList from './ExerciseImageList';
import ExerciseNotSubmitTable from './ExerciseNotSubmitTable';
import ExerciseQuestionTable from './ExerciseQuestionTable';

export default function ExerciseDetailMana() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const cleanId = id.replace(/^:/, "");

  const [formOpen, setFormOpen] = useState(false);

  // Lấy từ store
  const exerciseList = useSelector(state => state.exercises.list);
  const skills = useSelector(state => state.skills.list);

  const exerciseData = exerciseList.filter(ex => ex.id === cleanId);

  useEffect(() => {
    getDataById("exercises", cleanId).then((res) => { dispatch(fetchAction("exercises", res)) })
    getAllData("skills").then((res) => { dispatch(fetchAction("skills", res)) })

  }, [cleanId, dispatch]);

  if (!exerciseData[0]) {
    return (<p>Đang tải dữ liệu</p>)
  }

  // Đếm số lượng câu
  let tracNghiem = 0;
  let tuLuan = 0
  if (exerciseData[0]) {
    tracNghiem = exerciseData[0].questions.filter(q => q.answer?.length === 1).length;
    tuLuan = exerciseData[0].questions.filter(q => q.answer?.length > 1).length;
  }

  const items = [
    {
      key: '1',
      label: 'Đáp án',
      children: <ExerciseQuestionTable exerciseData={exerciseData} />
    },
    {
      key: '2',
      label: 'Ảnh đề',
      children: <ExerciseImageList exerciseData={exerciseData} />
    },
    {
      key: '3',
      label: 'Danh sách học sinh chưa nộp bài',
      children: <ExerciseNotSubmitTable exerciseData={exerciseData} />
    },
  ]

  return (
    <>
      <div style={padding1}>
        <div className="exercise-detail">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1>{exerciseData[0]?.title}</h1>
              <p>Ngày đăng: {formatDateFromApi(exerciseData[0]?.createAt)}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Button icon={<ArrowLeftOutlined />} type="primary" ghost size='middle' onClick={() => navigate(`/admin/exerciseMana`)}>Thoát </Button>
              <Button icon={<EditOutlined />} type="primary" ghost size='middle' onClick={() => setFormOpen(true)}>Chỉnh sửa</Button>
            </div>
          </div>
          <div className="exercise-detail__wrap">
            <div>
              <h3>Thông tin chung</h3>
              <div className="exercise-detail__icon">
                <i className="fa-solid fa-users"></i>
                <p>Unit: {exerciseData[0]?.unit}</p>
              </div>
              <div className="exercise-detail__icon">
                <i className="fa-solid fa-clock"></i>
                <p>Thời gian làm bài: {exerciseData[0]?.totalTime} phút</p>
              </div>
              <div className="exercise-detail__icon">
                <i className="fa-solid fa-circle-question"></i>
                <p>Số lượng câu hỏi: {exerciseData[0]?.questions.length}</p>
              </div>
            </div>
            <div>
              <h3>Dạng bài</h3>
              <div className="exercise-detail__tag">
                {exerciseData[0]?.skillId?.map(skillId => {
                  const skill = skills.find(s => s.id === skillId);
                  return <p key={skillId}>#{skill ? skill.name : "Không xác định"}</p>;
                })}
              </div>
            </div>
            <div>
              <h3>Chi tiết câu hỏi:</h3>
              <p>Câu trắc nghiệm: {tracNghiem} câu</p>
              <p>Câu điền đáp án: {tuLuan} câu</p>
            </div>
          </div>
        </div>


        <Tabs defaultActiveKey="1" items={items} />
      </div>

      <ExerciseEditModal
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        exerciseData={exerciseData}
        skillOptions={skills}
      />

    </>
  );
}

