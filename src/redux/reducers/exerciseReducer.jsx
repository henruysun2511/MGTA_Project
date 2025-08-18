const initialState = {
    exerciseList: [],
    //   loading: false,
    //   error: null
};

export const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_EXERCISES":
            return { ...state, exerciseList: action.payload };

        case "CREATE_EXERCISE":
            return {
                ...state,
                exerciseList: [...state.exerciseList, action.payload]
            }

        case "UPDATE_EXERCISE":
            return {
                ...state,
                exerciseList: state.exerciseList.map((it) =>
                    it.id === action.payload.id ? action.payload : it
                )
            };

        case "SOFT_DELETE_EXERCISE":
            return {
                ...state,
                exerciseList: state.exerciseList.map(it =>
                    it.id === action.payload ? { ...it, deleted: true } : it
                )
            };

        case "DELETE_EXERCISE":
            return { ...state, exerciseList: state.exerciseList.filter((it) => it.id !== action.payload) };

        case "RECYCLE_EXERCISE":
            return {
                ...state,
                exerciseList: state.exerciseList.map(it =>
                    it.id === action.payload ? { ...it, deleted: false } : it
                )
            };
        default:
            return state;
    }
}