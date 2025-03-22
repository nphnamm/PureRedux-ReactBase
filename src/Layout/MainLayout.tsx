import { Outlet } from "react-router-dom"
import Sidebar from '../components/Sidebar';
import Navbar from "@/components/Navbar";

const MainLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-screen">
            {/* <Sidebar /> */}
            <Navbar />
            <div className="flex-1 mt-16">
                <Outlet />
            </div>
        </div>
        
        
    )
}

export default MainLayout;
