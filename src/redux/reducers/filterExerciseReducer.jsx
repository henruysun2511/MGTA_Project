const initState = {
    search: "",
    skillId: []
};

const filterExerciseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_EXERCISE_FILTER':
            return {
                ...state,
                search: action.payload
            }
        case 'SKILL_EXERCISE_FILTER':
            return {
                ...state,
                skillId: action.payload
            }
        default:
            return state;
    }
}

export default filterExerciseReducer;