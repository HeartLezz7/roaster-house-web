import axios from "axios";
import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import useProduct from "../../hooks/use-product";

export default function OrderList() {
  const [getAllOrder, setGetAllOrder] = useState([]);
  const { isRefresh } = useProduct();
  useEffect(() => {
    axios
      .get("/order/getAll")
      .then((res) => setGetAllOrder(res.data.getAllOrder));
  }, [isRefresh]);
  console.log(getAllOrder);
  return (
    <div className="grid grid-rows-6  min-w-[600px] max-w-3xl p-2">
      <div className="row-span-1 flex items-center">
        <div className="text-3xl ">Order List</div>
      </div>
      <div className="flex flex-col row-span-5 gap-2">
        {getAllOrder.map((item) => (
          <OrderItem key={item.id} id={item.id} status={item.status} />
        ))}
      </div>
    </div>
  );
}
