const initialState = {
  classList: []
};

export const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CLASSES":
      return { ...state, classList: action.payload };
    default:
      return state;
  }
};