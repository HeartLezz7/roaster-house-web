import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";

export default function useProduct() {
  return useContext(ProductContext);
}
