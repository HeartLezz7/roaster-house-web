import axios from "../configs/axios";
import { useState } from "react";
import { createContext } from "react";
import { createAccessToken, deleteAccessToken } from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [stateLoading, setStateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [authAdmin, setAutAdmin] = useState(null);

  const validateError = (schema, body) => {
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      const result = error.details.reduce((acc, item) => {
        const { message, path } = item;
        acc[path[0]] = message;
        return acc;
      }, {});
      return result;
    }
  };

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

  const adminRegister = async (registerData) => {
    const createAdmin = await axios.post("/auth/admin/register", registerData);
    console.log(createAdmin);
  };

  const adminLogin = async (data) => {
    const getAdmin = await axios.post("/auth/admin/login", data);
    createAccessToken(getAdmin.data.adminAccessToken);
    setAutAdmin(getAdmin.data.admin);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        register,
        logout,
        validateError,
        stateLoading,
        setStateLoading,
        open,
        setOpen,
        adminRegister,
        adminLogin,
        authAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
