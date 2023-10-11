import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className=" flex justify-between items-center bg-white py-3 px-10 ">
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

      <button className="bg-amber-900 hover:bg-amber-800 text-white py-3 px-4 rounded-full cursor-pointer mr-6">
        Login/Register
      </button>
    </div>
  );
}
