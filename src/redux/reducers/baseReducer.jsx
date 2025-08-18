const initialState = {
  list: [],
  //   loading: false,
  //   error: null
};

export const baseReducer = (resource) => {
  return (state = initialState, action) => {
    const [res, act] = action.type.split("/");
    if (res.toLowerCase() !== resource.toLowerCase()) return state;

    switch (act) {
      case "FETCH":
        return { ...state, list: action.payload };

      case "CREATE":
        return { ...state, list: [...state.list, action.payload] };

      case "UPDATE":
        return {
          ...state,
          list: state.list.map((it) =>
            it.id === action.payload.id ? action.payload : it
          ),
        };

      case "SOFT_DELETE":
        return {
          ...state,
          list: state.list.map((it) =>
            it.id === action.payload ? { ...it, deleted: true } : it
          ),
        };

      case "DELETE":
        return {
          ...state,
          list: state.list.filter((it) => it.id !== action.payload),
        };

      case "RECYCLE":
        return {
          ...state,
          list: state.list.map((it) =>
            it.id === action.payload ? { ...it, deleted: false } : it
          ),
        };

      default:
        return state;
    }
  };
};
