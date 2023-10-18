import axios from "../configs/axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/product/get");
        setProducts(res.data.products);
        // const cart = await axios.get("/product/cart/get");
        // if (!cart) {
        //   setProductsCart({});
        // }
        // setProductsCart(cart);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const findProduct = async (productId) => {
    return await axios.get(`/product/${productId}`);
  };

  const addProductstCart = async (productId, amount) => {
    const findProduct = products.find((product) => product.id == productId);
    const findProductCart = productsCart.find((cart) => cart.id == productId);
    if (findProductCart) {
      findProduct.amount += +amount;
      console.log(findProduct, "update");
      await axios.post("/shoppingCart/modify", findProduct);
      setProductsCart([findProduct]);
    } else {
      findProduct.amount = +amount;
      console.log(findProduct, "create");
      await axios.post("/shoppingCart/modify", findProduct);
      setProductsCart([...productsCart, findProduct]);
    }
  };

  const increaseProductstCart = async (productId) => {
    const newProduct = structuredClone(productsCart);
    const product = newProduct.find((product) => product.id == productId);
    product.amount += 1;
    setProductsCart(newProduct);
  };

  const decreaseProductstCart = async (productId) => {
    const newProduct = structuredClone(productsCart);
    const product = newProduct.find((product) => product.id == productId);
    if (product.amount === 0) {
      product.amount = 0;
    } else {
      product.amount -= 1;
    }
    setProductsCart(newProduct);
  };

  // const deleteProductstCart = () => {};
  return (
    <ProductContext.Provider
      value={{
        products,
        findProduct,
        cartOpen,
        setCartOpen,
        productsCart,
        setProductsCart,
        addProductstCart,
        increaseProductstCart,
        decreaseProductstCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
