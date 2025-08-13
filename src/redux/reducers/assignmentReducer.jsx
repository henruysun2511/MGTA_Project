const initialState = {
    assignmentList: [],
    //   loading: false,
    //   error: null
};

export const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ASSIGNMENTS":
            return { ...state, assignmentList: action.payload };

        case "CREATE_ASSIGNMENT":
            return {
                ...state,
                assignmentList: [...state.assignmentList, action.payload]
            }

        case "UPDATE_ASSIGNMENT":
            return {
                ...state,
                assignmentList: state.assignmentList.map((it) =>
                    it.id === action.payload.id ? action.payload : it
                )
            };

        case "SOFT_DELETE_ASSIGNMENT":
            return {
                ...state,
                assignmentList: state.assignmentList.map(it =>
                    it.id === action.payload ? { ...it, isDeleted: true } : it
                )
            };

        case "DELETE_ASSIGNMENT":
            return { ...state, assignmentList: state.assignmentList.filter((it) => it.id !== action.payload) };

        case "RECYCLE_ASSIGNMENT":
            return {
                ...state,
                assignmentList: state.assignmentList.map(it =>
                    it.id === action.payload ? { ...it, isDeleted: false } : it
                )
            };
        default:
            return state;
    }
}