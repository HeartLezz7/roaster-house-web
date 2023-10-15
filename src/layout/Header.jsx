import { Link } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import { getAccessToken } from "../utils/local-storage";
import useAuth from "../hooks/use-auth";

export default function Header() {
  const getToken = getAccessToken();

  const { logout, setOpen } = useAuth();

  return (
    <div className=" flex justify-between items-center bg-white  py-3 px-10  ">
      <div className="w-60  flex justify-between items-center ">
        <Link to="/">
          <img src="src/icon/coffee_bean.svg" alt="coffee" className="h-14 " />
        </Link>
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
          <HeaderButton message="logout" link="/" onClick={logout} />
        ) : (
          <>
            <HeaderButton message="login" onClick={() => setOpen(true)} />
            <Link to="/register">
              <HeaderButton message="register" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
