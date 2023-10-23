import { useState, useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import Joi from "joi";
import InputForm from "../../components/InputForm";
import ActionButton from "../../components/ActionButton";
import { getAccessToken } from "../../utils/local-storage";
import TextMessage from "../../components/TextMessage";
import axios from "../../configs/axios";

export default function UserProfile() {
  const { authUser, authAdmin, validateError } = useAuth();
  console.log(authAdmin);

  const [editProfile, setEditProfile] = useState(false);
  const [error, setError] = useState({});
  const [userInput, setUserInput] = useState({
    firstName: authUser?.firstName || authAdmin?.firstName,
    lastName: authUser?.lastName || authAdmin?.lastName,
    email: authUser?.email || authAdmin?.lastName,
    phone: authUser?.phone || authAdmin?.lastName,
  });

  useEffect(() => {
    if (getAccessToken()) {
      axios.get("/auth/get").then((res) => setUserInput(res.data.user));
    }
  }, []);

  const userValidateSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    // .messages({ "string.empty": "first name is required" })
    lastName: Joi.string().trim().required(),
    email: Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .trim()
      .required(),
    phone: Joi.string().trim().required(),
  });

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleEditUserProfile = async (e) => {
    try {
      e.preventDefault();
      const error = validateError(userValidateSchema, userInput);
      if (error) {
        return setError(error);
      }
      setError({});
      const res = await axios.patch("/auth/updateProfile", userInput);
      setUserInput(res.data.updateProfile);
      setEditProfile(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-row-2 gap-3">
      <div className="flex justify-between min-w-[600px] max-w-3xl">
        <div className="text-2xl">User profile</div>
        {editProfile ? (
          <div className="cursor-pointer" onClick={() => setEditProfile(false)}>
            X
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => setEditProfile(true)}>
            Edit
          </div>
        )}
      </div>
      {editProfile ? (
        <form
          onSubmit={handleEditUserProfile}
          className="min-w-[600px] max-w-3xl"
        >
          <InputForm
            placeholder={authUser?.firstName || authAdmin?.firstName}
            name="firstName"
            value={userInput?.firstName}
            onChange={handleInput}
            errorInput={error.firstName}
            errorMessage={error.firstName}
          />
          <InputForm
            placeholder={authUser?.lastName || authAdmin?.lastName}
            name="lastName"
            value={userInput?.lastName}
            onChange={handleInput}
            errorInput={error.lastName}
            errorMessage={error.lastName}
          />
          <InputForm
            placeholder={authUser?.email || authAdmin?.email}
            name="email"
            value={userInput?.email}
            onChange={handleInput}
            errorInput={error.email}
            errorMessage={error.email}
          />
          <InputForm
            placeholder={authUser?.phone || authAdmin?.phone}
            name="phone"
            value={userInput?.phone}
            onChange={handleInput}
            errorInput={error.phone}
            errorMessage={error.phone}
          />
          <ActionButton title="Edit profile" onClick={handleEditUserProfile} />
        </form>
      ) : (
        <div className="grid grid-row-3 gap-2">
          <div className="grid grid-rows-3 grid-cols-2 min-w-[600px] max-w-3xl gap-2">
            <TextMessage
              grid="1"
              text={authUser?.firstName || authAdmin?.firstName || "first name"}
            />
            <TextMessage
              grid="1"
              text={authUser?.lastName || authAdmin?.lastName || "last name"}
            />
            <TextMessage
              grid="2"
              text={authUser?.email || authAdmin?.email || "email"}
            />
            <TextMessage
              grid="2"
              text={authUser?.phone || authAdmin?.phone || "phone"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
