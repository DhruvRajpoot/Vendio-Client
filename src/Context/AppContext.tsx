import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverurl } from "../Config/baseurl";

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
  const [user, setUser] = useState<User | null>(() => {
    // Initial state from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      fetchUserDetails(accessToken);
    }
  }, []);

  // Fetch user details from the server
  const fetchUserDetails = async (accessToken: string) => {
    try {
      const response = await axios.get(`${serverurl}/user/getUserDetails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to fetch user details", error);
      toast.error("Failed to fetch user details");
    }
  };

  // Login user
  const login = (user: User, accessToken: string, refreshToken: string) => {
    setUser(user);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
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
    localStorage.setItem("user", JSON.stringify(updatedUser));
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
