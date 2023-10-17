import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import useProduct from "../../hooks/use-product";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products } = useProduct();
  const { authAdmin } = useAuth();
  return (
    <div className="grid grid-cols-4 grid-row-2 max-w-[1200px] gap-4">
      {products.map((item) => (
        <>
          <Link to={`/products/${item.id}`}>
            <ProductItem
              key={item.id}
              image={item.productImage}
              name={item.productName}
              roast={item.roastLevel}
              price={item.price}
              size={item.size}
            />
          </Link>
        </>
      ))}
      {authAdmin && (
        <div className="flex items-center justify-center w-[340px] h-[440px]  border border-gray-300 rounded-md shadow-lg p-2 cursor-pointer">
          <div className="bg-gray-300 w-full h-full flex justify-center items-center relative">
            <div className="text-xl border-2 border-neutral-500 text-neutral-500 w-8 h-8 text-center align-middle rounded-full">
              +
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
