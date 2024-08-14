import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initial state from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken) as User;
        setUser(decoded);

        // Store user information in localStorage
        localStorage.setItem("user", JSON.stringify(decoded));
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setUser(user);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie = `refreshToken=${refreshToken}; Max-Age=${
      7 * 24 * 60 * 60
    }; Secure; SameSite=Strict`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    document.cookie = "refreshToken=; Max-Age=0;";
    toast.success("Logged out successfully");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
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
