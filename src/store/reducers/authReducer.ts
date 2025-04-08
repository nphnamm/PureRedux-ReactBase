import { AnyAction } from 'redux';

export interface AuthState {
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

export const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case "LOAD_USER_REQUEST":
      return {...state,isLoading:true}
    case "LOAD_USER_SUCCESS":
      return { ...state, user: action.payload, isAuthenticated: true,isLoading:false };
    
      case "LOAD_USER_FAIL":
      return {...state,isLoading:false}

    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, isLogoutSuccess: true };
    default:
      return state;
  }
};
