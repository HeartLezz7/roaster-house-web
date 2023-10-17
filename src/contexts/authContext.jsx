import axios from "../configs/axios";
import { useState } from "react";
import { createContext } from "react";
import {
  createAccessToken,
  deleteAccessToken,
  getAccessToken,
} from "../utils/local-storage";
import { useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [stateLoading, setStateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [authAdmin, setAuthAdmin] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (getAccessToken()) {
          const res = await axios.get("/auth/get");
          if (res.data.user) {
            return setAuthUser(res.data.user);
          } else if (res.data.admin) {
            return setAuthAdmin(res.data.admin);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

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
    await axios.post("/auth/register", registerData);
  };

  const login = async (data) => {
    const getUser = await axios.post("/auth/login", data);
    createAccessToken(getUser.data.accessToken);
    setAuthUser(getUser.data.user);
    setStateLoading(false);

    setOpen(false);
  };

  const adminRegister = async (registerData) => {
    await axios.post("/auth/admin/register", registerData);
  };

  const adminLogin = async (data) => {
    const getAdmin = await axios.post("/auth/admin/login", data);
    createAccessToken(getAdmin.data.accessToken);
    setAuthAdmin(getAdmin.data.admin);
  };

  const logout = () => {
    deleteAccessToken();
    setAuthUser(null);
    setAuthAdmin(null);
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
