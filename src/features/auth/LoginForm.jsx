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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const error = validateError(loginSchema, user);
      if (error) {
        toast.error(error.emailOrUsername);
        toast.error(error.password);
        return setError(error);
      }
      setError({});
      setStateLoading(true);
      await login(user);
      toast.success("login success");
    } catch (err) {
      toast.error("Access Denined");
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
            <div className="fixed right-0 bg-white z-40 rounded-md p-5">
              <div className="w-full flex justify-between mb-3">
                <div className="w-full text-center">Login</div>
                <button type="button" onClick={() => setOpen(false)}>
                  X
                </button>
              </div>
              <form
                className="w-80  h-screen flex flex-col items-center gap-2 "
                onSubmit={handleLogin}
              >
                {/* <div> */}
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
                <div className="w-full flex flex-col gap-2">
                  <hr className=" border-gray-400" />
                  <Link to="/register">
                    <ActionButton title="REGISTER" />
                  </Link>
                </div>
              </form>
            </div>
          </>
        )
      )}
    </>
  );
}
