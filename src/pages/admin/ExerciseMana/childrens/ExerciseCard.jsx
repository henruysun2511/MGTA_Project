import {
  DeleteTwoTone
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { handleDelete } from '../../../../utils/handles';

export default function ExerciseCard({ exercise }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSorfDelete = async (item) => {
    await handleDelete(dispatch, "admin/exercise", "exercises", item._id, `Bài tập ${item._name}`);
  }

  return (
    <div className="exercise__item">
      <h3>{exercise ? exercise.title : 'N/A'}</h3>
      <div className="exercise__icon">
        <i className="fa-solid fa-users"></i>
        <p>Unit {exercise ? exercise.unit : 'N/A'}</p>
      </div>
      <div className="exercise__icon">
        <i className="fa-solid fa-clock"></i>
        <p>{exercise ? exercise.duration : 'N/A'} phút</p>
      </div>
      <div className="exercise__icon">
        <i className="fa-solid fa-circle-question"></i>
        <p>{exercise ? exercise.totalQuestion : 'N/A'} câu hỏi</p>
      </div>
      <div className="exercise__tag">
        {Array.isArray(exercise.skillId)
          ? exercise.skillId.map(skill => (
            <p key={skill._id}>#{skill.skillName}</p>
          ))
          : exercise.skillId
            ? <p>#{exercise.skillId.skillName || exercise.skillId}</p>
            : null}
      </div>
      <div className="button button__detail" onClick={() => navigate(`/admin/exerciseDetailMana/:${exercise._id}`)}>
        Xem chi tiết
      </div>
      <div className="button__delete" onClick={() => handleSorfDelete(exercise)}>
        <DeleteTwoTone />
      </div>
    </div>
  );
}
