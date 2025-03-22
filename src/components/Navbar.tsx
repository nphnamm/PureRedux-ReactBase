import { Menu, School } from "lucide-react";
import React, { useEffect, useState, FormEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/components/DarkTheme";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { logoutUser } from "@/store/actions/authActions";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";

interface User {
  photoUrl?: string;
  role?: string;
}

interface AuthState {
  auth: {
    user: User | null;
  };
}

interface LogoutResponse {
  message?: string;
}

interface MobileNavbarProps {
  user: User | null;
}

const Navbar: React.FC = () => {
  const { user } = useSelector((store: AuthState) => store.auth);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { isLogoutSuccess } = useSelector((state: RootState) => state.auth);
  const logoutHandler = async () => {
    await dispatch(logoutUser());
  };

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      toast.success("User log out.");
      navigate("/login");
    }
  }, [isLogoutSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-[90%] mx-auto hidden md:flex justify-between items-center gap-4 h-full">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Link to="/">
              <h1 className="hidden md:block font-extrabold text-2xl">
                E-Learning
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to="course"
                    className="hidden md:block font-semibold flex items-center gap-2 py-2 p-4 rounded-xl hover:bg-[#e7e7e7]"
                  >
                    Create course
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="study-dashboard"
                    className="hidden md:block font-semibold flex items-center gap-2 py-2 p-4 rounded-xl hover:bg-[#e7e7e7]"
                  >
                    Create quizz
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="ai"
                    className="hidden md:block font-semibold flex items-center gap-2 py-2 p-4 rounded-xl hover:bg-[#e7e7e7]"
                  >
                    Chat With AI
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <form
              onSubmit={searchHandler}
              className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl"
            >
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Courses"
                className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <Button
                type="submit"
                className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
              >
                Search
              </Button>
            </form>
          </div>
          {/* User icons and dark mode icon  */}
          <div className="flex items-center gap-8 ">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="my-learning">My learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <Link to="profile">Edit Profile</Link>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/login")}>Signup</Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            {" "}
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar; 