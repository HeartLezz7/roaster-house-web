import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import useProduct from "../../hooks/use-product";

export default function Categories() {
  const { filterProduct } = useProduct();
  const { authAdmin } = useAuth();
  return (
    <div className="w-[170px] flex flex-col gap-2">
      <div className="text-xl font-semibold">Categories</div>
      <hr className="bg-gray-600" />
      <div
        onClick={() => filterProduct("all")}
        className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md"
      >
        All
      </div>
      <div
        onClick={() => filterProduct("light")}
        className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md"
      >
        Light Roast
      </div>
      <div
        onClick={() => filterProduct("medium")}
        className="text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md"
      >
        Medium Roast
      </div>
      <div
        onClick={() => filterProduct("medium_dark")}
        className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md"
      >
        Medium-dark Roast
      </div>
      <div
        onClick={() => filterProduct("dark")}
        className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md"
      >
        Dark Roast
      </div>
      {authAdmin && (
        <Link to="/products/list">
          <div className="text-sm border bg-blue-600 text-white hover:bg-blue-500 hover:text-white cursor-pointer p-2 rounded-md">
            Products list
          </div>
        </Link>
      )}
    </div>
  );
}
