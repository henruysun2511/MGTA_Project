import { combineReducers } from "redux";
import { assignmentReducer } from "../reducers/assignmentReducer";
import { classReducer } from "../reducers/classReducer";
import loginReducer from "../reducers/loginReducer";
import { skillReducer } from "../reducers/skillReducer";



const AllReducers = combineReducers({
    loginReducer, assignmentReducer, classReducer, skillReducer
});

export default AllReducers;