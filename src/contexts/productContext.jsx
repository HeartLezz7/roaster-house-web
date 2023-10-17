import axios from "../configs/axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [getProduct, setGetProduct] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/product/get");
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const findProduct = async (productId) => {
    return await axios.get(`/product/${productId}`);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        findProduct,
        getProduct,
        setGetProduct,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
