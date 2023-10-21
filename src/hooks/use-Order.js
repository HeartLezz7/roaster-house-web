import { useContext } from "react";
import { OrderContext } from "../contexts/orderContext";

export default function useOrder() {
  return useContext(OrderContext);
}
