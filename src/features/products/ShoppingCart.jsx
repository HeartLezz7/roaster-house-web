import ActionButton from "../../components/ActionButton";
import { Link } from "react-router-dom";
import useProduct from "../../hooks/use-product";

export default function ShoppingCart() {
  const { cartOpen, setCartOpen } = useProduct();
  return (
    <>
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
          <div className="fixed right-0 bg-white z-40 rounded-md p-5">
            <div className="w-full flex justify-between mb-3">
              <div className="w-full text-center">Login</div>
              <button type="button" onClick={() => setCartOpen(false)}>
                X
              </button>
            </div>

            <div className="w-full flex flex-col gap-2">
              <hr className=" border-gray-400" />
              <Link to="/register">
                <ActionButton title="CHECKOUT" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
