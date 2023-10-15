import axios from "../configs/axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
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
  console.log(products);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
