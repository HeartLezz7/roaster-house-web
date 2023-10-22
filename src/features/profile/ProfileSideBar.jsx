import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProfileSideBar() {
  const { pathname } = useLocation();
  return (
    <div className="w-[170px] flex flex-col gap-2">
      <h1 className="text-xl font-semibold">User</h1>
      <hr className="bg-gray-600" />
      <Link to="/profile/user">
        <div
          className={`text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md ${
            pathname == "/profile/user" ? "bg-slate-500 text-white" : ""
          }`}
        >
          User profile
        </div>
      </Link>
      <Link to="/profile/address">
        <div
          className={`text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md ${
            pathname == "/profile/address" ? "bg-slate-500 text-white" : ""
          }`}
        >
          Address
        </div>
      </Link>
      <Link to="/profile/order">
        <div
          className={`text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md ${
            pathname == "/profile/order" ? "bg-slate-500 text-white" : ""
          }`}
        >
          Orders
        </div>
      </Link>
      {/* <Link to="/payment">
        <div className="text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md">
          payment
        </div>
      </Link> */}
    </div>
  );
}
