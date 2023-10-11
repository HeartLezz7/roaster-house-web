import { useState } from "react";
import InputForm from "./InputForm";
import useAuth from "../../hooks/use-auth";
import Joi from "joi";
import { Navigate } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });
  // const [error, setError] = useState({});

  const { register } = useAuth();

  const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
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
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  console.log(input);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { value } = registerSchema.validate(input);
      console.log(value);
      register(value);
      if (value) {
        return <Navigate to="/" />;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="w-96  flex flex-col gap-3 p-4">
      <InputForm
        placeholder="firstname"
        name="firstName"
        value={input.firstName}
        onChange={handleInput}
      />
      <InputForm
        placeholder="lastname"
        name="lastName"
        value={input.lastName}
        onChange={handleInput}
      />
      <InputForm
        placeholder="username"
        name="username"
        value={input.username}
        onChange={handleInput}
      />
      <InputForm
        placeholder="email"
        name="email"
        value={input.email}
        onChange={handleInput}
      />
      <InputForm
        placeholder="phone"
        name="phone"
        value={input.phone}
        onChange={handleInput}
      />
      <InputForm
        type="password"
        placeholder="password"
        name="password"
        value={input.password}
        onChange={handleInput}
      />
      <InputForm
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        value={input.confirmPassword}
        onChange={handleInput}
      />
      <button
        className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none"
        onClick={handleSubmit}
      >
        REGISTER
      </button>
    </form>
  );
}
