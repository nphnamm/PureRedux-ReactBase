import { AppDispatch, RootState } from "@/store";
import { getConversationDetail } from "@/store/actions/conversationActions";
import React, { ComponentProps, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

type CodeProps = ComponentProps<"code"> & {
  inline?: boolean;
};

const ChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, conversationDetail } = useSelector(
    (state: RootState) => state.conversation
  );
  const [inputAsk, setInputAsk] = useState("");

  const [history, setHistory] = useState<Message[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleAskAI();
      setInputAsk("");
    }
  };

  useEffect(() => {
    dispatch(getConversationDetail(id as string));
  }, [id, dispatch]);

  useEffect(() => {
    if (conversationDetail) {
      const formattedMessages = conversationDetail
        .map((conversation: any) => {
          return [
            {
              id: conversation.id,
              content: conversation.message,
              sender: "user",
              timestamp: new Date(conversation.createdAt).toLocaleString(),
            },
            {
              id: conversation.id + "-response", // To differentiate the response
              content: conversation.response,
              sender: "ai",
              timestamp: new Date(conversation.updatedAt).toLocaleString(),
            },
          ];
        })
        .flat();

      setHistory(formattedMessages as any);
    }
  }, [conversationDetail]);
  console.log("inputAsk", inputAsk);
  const handleAskAI = async () => {
    // setHistory((prevHistory) => [...prevHistory, aiMessage]);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputAsk,
      sender: "user",
      timestamp: new Date().toLocaleString(),
    };

    // 1. Cập nhật lịch sử với tin nhắn của người dùng trước
    setHistory((prevHistory) => [...prevHistory, userMessage]);
    const response = await axios.post(
      "http://localhost:8000/api/v1/ai/resume",
      {
        conversationId: id,
        prompt: inputAsk,
      },
      {
        withCredentials: true,
      }
    );

    console.log(inputAsk);
    console.log(response);
    // Get AI response
    const aiResponse = response.data.message;

    // Add AI response to the conversation history
    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      content: aiResponse,
      sender: "ai",
      timestamp: new Date().toLocaleString(),
    };

    // Update history with the AI's response
    setHistory((prevHistory) => [...prevHistory, aiMessage]);
    setInputAsk(""); // Clear the input after sending
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Conversation #{id}</h1>

        <div className="space-y-4">
          {history.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.sender === "ai" ? (
                  // Render AI response with ReactMarkdown
                  <ReactMarkdown
                    components={{
                      code({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  // Render user message as plain text
                  <p>{message.content}</p>
                )}
                <span
                  className={`text-sm ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  } block mt-2`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex gap-2">
            <input
              value={inputAsk}
              onChange={(e) => setInputAsk(e.target.value)}
              type="text"
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => handleAskAI()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
