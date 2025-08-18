import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercises } from "../../../../redux/actions/exerciseAction";
import { getAllExercises } from "../../../../services/exerciseService";

export default function ExcerciseTable() {
    const dispatch = useDispatch();
    const assignmentList = useSelector(state => state.assignmentReducer.assignmentList);
    
    useEffect(() => {
       getAllExercises().then(data => dispatch(fetchExercises(data)));
    }, [dispatch]);


    const trashAssignment = assignmentList.filter(it => it.isDeleted);
    console.log(trashAssignment);
    return (
        <>
        </>
    )
}