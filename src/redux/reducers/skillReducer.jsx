const initialState = {
  skillList: []
};

export const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SKILLS":
      return { ...state, skillList: action.payload };
    default:
      return state;
  }
};