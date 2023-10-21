import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "../configs/axios";

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
  const [address, setAddress] = useState({});

  useEffect(() => {
    axios
      .get("/address/get")
      .then((res) => setAddress(res.data.address))
      .catch((err) => console.log(err));
  }, []);

  console.log(address);
  return (
    <OrderContext.Provider value={{ address }}>
      {children}
    </OrderContext.Provider>
  );
}
