import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
const USER_API = "http://localhost:8080/api/v1/user/";

export const LoginRequest = () => ({ type: "LOGIN_REQUEST" });

interface LoginSuccessPayload {
  username: string;
}

export const LoginSuccess = (user: LoginSuccessPayload) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFail = (error: string) => ({
  type: "LOGIN_FAIL",
  payload: error,
});

export const Logout = () => ({ type: "LOGOUT" });

interface UserLoginDataRequest {
  email: string;
  password: string;
}

export const loginUser =
  (userData: UserLoginDataRequest) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const { data } = await axios.post(`${USER_API}login`, userData, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
    } catch (error: any) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };
