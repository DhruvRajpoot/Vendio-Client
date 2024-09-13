import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Config/axiosInstance";

interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  profilePic?: string;
  email: string;
  isVerified: boolean;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUserInfo: (updatedUser: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Fetch user details from the server
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("user/getUserDetails");
      const userData = response.data.user;
      setUser(userData);
      toast.success("User details fetched successfully");
    } catch (error) {
      console.error("Failed to fetch user details", error);
      toast.error("Failed to fetch user details");
    }
  };

  // Login user
  const login = (user: User, accessToken: string, refreshToken: string) => {
    setUser(user);
    localStorage.setItem("access_token", accessToken);
    document.cookie = `refreshToken=${refreshToken}; Max-Age=${
      7 * 24 * 60 * 60
    }; Secure; SameSite=Strict`;
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    document.cookie = "refreshToken=; Max-Age=0;";
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Update user info
  const updateUserInfo = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
