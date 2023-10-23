import { Link } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import axios from "../../configs/axios";
import useProduct from "../../hooks/use-product";
import useAuth from "../../hooks/use-auth";
import { toast } from "react-toastify";

export default function OrderItem({ id, status, payment }) {
  const { isRefresh, setIsRefresh } = useProduct();
  const { authUser, authAdmin } = useAuth();
  console.log(payment, "status");
  const OrderButton = ({ title, onClick, color, hover }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`${color} ${hover} text-white p-2 rounded-xl outline-none w-full`}
      >
        {title}
      </button>
    );
  };

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

  const approve = async () => {
    try {
      const approve = await axios.patch("/payment/adminConfirm", {
        confirm: "approve",
        id,
      });
      setIsRefresh(!isRefresh);
      toast.success(approve.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const reject = async () => {
    try {
      const reject = await axios.patch("/payment/adminConfirm", {
        confirm: "reject",
        id,
      });
      setIsRefresh(!isRefresh);
      toast.error(reject.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full rounded-xl py-2 px-3 border flex items-center justify-between">
      <Link to={`/order/${id}`}>
        <div>Order {id}</div>
      </Link>
      {authUser && (
        <div
          className={`flex items-center justify-between gap-3 ${
            status === "cancel"
              ? "text-red-600"
              : status === "completed"
              ? "text-green-700"
              : ""
          }`}
        >
          <div>{status}</div>

          {status === "shipping" ? (
            <ActionButton title="confirm order" onClick={confirmOrder} />
          ) : (
            ""
          )}
        </div>
      )}
      {authAdmin && (
        <div
          className={`flex items-center justify-between gap-3 ${
            status === "completed"
              ? "text-green-700"
              : status === "cancel"
              ? "text-red-600"
              : ""
          }`}
        >
          <div>
            {status === "completed"
              ? status
              : status === "cancel"
              ? status
              : payment}
          </div>

          {status === "pending" ? (
            <>
              <OrderButton
                title="approve"
                onClick={approve}
                color="bg-green-700"
                hover="hover:bg-green-600"
              />
              <OrderButton
                title="reject"
                onClick={reject}
                color="bg-red-600"
                hover="hover:bg-red-500"
              />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
