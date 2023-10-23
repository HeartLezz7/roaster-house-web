import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "../configs/axios";
import { getAccessToken } from "../utils/local-storage";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
  const [address, setAddress] = useState({});
  const [order, setOrder] = useState({});
  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/address/get")
        .then((res) => setAddress(res.data.address))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <OrderContext.Provider value={{ address, setOrder, order }}>
      {children}
    </OrderContext.Provider>
  );
}
