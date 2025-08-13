import {
  DeleteTwoTone
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { softDeleteAssignmentAction } from '../../../../redux/actions/assignmentAction';
import { editAsignment } from '../../../../services/asignmentService';

export default function AssignmentCard({ item, classListData, skillListData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const className = classListData.find(cls => cls.id === item.idClass)?.name || "";
  const skillNames = skillListData
    .filter(skill => item.idSkill.includes(skill.id))
    .map(skill => skill.name);

  //Chuyển vào thùng rác
  const handleSorfDelete = async (item) => {
    dispatch(softDeleteAssignmentAction(item.id));
    const options = {
      ...item, 
      isDeleted: true
    }
    const response = await editAsignment(item.id, options);
    if(response){
      alert("Đã chuyển vào thùng rác");
    }
  }

  return (
    <div className="practice-item">
      <h3>{item.name}</h3>
      <div className="inner-icon">
        <i className="fa-solid fa-users"></i>
        <p>{className}</p>
      </div>
      <div className="inner-icon">
        <i className="fa-solid fa-clock"></i>
        <p>{item.totalTime} phút</p>
      </div>
      <div className="inner-icon">
        <i className="fa-solid fa-circle-question"></i>
        <p>{item.totalQuestion} câu hỏi</p>
      </div>
      <div className="practice-tag">
        {skillNames.map(skill => <p key={skill}>#{skill}</p>)}
      </div>
      <div className="button button-detail" onClick={() => navigate(`/admin/asignmentDetailMana/${item.id}`)}>
        Xem chi tiết
      </div>
      <div className="button-delete" onClick={() => handleSorfDelete(item)}>
        <DeleteTwoTone />
      </div>
    </div>
  );
}
