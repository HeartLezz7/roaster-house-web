import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import InputForm from "../../components/InputForm";
import Joi from "joi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import ActionButton from "../../components/ActionButton";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { login, validateError, stateLoading, setStateLoading, open, setOpen } =
    useAuth();

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
        toast.error(error.emailOrUsername);
        toast.error(error.password);
        console.log(error);
        return setError(error);
      }
      setError({});
      setStateLoading(true);
      login(user);
      setStateLoading(false);
      toast.success("login success");
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
        open && (
          <>
            <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
            <div className="fixed right-0 bg-white z-40 rounded-md">
              <form
                className="w-80  h-screen flex flex-col gap-4 p-5"
                onSubmit={handleLogin}
              >
                <div className="flex justify-between">
                  <div></div>
                  <div>Login</div>
                  <button onClick={() => setOpen(false)}>X</button>
                </div>
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
                <ActionButton title="LOGIN" />
                <hr className=" border-gray-400" />
                <Link to="/register">
                  <ActionButton title="REGISTER" />
                </Link>
              </form>
            </div>
          </>
        )
      )}
    </>
  );
}
