import { Link } from "react-router-dom";

export default function ProfileSideBar() {
  return (
    <div className="w-[170px] flex flex-col gap-2">
      <h1 className="text-xl font-semibold">User</h1>
      <hr className="bg-gray-600" />
      <Link to="/profile/user">
        <p className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md">
          User profile
        </p>
      </Link>
      <Link to="/profile/address">
        <p className="text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md">
          Address
        </p>
      </Link>
      <Link to="/order">
        <p className="text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md">
          checkout
        </p>
      </Link>
    </div>
  );
}
