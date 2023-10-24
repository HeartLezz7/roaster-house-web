import { useParams } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";
import Categories from "../features/products/Categories";
import useProduct from "../hooks/use-product";
import { useEffect } from "react";
import ActionButton from "../components/ActionButton";
import ProductContent from "../features/products/ProductContent";
import ShoppingCart from "../features/products/ShoppingCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function ProductItemPage() {
  const { productId } = useParams();

  const { authAdmin } = useAuth();
  const { findProduct, addProductstCart } = useProduct();

  const [getProduct, setGetProduct] = useState({});
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const handleProduct = async () => {
      try {
        const res = await findProduct(productId);
        setGetProduct(res.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    handleProduct();
  }, [productId]);

  return (
    <>
      <div className="flex gap-8 mx-10">
        <Categories />
        <div className="grid grid-rows-3 gap-4">
          <div className="w-[860px] border rounded-3xl flex gap-10 p-4 row-span-1">
            <img
              src={getProduct.productImage}
              alt="bean"
              className="w-96 rounded-3xl"
            />
            <div className="w-full flex flex-col justify-between  ">
              {authAdmin && (
                <div className="flex justify-end">
                  <div
                    onClick={() => navigate(`/products/update/${productId}`)}
                    className="text-sm border bg-blue-600 text-white hover:bg-blue-500 hover:text-white cursor-pointer p-2 rounded-md"
                  >
                    edit
                  </div>
                </div>
              )}
              <div>
                <h1 className="font-semibold text-2xl ">
                  {getProduct.productName}
                </h1>
                <h1 className="font-semibold text-2xl ">
                  {getProduct.roastLevel}
                </h1>
                <h1 className="font-semibold text-2xl">{`฿${getProduct.price}`}</h1>
              </div>
              <div>
                <p className="text-md ">{`TASTING NOTE: ${getProduct.tastingNote}`}</p>
                <p className="text-md">{`PROCESS: ${getProduct.process}`}</p>
                <p className="text-md">{`ROAST LEVEL: ${getProduct.process}`}</p>
                <p className="text-md">{`PACKING SIZE: ${getProduct.size}`}</p>
              </div>
              <div className="flex  gap-2 items-center  ">
                <div className="flex gap-2">
                  <button
                    className="border border-black w-10  rounded-full "
                    onClick={() => {
                      setAmount(amount - 1);
                      if (amount === 0) {
                        setAmount(0);
                      }
                    }}
                  >
                    -
                  </button>
                  <div className="p-1 text-center">{amount}</div>
                  <button
                    className="border border-black w-10 rounded-full "
                    onClick={() => setAmount(amount + 1)}
                  >
                    +
                  </button>
                </div>
                <ActionButton
                  title="Add to cart"
                  onClick={() => {
                    addProductstCart(productId, amount);
                    setAmount(0);
                  }}
                />
              </div>
            </div>
          </div>
          <ProductContent />
        </div>
      </div>
      <LoginForm />
      <ShoppingCart />
    </>
  );
}
