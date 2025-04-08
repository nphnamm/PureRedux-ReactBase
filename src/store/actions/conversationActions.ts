import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
const USER_API = "http://localhost:8000/api/v1/ai/";

export const getAllConversation = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "GET_ALL_CONVERSATION_REQUEST" });
    const { data } = await axios.get(`${USER_API}conversation`, {
      withCredentials: true,
    });
    dispatch({
      type: "GET_ALL_CONVERSATION_SUCCESS",
      payload: data.conversations,
    });
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL" });
  }
};

export const getConversationDetail =
  (conversationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "GET_CONVERSATION_DETAIL_REQUEST" });
      const { data } = await axios.patch(
        `${USER_API}conversation-detail`,
        { conversationId },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "GET_CONVERSATION_DETAIL_SUCCESS",
        payload: data.conversations,
      });
    } catch (error) {
      dispatch({ type: "GET_CONVERSATION_DETAIL_FAIL" });
    }
  };

type CreateNewConversationReq  ={
  userId: string;
  title?: string;
}
export const createNewConversation =
  (body: CreateNewConversationReq) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "CREATE_NEW_CONVERSATION_REQUEST" });
      const { data } = await axios.post(
        `${USER_API}start`,
        { userId: body.userId,
          title:body?.title
         },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "CREATE_NEW_CONVERSATION_SUCCESS",
        payload: data.conversations,
      });
    } catch (error) {
      dispatch({ type: "CREATE_NEW_CONVERSATION_FAIL" });
    }
  };
