import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments } from "../../../../redux/actions/assignmentAction";
import { getAllAsignment } from "../../../../services/asignmentService";

export default function AssignmentList() {
    const dispatch = useDispatch();
    const assignmentList = useSelector(state => state.assignmentReducer.assignmentList);
    
    useEffect(() => {
        getAllAsignment().then(data => dispatch(fetchAssignments(data)));
    }, [dispatch]);


    const trashAssignment = assignmentList.filter(it => it.isDeleted);
    console.log(trashAssignment);
    return (
        <>
        </>
    )
}