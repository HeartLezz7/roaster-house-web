import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import useProduct from "../../hooks/use-product";
import ProductItem from "./ProductItem";
import { getAccessToken } from "../../utils/local-storage";

import { Link } from "react-router-dom";
import CreateProductItem from "./CreateProductItem";
import { useLocation } from "react-router-dom";

export default function ProductList() {
  const { filteredProduct, products, getCart, isRefresh } = useProduct();
  const { authAdmin } = useAuth();

  const { pathname } = useLocation();

  useEffect(() => {
    if (getAccessToken()) {
      getCart();
    }
  }, [isRefresh]);

  function checkProduct() {
    if (pathname !== "/products") {
      let homeProducts = [];
      homeProducts = products.slice(0, 4);
      return homeProducts;
    } else {
      return filteredProduct;
    }
  }
  return (
    <div className="grid grid-cols-4 grid-row-2 max-w-[1200px] gap-4">
      {checkProduct().map((item) => (
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
      {authAdmin && pathname === "/products" && (
        <Link to="/products/create">
          <CreateProductItem />
        </Link>
      )}
    </div>
  );
}
