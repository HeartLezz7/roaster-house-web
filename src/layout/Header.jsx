import { Link } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import { getAccessToken } from "../utils/local-storage";
import useAuth from "../hooks/use-auth";
import { useLocation } from "react-router-dom";
import Logo from "../icon/coffee_bean.svg";
import cart from "../icon/shopping.png";
import useProduct from "../hooks/use-product";

export default function Header() {
  const getToken = getAccessToken();

  const { logout, setOpen, authUser, authAdmin } = useAuth();

  const { setCartOpen } = useProduct();

  const { pathname } = useLocation();

  let username;
  if (authAdmin) {
    username = authAdmin.username;
  } else if (authUser) {
    username = authUser.username;
  }

  return (
    <div className=" flex justify-between items-center bg-white  py-3 px-10  ">
      <div className="w-60  flex justify-between items-center ">
        <Link to="/">
          <img src={Logo} alt="coffee" className="h-14 " />
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
          <div className="flex items-center gap-3 ">
            <Link to="/profile/user">
              <h1 className="active:font-semibold">{username}</h1>
            </Link>
            <Link to="/">
              <HeaderButton message="logout" onClick={logout} />
            </Link>
            <div
              className="flex items-center justify-center w-12 p-1 cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <img src={cart} alt="cart" className="w-full" />
            </div>
          </div>
        ) : (
          <>
            <HeaderButton message="login" onClick={() => setOpen(true)} />
            {pathname === "/register" || (
              <Link to="/register">
                <HeaderButton message="register" />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
