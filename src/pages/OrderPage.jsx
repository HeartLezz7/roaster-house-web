import ActionButton from "../components/ActionButton";
import AddressForm from "../features/profile/AddressForm";
import UserProfile from "../features/profile/UserProfile";
import useOrder from "../hooks/use-Order";
import axios from "../configs/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function OrderPage() {
  const { order, setOrder } = useOrder();
  const { orderId } = useParams();
  console.log(orderId, "params");
  console.log(order);
  useEffect(() => {
    axios
      .get(`/order/get/${orderId}`)
      .then((res) => setOrder(res.data.getOrder))
      .catch((err) => console.log(err));
  }, [orderId]);

  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      await axios.post("/order/payment/", { id: orderId });
      navigate(`/payment/${orderId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="m-auto border border-gray-300 grid grid-cols-3 max-w-screen-xl p-3">
        <div className="grid grid-rows-2 col-span-2">
          <div>
            <UserProfile />
          </div>
          <div>
            <AddressForm />
          </div>
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-2">
          <div className="bg-gray-200 border border-gray-300 rounded-xl p-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-end font-semibold text-lg">
                <div>ORDER</div>
              </div>
              <div className="flex justify-between font-semibold text-sm">
                <div>PRODUCT</div>
                <div>SUBTOTAL</div>
              </div>
              {order.orderItem?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-full flex justify-between text-sm"
                  >
                    <div>
                      {item.product.productName} x {item.amount}
                    </div>
                    <div>{item.totalPrice}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between font-semibold text-sm">
              <div>Sum price</div>
              <div>{`฿ ${order.sumPrice}`}</div>
            </div>
          </div>
          <div>
            <ActionButton title="Payment" onClick={handlePayment} />
          </div>
        </div>
      </div>
    </div>
  );
}
