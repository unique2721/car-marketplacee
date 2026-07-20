import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

const API_URL = "http://localhost:3000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
        if (res.data?.user) {
          setUser(res.data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }

      throw new Error(res.data?.error || "Invalid credentials");
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  const register = async (email, password, name, role, phoneNumber) => {
    try {
      const res = await axios.post(
        `${API_URL}/register`,
        {
          email,
          password,
          username: name,
          role,
          phoneNumber,
        },
        { withCredentials: true }
      );

      if (res.status === 201 && res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }

      throw new Error(res.data?.error || "Failed to register");
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
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
