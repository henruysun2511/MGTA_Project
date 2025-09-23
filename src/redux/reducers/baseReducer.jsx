const initialState = {
  list: [],
  current: null,
};

export const baseReducer = (resource) => {
  return (state = initialState, action) => {
    const [res, act] = action.type.split("/");
    if (res.toLowerCase() !== resource.toLowerCase()) return state;

    switch (act) {
      case "FETCH":
        return { ...state, list: action.payload };

      case "FETCH_BY_ID":
        return { ...state, current: action.payload };

      case "CREATE":
        return { ...state, list: [...state.list, action.payload] };

      case "UPDATE":
        return {
          ...state,
          list: state.list.map(it =>
            it._id === action.payload._id ? action.payload : it
          ),
          current: state.current?._id === action.payload._id ? action.payload : state.current,
        };
      case "DELETE":
        return {
          ...state,
          list: state.list.filter((it) => it._id !== action.payload),
        };

      default:
        return state;
    }
  };
};
