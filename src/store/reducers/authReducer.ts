import { AnyAction } from 'redux';

interface AuthState {
    user: any;
    isAuthenticated: boolean;
    isLoading: boolean;
    isLogoutSuccess: boolean;
  }

const initialState : AuthState= {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isLogoutSuccess: false,
};

type AuthAction = AnyAction & {
  type: "LOAD_USER_SUCCESS" | "LOAD_USER_FAIL" | "LOGOUT";
  payload?: any;
}

export const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case "LOAD_USER_SUCCESS":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOAD_USER_FAIL":
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, isLogoutSuccess: true };
    default:
      return state;
  }
};
