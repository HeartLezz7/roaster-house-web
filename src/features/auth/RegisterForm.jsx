import { useState } from "react";
import InputForm from "../../components/InputForm";
import useAuth from "../../hooks/use-auth";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function RegisterForm() {
  const [registerInput, setRegisterInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState({});

  const { register, validateError, stateLoading, setStateLoading } = useAuth();

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
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = validateError(registerSchema, registerInput);
      if (error) {
        return setError(error);
      }
      setError({});
      setStateLoading(true);
      register(registerInput);
    } catch (err) {
      console.log(err);
    } finally {
      setStateLoading(false);
      navigate("/");
    }
  };
  return (
    <>
      {stateLoading ? (
        <Loading />
      ) : (
        <form className="w-96  flex flex-col gap-3 p-4">
          <InputForm
            placeholder="firstname"
            name="firstName"
            value={registerInput.firstName}
            onChange={handleInput}
            errorInput={error.firstName}
            errorMessage={error.firstName}
          />
          <InputForm
            placeholder="lastname"
            name="lastName"
            value={registerInput.lastName}
            onChange={handleInput}
            errorInput={error.lastName}
            errorMessage={error.lastName}
          />
          <InputForm
            placeholder="username"
            name="username"
            value={registerInput.username}
            onChange={handleInput}
            errorInput={error.username}
            errorMessage={error.username}
          />
          <InputForm
            placeholder="email"
            name="email"
            value={registerInput.email}
            onChange={handleInput}
            errorInput={error.email}
            errorMessage={error.email}
          />
          <InputForm
            placeholder="phone"
            name="phone"
            value={registerInput.phone}
            onChange={handleInput}
            errorInput={error.phone}
            errorMessage={error.phone}
          />
          <InputForm
            type="password"
            placeholder="password"
            name="password"
            value={registerInput.password}
            onChange={handleInput}
            errorInput={error.password}
            errorMessage={error.password}
          />
          <InputForm
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={registerInput.confirmPassword}
            onChange={handleInput}
            errorInput={error.confirmPassword}
            errorMessage={error.confirmPassword}
          />
          <button
            className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none"
            onClick={handleSubmit}
          >
            REGISTER
          </button>
        </form>
      )}
    </>
  );
}
