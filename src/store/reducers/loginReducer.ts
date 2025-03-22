const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  success: false,
  error: null,

};

interface LoginAction {
  type: "LOGIN_REQUEST" | "LOGIN_SUCCESS" | "LOGIN_FAIL" | "LOGOUT";
  payload?: any;
}

export const loginReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        success: true,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};
