import RegisterForm from "../features/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex items-center ">
      <div className="bg-white w-80 flex flex-col gap-3 flex-1 justify-center items-center">
        <span className="text-3xl">Register membership</span>
        <RegisterForm />
      </div>
      <div className="flex-1">
        <img src="src/icon/coffee-farmer.jpg" alt="register" className="" />
      </div>
    </div>
  );
}
