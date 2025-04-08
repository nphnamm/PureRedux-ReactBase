import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HeroSection from "../pages/student/HeroSection";
import { AuthenticatedUser,ProtectedRoutes} from "../components/ProtectedRoutes";
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
            <Login />
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
