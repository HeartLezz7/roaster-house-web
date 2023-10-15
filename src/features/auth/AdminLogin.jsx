import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import InputForm from "../../components/InputForm";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ActionButton from "../../components/ActionButton";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({
    emailOrUsername: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState({});

  const { adminLogin, validateError, stateLoading, setStateLoading } =
    useAuth();

  const navigate = useNavigate();

  const loginSchema = Joi.object({
    emailOrUsername: Joi.alternatives([
      Joi.string()
        .pattern(/@(gmail|hotmail)\.com$/)
        .email({ tlds: { allow: ["com"] } }),
      Joi.string()
        .trim()
        .pattern(/^[a-zA-Z0-9]{6,30}$/),
    ]).required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .trim()
      .required(),
    role: Joi.string().trim().required(),
  });

  const handleInput = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    try {
      const error = validateError(loginSchema, admin);
      if (error) {
        return setError(error);
      }
      if (admin.role !== "admin") {
        setError({});
        return toast.error("Access Denined");
      }
      setError({});
      setStateLoading(true);
      adminLogin(admin);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setStateLoading(false);
    }
  };

  return (
    <>
      {stateLoading ? (
        <Loading />
      ) : (
        <div className=" h-screen flex justify-center items-center">
          <form
            className="w-80  flex flex-col gap-4 border border-gray-500 p-5 rounded-md"
            onSubmit={handleAdminLogin}
          >
            <div className="text-center">Admin</div>
            <InputForm
              placeholder="username or email"
              name="emailOrUsername"
              value={admin.emailOrUsername}
              onChange={handleInput}
              error={error}
              errorInput={error.emailOrUsername}
              errorMessage={error.emailOrUsername}
            />
            <InputForm
              placeholder="password"
              type="password"
              name="password"
              value={admin.password}
              onChange={handleInput}
              errorInput={error.password}
              errorMessage={error.password}
            />
            <InputForm
              placeholder="role"
              name="role"
              value={admin.role}
              onChange={handleInput}
              errorInput={error.role}
              errorMessage={error.role}
            />
            <ActionButton title="LOGIN" />
          </form>
        </div>
      )}
    </>
  );
}
