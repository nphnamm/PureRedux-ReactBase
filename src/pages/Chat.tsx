import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store";
import { getAllConversation } from "@/store/actions/conversationActions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const USER_API = "http://localhost:8000/api/v1/ai/";

interface ChatConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

type ResponseCreateNewConversation = {
  id: string;
  userId: string;
  title: string;
  updatedA: string;
  createdAt: string;
};
const Chat: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, conversations } = useSelector(
    (state: RootState) => state.conversation
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const handleNewConversation = async () => {
    try {
      const { data } = await axios.post(
        `${USER_API}start`,
        { userId },
        { withCredentials: true }
      );
      console.log("data", data);
      if (data?.conversation.id) {
        navigate(`/chat/${data?.conversation.id}`);
      } else {
        console.warn("No id found in response");
      }
    } catch (err) {
      console.error("Error starting conversation:", err);
    }
  };
  useEffect(() => {
    dispatch(getAllConversation());
    setUserId(user?.id);
  }, []);

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold mb-6">Chat Conversations</h1>
        <div>
          <Button onClick={handleNewConversation}>New Conversation</Button>
        </div>
      </div>
      <div className="grid gap-4">
        {conversations?.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/chat/${conversation.id}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {conversation.title}
                </h2>
                <p className="text-gray-600">{conversation.updatedAt}</p>
              </div>
              <span className="text-sm text-gray-500">
                {conversation.createdAt}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chat;
