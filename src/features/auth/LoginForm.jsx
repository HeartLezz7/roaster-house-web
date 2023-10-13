import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import InputForm from "../../components/InputForm";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function LoginForm() {
  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { login, validateError, stateLoading, setStateLoading } = useAuth();

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
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const error = validateError(loginSchema, user);
      if (error) {
        return setError(error);
      }
      setError({});
      setStateLoading(true);
      login(user);
    } catch (err) {
      console.log(err);
    } finally {
      setStateLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      (
      {stateLoading ? (
        <Loading />
      ) : (
        <form
          className="w-80 flex flex-col gap-4 border border-gray-500 m-auto p-5 rounded-md"
          onSubmit={handleLogin}
        >
          <div className="text-center">Login</div>
          <InputForm
            placeholder="username or email"
            name="emailOrUsername"
            value={user.emailOrUsername}
            onChange={handleInput}
            error={error}
            errorInput={error.emailOrUsername}
            errorMessage={error.emailOrUsername}
          />
          <InputForm
            placeholder="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            errorInput={error.password}
            errorMessage={error.password}
          />
          <button className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none w-full">
            LOGIN
          </button>
        </form>
      )}
      )
    </>
  );
}
