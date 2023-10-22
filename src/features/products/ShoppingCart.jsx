import ActionButton from "../../components/ActionButton";
import useProduct from "../../hooks/use-product";
import ShoppingCartItem from "./ShoppingCartItem";
import axios from "../../configs/axios";
import { useNavigate } from "react-router-dom";
import useOrder from "../../hooks/use-Order";

export default function ShoppingCart() {
  const { cartOpen, setCartOpen, productsCart } = useProduct();
  const { setOrder } = useOrder();
  const navigate = useNavigate();

  const handleCheckOut = async () => {
    try {
      const res = await axios.post("/order/createOrder");
      setOrder(res.data.order);
      console.log(res, "checkout");
      setCartOpen(false);
      navigate(`/order/${res.data.order.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
          <div className="w-72 h-screen fixed right-0 bg-white z-40 rounded-md p-5 flex flex-col gap-2 justify-between overflow-scroll">
            <div>
              <div className="w-full flex flex-col gap-2 ">
                <div className="w-full flex justify-between ">
                  <div className="w-full text-center">Shopping cart</div>
                  <button type="button" onClick={() => setCartOpen(false)}>
                    X
                  </button>
                </div>
                <hr className=" border-gray-300" />
                {productsCart.map((cart) => (
                  <ShoppingCartItem
                    key={cart.id}
                    id={cart.id}
                    name={cart.productName}
                    img={cart.productImage}
                    roast={cart.roastLevel}
                    price={cart.price}
                    amount={cart.amount}
                  />
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 ">
              <hr className=" border-gray-300" />
              <ActionButton title="CHECKOUT" onClick={handleCheckOut} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
