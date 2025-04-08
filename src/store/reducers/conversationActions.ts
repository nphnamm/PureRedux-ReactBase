import { AnyAction } from "redux";

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationDetail {
  id: string;
  conversationId: string;
  message: string;
  response: string;
  createdAt: string; // or Date if you want to convert to Date object
  updatedAt: string; // or Date
  order: number;
}

export interface ConversationState {
  conversations: Conversation[];
  conversationDetail: ConversationDetail[];
  isLoading: boolean;
  error?: string;
}
const initialState: ConversationState = {
  conversations: [],
  conversationDetail: [],
  isLoading: false,
  error: undefined,
};

export const conversationReducer = (
  state = initialState,
  action: AnyAction
): ConversationState => {
  switch (action.type) {
    case "GET_ALL_CONVERSATION_REQUEST":
      return { ...state, isLoading: true };
    case "GET_ALL_CONVERSATION_SUCCESS":
      return {
        ...state,
        conversations: action.payload,
        isLoading: false,
      };
    case "GET_ALL_CONVERSATION_FAIL":
      return { ...state, isLoading: false };

    case "GET_CONVERSATION_DETAIL_REQUEST":
      return { ...state, isLoading: true };
    case "GET_CONVERSATION_DETAIL_SUCCESS":
      return {
        ...state,
        conversationDetail: action.payload,
        isLoading: false,
      };
    case "GET_CONVERSATION_DETAIL_FAIL":
      return { ...state, isLoading: false };

    case "CREATE_NEW_CONVERSATION_REQUEST":
      return { ...state, isLoading: true };
    case "CREATE_NEW_CONVERSATION_SUCCESS":
      return {
        ...state,
        conversationDetail: action.payload,
        isLoading: false,
      };
    case "CREATE_NEW_CONVERSATION_FAIL":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
