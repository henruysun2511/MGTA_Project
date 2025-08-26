import {
  DeleteTwoTone
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { softDeleteAction } from '../../../../redux/actions/baseAction';
import { updateData } from '../../../../services/baseService';

export default function ExerciseCard({ item, skillListData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const skillNames = skillListData
    .filter(skill => item.skillId.includes(skill.id))
    .map(skill => skill.name);

  //Chuyển vào thùng rác
  const handleSorfDelete = async (item) => {
    dispatch(softDeleteAction("exercises", item.id));
    const options = {
      ...item, 
      deleted: true
    }
    const response = await updateData("exercises", item.id, options);
    if(response){
      alert("Đã chuyển vào thùng rác");
    }
  }

  return (
    <div className="exercise__item">
      <h3>{item.title}</h3>
      <div className="exercise__icon">
        <i className="fa-solid fa-users"></i>
        <p>Unit {item.unit}</p>
      </div>
      <div className="exercise__icon">
        <i className="fa-solid fa-clock"></i>
        <p>{item.totalTime} phút</p>
      </div>
      <div className="exercise__icon">
        <i className="fa-solid fa-circle-question"></i>
        <p>{item.totalQuestion} câu hỏi</p>
      </div>
      <div className="exercise__tag">
        {skillNames.map(skill => <p key={skill}>#{skill}</p>)}
      </div>
      <div className="button button__detail" onClick={() => navigate(`/admin/exerciseDetailMana/:${item.id}`)}>
        Xem chi tiết
      </div>
      <div className="button__delete" onClick={() => handleSorfDelete(item)}>
        <DeleteTwoTone />
      </div>
    </div>
  );
}
