import { Link } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import axios from "../../configs/axios";
import useProduct from "../../hooks/use-product";
import { toast } from "react-toastify";

export default function OrderItem({ id, status }) {
  const { isRefresh, setIsRefresh } = useProduct();

  const confirmOrder = async () => {
    try {
      const confirm = await axios.patch("/payment/userConfirm", { id });
      setIsRefresh(!isRefresh);
      toast.success("Order completed");
      console.log(confirm);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full rounded-xl py-2 px-3 border flex items-center justify-between">
      <Link to={`/order/${id}`}>
        <div>Order {id}</div>
      </Link>
      <div
        className={`flex items-center justify-between gap-3 ${
          status === "pending"
            ? "text-red-600"
            : status === "completed"
            ? "text-green-700"
            : ""
        }`}
      >
        <div>{status}</div>

        {status === "completed" ? (
          ""
        ) : (
          <ActionButton title="confirm order" onClick={confirmOrder} />
        )}
      </div>
    </div>
  );
}
