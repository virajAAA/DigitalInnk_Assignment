const initialState = {
  userDetails: {
    email: "",
  },
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_USER_DETAILS") {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  }
  return state;
};

export default reducer;
