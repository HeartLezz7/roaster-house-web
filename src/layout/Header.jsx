import { Link } from "react-router-dom";
import ActionButton from "./ActionButton";
import { getAccessToken } from "../utils/local-storage";
import useAuth from "../hooks/use-auth";

export default function Header() {
  const getToken = getAccessToken();

  const { logout } = useAuth();

  return (
    <div className=" flex justify-between items-center bg-white shadow-md py-3 px-10 mb-2 scor ">
      <div className="w-60  flex justify-between items-center ">
        <img src="src/icon/coffee_bean.svg" alt="coffee" className="h-14 " />
        <nav className="flex gap-6">
          <Link to="/">
            <span className="cursor-pointer">Home</span>
          </Link>

          <Link to="/products">
            <span className="cursor-pointer">Products</span>
          </Link>
        </nav>
      </div>
      <div className="flex gap-3">
        {getToken ? (
          <ActionButton message="logout" link="/" onClick={logout} />
        ) : (
          <>
            <ActionButton message="login" link="/login" />
            <ActionButton message="register" link="/register" />
          </>
        )}
      </div>
    </div>
  );
}
