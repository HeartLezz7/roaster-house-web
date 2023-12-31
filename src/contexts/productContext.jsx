import axios from "../configs/axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { getAccessToken } from "../utils/local-storage";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [productsCart, setProductsCart] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    getProducts();
    if (getAccessToken()) {
      getCart();
    }
  }, [isRefresh]);

  const findProduct = async (productId) => {
    return await axios.get(`/product/${productId}`);
  };

  const filterProduct = (roast) => {
    if (roast === "all") {
      setFilteredProduct(products);
    } else {
      const foundroducts = products.filter((item) => item.roastLevel === roast);
      setFilteredProduct(foundroducts);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("/product/get");
      setProducts(res.data.products);
      setFilteredProduct(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (productId, data) => {
    await axios.patch(`/product/update/${productId}`, data);
  };

  const getCart = async () => {
    try {
      const res = await axios.get("/shoppingCart/get");
      const getShoppinCart = res.data.foundShoppingCart.map((item) => {
        return {
          id: item.id,
          productId: item.productId,
          productName: item.product.productName,
          productImage: item.product.productImage,
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
    if (findProductCart) {
      findProductCart.amount += +amount;
      await axios.post("/shoppingCart/update", findProductCart);
      setProductsCart([findProduct]);
      setIsRefresh(!isRefresh);
    } else {
      findProduct.amount = +amount;
      await axios.post("/shoppingCart/create", findProduct);
      setProductsCart([...productsCart, findProduct]);
      setIsRefresh(!isRefresh);
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
    await axios.delete(`/shoppingCart/${productId}`);
    setIsRefresh(!isRefresh);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`/product/${productId}`);
    await getProducts();
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
        isRefresh,
        setIsRefresh,
        filteredProduct,
        setFilteredProduct,
        filterProduct,
        deleteProduct,
        updateProduct,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
