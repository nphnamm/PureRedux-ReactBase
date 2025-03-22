const initialState = {
  loading: false,
  user: null,
  error: null,
  success: false,
};

interface SignUpAction {
  type: "REGISTER_REQUEST" | "REGISTER_SUCCESS" | "REGISTER_FAIL";
  payload?: any;
}

export const signUpReducer = (state = initialState, action: SignUpAction) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, user: action.payload, success: true };
    case "REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
