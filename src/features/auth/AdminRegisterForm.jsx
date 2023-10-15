import { useState } from "react";
import InputForm from "../../components/InputForm";
import useAuth from "../../hooks/use-auth";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function AdminRegisterForm() {
  const [registerAdmin, setRegisterAdmin] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    role: "",
  });
  const [error, setError] = useState({});

  const { adminRegister, validateError, stateLoading, setStateLoading } =
    useAuth();

  const navigate = useNavigate();

  const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    // .messages({ "string.empty": "first name is required" })
    lastName: Joi.string().trim().required(),
    username: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .trim()
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
    email: Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .trim()
      .required(),
    phone: Joi.string().trim().required(),
  });

  const handleInput = (e) => {
    setRegisterAdmin({ ...registerAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = validateError(registerSchema, registerAdmin);
      if (error) {
        return setError(error);
      }
      setError({});
      setStateLoading(true);
      adminRegister(registerAdmin);
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
        <div className="h-screen w-screen flex justify-center items-center">
          <form
            className="w-80 flex flex-col gap-3 p-4 justify-center border border-gray-500 rounded-md"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Admin Register</h1>
            <InputForm
              placeholder="firstname"
              name="firstName"
              value={registerAdmin.firstName}
              onChange={handleInput}
              errorInput={error.firstName}
              errorMessage={error.firstName}
            />
            <InputForm
              placeholder="lastname"
              name="lastName"
              value={registerAdmin.lastName}
              onChange={handleInput}
              errorInput={error.lastName}
              errorMessage={error.lastName}
            />
            <InputForm
              placeholder="username"
              name="username"
              value={registerAdmin.username}
              onChange={handleInput}
              errorInput={error.username}
              errorMessage={error.username}
            />
            <InputForm
              placeholder="email"
              name="email"
              value={registerAdmin.email}
              onChange={handleInput}
              errorInput={error.email}
              errorMessage={error.email}
            />
            <InputForm
              placeholder="phone"
              name="phone"
              value={registerAdmin.phone}
              onChange={handleInput}
              errorInput={error.phone}
              errorMessage={error.phone}
            />
            <InputForm
              type="password"
              placeholder="password"
              name="password"
              value={registerAdmin.password}
              onChange={handleInput}
              errorInput={error.password}
              errorMessage={error.password}
            />
            <InputForm
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              value={registerAdmin.confirmPassword}
              onChange={handleInput}
              errorInput={error.confirmPassword}
              errorMessage={error.confirmPassword}
            />
            <InputForm
              placeholder="role"
              name="role"
              value={registerAdmin.role}
              onChange={handleInput}
              errorInput={error.role}
              errorMessage={error.role}
            />
            <button className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none">
              REGISTER
            </button>
          </form>
        </div>
      )}
    </>
  );
}
