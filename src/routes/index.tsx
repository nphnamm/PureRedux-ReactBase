import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HeroSection from "../pages/student/HeroSection";
import { AuthenticatedUser } from "../components/ProtectedRoutes";
import Login from "../pages/Login";


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
        element:(
            <AuthenticatedUser>
                <Login />
            </AuthenticatedUser>
        )
      }
    ],
  },
]);
