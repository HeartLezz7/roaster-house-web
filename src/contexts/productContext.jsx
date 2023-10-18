import axios from "../configs/axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { getAccessToken } from "../utils/local-storage";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    getProducts();
    if (getAccessToken()) {
      getCart();
    }
  }, []);

  const findProduct = async (productId) => {
    return await axios.get(`/product/${productId}`);
  };

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

  const getCart = async () => {
    try {
      const res = await axios.get("/shoppingCart/get");
      const getShoppinCart = res.data.foundShoppingCart.map((item) => {
        return {
          id: item.id,
          productId: item.productId,
          productName: item.product.productName,
          price: item.product.price,
          roastLevel: item.product.roastLevel,
          amount: item.amount,
        };
      });

      setProductsCart(getShoppinCart);
    } catch (err) {
      console.log(err);
    }
  };

  const addProductstCart = async (productId, amount) => {
    const findProduct = products.find((product) => product.id == productId);
    const findProductCart = productsCart.find(
      (cart) => cart.productId == productId
    );
    console.log(findProductCart, "find");
    if (findProductCart) {
      findProductCart.amount += +amount;
      console.log(findProductCart, "update");
      await axios.post("/shoppingCart/update", findProductCart);
      setProductsCart([findProduct]);
    } else {
      findProduct.amount = +amount;
      console.log(findProduct, "create");
      await axios.post("/shoppingCart/create", findProduct);
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

  const deleteProductCart = async (productId) => {
    const foundProductCart = productsCart.find(
      (item) => item.productId === productId
    );
    console.log(foundProductCart, "aaa");
    await axios.delete(`/shoppingCart/${productId}`);
  };

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
        deleteProductCart,
        getCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
