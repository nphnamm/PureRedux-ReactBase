import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

const USER_API = "http://localhost:8080/api/v1/user/";

interface Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}


interface LoadUserSuccessPayload {
  username: string;
  email: string;
  phone?: string;
  address?: string;
}

export const LoadUserSuccess = (user: LoadUserSuccessPayload) => ({
  type: "LOAD_USER_SUCCESS",
  payload: user,
});

export const LoadUserFail = () => ({ type: "LOAD_USER_FAIL" });

export const Logout = () => ({ type: "LOGOUT" });

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    await axios.get(`${USER_API}logout`, { withCredentials: true });
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const { data } = await axios.get(`${USER_API}profile`, {
      withCredentials: true,
    });
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL" });
  }
};
