import React, { useState, useEffect, createContext } from "react";
import api from "../services/api";

interface AuthContextData extends IUser {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin({ email, password }: AuthData): Promise<boolean>;
  handleRegister({
    name,
    email,
    password,
    avatarUrl,
    awaitingApproval,
  }: IUser): Promise<boolean>;
  handleLogoff(): void;
}

interface AuthData {
  email: string;
  password: string;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  awaitingApproval: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      if (token) {
        try {
          const { data } = await api.get("users");
          setUser(data);
          setIsAuthenticated(true);
        } catch {
          setUser({} as IUser);
        }
      }
      setLoading(false);
    })();
  }, []);

  async function handleLogin({ email, password }: AuthData) {
    try {
      const { data } = await api.post("login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      api.defaults.headers.authorization = `Bearer ${data.token}`;
      setUser(data.user);
      setIsAuthenticated(true);

      return true;
    } catch (err) {
      alert(err.response.data.erro);
      setUser({} as IUser);
      setIsAuthenticated(false);

      return false;
    }
  }
  async function handleRegister({
    name,
    email,
    password,
    avatarUrl,
    awaitingApproval,
  }: IUser) {
    try {
      const { data } = await api.post("/users", {
        name,
        email,
        password,
        avatarUrl,
        awaitingApproval: true,
      });
      localStorage.setItem("token", data.token);
      api.defaults.headers.authorization = `Bearer ${data.token}`;
      setIsAuthenticated(true);
      setUser(data.user);
      return true;
    } catch (err) {
      alert(err.response.data.erro);
      setIsAuthenticated(false);
      setUser({} as IUser);
      return false;
    }
  }

  function handleLogoff() {
    localStorage.removeItem("token");
    api.defaults.headers.authorization = undefined;
    setUser({} as IUser);
    setIsAuthenticated(false);
    setLoading(false);
  }

  if (loading) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogoff,
        isAuthenticated,
        setIsAuthenticated,
        ...user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
