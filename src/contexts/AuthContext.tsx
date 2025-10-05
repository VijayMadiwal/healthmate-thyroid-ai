import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("healthmate_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (username: string, email: string, password: string): boolean => {
    // Get existing users
    const usersData = localStorage.getItem("healthmate_users");
    const users = usersData ? JSON.parse(usersData) : [];

    // Check if user already exists
    const existingUser = users.find((u: any) => u.username === username || u.email === email);
    if (existingUser) {
      return false;
    }

    // Add new user
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("healthmate_users", JSON.stringify(users));
    
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const usersData = localStorage.getItem("healthmate_users");
    const users = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find(
      (u: any) => (u.username === username || u.email === username) && u.password === password
    );

    if (foundUser) {
      const userData = { username: foundUser.username, email: foundUser.email };
      setUser(userData);
      localStorage.setItem("healthmate_user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("healthmate_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
