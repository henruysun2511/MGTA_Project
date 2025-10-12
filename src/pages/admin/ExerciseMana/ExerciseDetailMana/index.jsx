import {
  ArrowLeftOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import padding1 from '../../../../components/Padding';
import useFetch from '../../../../hooks/useFetch';
import { fetchById } from '../../../../redux/actions/baseAction';
import { formatDateFromApi } from '../../../../utils/formatDate';
import ExerciseEditModal from './childrens/ExerciseEditModal';
import ExerciseImageList from './childrens/ExerciseImageList';
import ExerciseQuestionTable from './childrens/ExerciseQuestionTable';

export default function ExerciseDetailMana() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);

  const { id } = useParams();
  const cleanId = id.replace(/^:/, "");
  const [exerciseDataByIdRes] = useFetch(`admin/exercise/${cleanId}`, {}, {});
  console.log(exerciseDataByIdRes);
  const exerciseDataById = useSelector(state => state.exercises.current || []);
  useEffect(() => {
    if (exerciseDataByIdRes) {
      dispatch(fetchById("exercises", exerciseDataByIdRes.exercise));
    }
  }, [exerciseDataByIdRes, dispatch]);

  // Đếm số lượng câu
  let tracNghiem = 0;
  let tuLuan = 0
  if (exerciseDataById) {
    tracNghiem = exerciseDataById.questions?.filter(q => q.answer?.length === 1).length || 0;
    tuLuan = exerciseDataById.questions?.filter(q => q.answer?.length > 1).length || 0;
  }

  const items = [
    {
      key: '1',
      label: 'Đáp án',
      children: <ExerciseQuestionTable exerciseData={exerciseDataById} />
    },
    {
      key: '2',
      label: 'Ảnh đề',
      children: <ExerciseImageList exerciseData={exerciseDataById} />
    },
  ]

  return (
    <>
      <div style={padding1}>
        <div className="exercise-detail-2">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1>{exerciseDataById.title ? exerciseDataById.title : "N/A"}</h1>
              <p>Ngày đăng: {formatDateFromApi(exerciseDataById?.createAt)}</p>
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
                <p>Unit: {exerciseDataById.unit ? exerciseDataById.unit : "N/A"}</p>
              </div>
              <div className="exercise-detail__icon">
                <i className="fa-solid fa-clock"></i>
                <p>Thời gian làm bài: {exerciseDataById.duration ? exerciseDataById.duration : "N/A"} phút</p>
              </div>
              <div className="exercise-detail__icon">
                <i className="fa-solid fa-circle-question"></i>
                <p>Số lượng câu hỏi: {exerciseDataById.totalQuestion ? exerciseDataById.totalQuestion : "N/A"}</p>
              </div>
            </div>
            <div>
              <h3>Dạng bài</h3>
              <div className="exercise-detail__tag">
                {
                  Array.isArray(exerciseDataById.skillId) && (
                    exerciseDataById.skillId.map((skill, index) => (
                      <p key={index}>#{skill ? skill.skillName : "Không xác định"}</p>
                    ))
                  )
                }
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
        exerciseData={exerciseDataById}
      />

    </>
  );
}
