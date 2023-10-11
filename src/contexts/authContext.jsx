import axios from "../configs/axios";
import { useState } from "react";
import { createContext } from "react";
import { createAccessToken, deleteAccessToken } from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const register = async (registerData) => {
    const createUser = await axios.post("/auth/register", registerData);
    console.log(createUser);
  };

  const login = async (data) => {
    const getUser = await axios.post("/auth/login", data);
    createAccessToken(getUser.data.accessToken);
    setAuthUser(getUser.data.user);
  };

  const logout = () => {
    deleteAccessToken();
    setAuthUser(null);
  };
  return (
    <AuthContext.Provider value={{ authUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
