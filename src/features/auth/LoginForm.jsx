import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import InputForm from "./InputForm";
import Joi from "joi";

export default function LoginForm() {
  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { login } = useAuth();

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
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const { value, error } = loginSchema.validate(user);
      login(value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-2 border border-gray-500 m-auto p-5 rounded-md"
      onSubmit={handleLogin}
    >
      <span>Login</span>
      <InputForm
        placeholder="username or email"
        name="emailOrUsername"
        value={user.emailOrUsername}
        onChange={handleInput}
      />
      <InputForm
        placeholder="password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleInput}
      />
      <button className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none">
        LOGIN
      </button>
    </form>
  );
}
