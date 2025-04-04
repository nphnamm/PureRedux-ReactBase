import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HeroSection from "../pages/student/HeroSection";
import { AuthenticatedUser } from "../components/ProtectedRoutes";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import ChatDetail from "../pages/ChatDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "chat",
        element: (
          <AuthenticatedUser>
            <Chat />
          </AuthenticatedUser>
        ),
      },
      {
        path: "chat/:id",
        element: (
          <AuthenticatedUser>
            <ChatDetail />
          </AuthenticatedUser>
        ),
      },
    ],
  },
]);
