import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import useProduct from "../../hooks/use-product";
import ProductItem from "./ProductItem";
import { getAccessToken } from "../../utils/local-storage";

export default function ProductList() {
  const { products, productsCart, getCart } = useProduct();
  const { authAdmin } = useAuth();

  useEffect(() => {
    if (getAccessToken()) {
      getCart();
    }
  }, [productsCart]);
  return (
    <div className="grid grid-cols-4 grid-row-2 max-w-[1200px] gap-4">
      {products.map((item) => (
        <ProductItem
          id={item.id}
          key={item.id}
          image={item.productImage}
          name={item.productName}
          roast={item.roastLevel}
          price={item.price}
          size={item.size}
        />
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
