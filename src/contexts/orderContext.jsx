import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "../configs/axios";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
  const [address, setAddress] = useState({});
  const [order, setOrder] = useState({});
  useEffect(() => {
    axios
      .get("/address/get")
      .then((res) => setAddress(res.data.address))
      .catch((err) => console.log(err));
  }, []);

  return (
    <OrderContext.Provider value={{ address, setOrder, order }}>
      {children}
    </OrderContext.Provider>
  );
}
