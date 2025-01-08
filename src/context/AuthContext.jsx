import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    // Simulate API call
    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error("Invalid credentials");
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email, password, name, role) => {
    // Simulate API call
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role,
    };
    mockUsers.push(newUser);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
