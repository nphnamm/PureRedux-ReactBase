import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

const USER_API = "http://localhost:8080/api/v1/user/";
export const RegisterRequest = () => ({ type: "REGISTER_REQUEST" });

interface RegisterSuccessPayload {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
}

interface UserRegisterData {
  name: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
}

export const RegisterSuccess = (user: RegisterSuccessPayload) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const RegisterFail = (error: string) => ({
  type: "REGISTER_FAIL",
  payload: error,
});

export const registerUser =
  (userData: UserRegisterData) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "REGISTER_REQUEST" });
      const { data } = await axios.post(`${USER_API}register`, userData);
      dispatch({ type: "REGISTER_SUCCESS", payload: data.user });
    } catch (error: any) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response?.data?.message || "Registration failed",
      });
    }
  };
