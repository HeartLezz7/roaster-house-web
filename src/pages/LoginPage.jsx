import InputForm from "../features/auth/InputForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-2 border border-gray-500 m-auto p-5 rounded-md">
      <span>Login</span>
      <InputForm placeholder="username or email" />
      <InputForm placeholder="password" />
      <button className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none">
        REGISTER
      </button>
    </div>
  );
}
