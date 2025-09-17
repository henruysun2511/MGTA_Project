import { combineReducers } from "redux";
import { baseReducer } from "../reducers/baseReducer";
import loginReducer from "../reducers/loginReducer";


const AllReducers = combineReducers({
    loginReducer, 
    classschedules: baseReducer("classschedules"),
    classes: baseReducer("classes"),
    classsessions: baseReducer("classsessions"),
    students: baseReducer("students"),
    deadlines: baseReducer("deadlines"),
    exercises: baseReducer("exercises"),
    accounts: baseReducer("accounts"),
    skills: baseReducer("skills"),
    blogs: baseReducer("blogs"),
    results: baseReducer("results"),
    notifications: baseReducer("nofitications"),
    comments: baseReducer("comments"),
    roles: baseReducer("roels"),
    permissions: baseReducer("permissions"),
});

export default AllReducers;