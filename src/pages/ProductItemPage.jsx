import { useParams } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";
import Categories from "../features/products/Categories";
import useProduct from "../hooks/use-product";
import { useEffect } from "react";
import ActionButton from "../components/ActionButton";
import { useState } from "react";
import ProductContent from "../features/products/ProductContent";
import ShoppingCart from "../features/products/ShoppingCart";

export default function ProductItemPage() {
  const { productId } = useParams();
  const [count, setCount] = useState(0);
  const { findProduct, getProduct, setGetProduct } = useProduct();
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

  console.log(getProduct);

  return (
    <>
      <div className="flex gap-8 mx-10">
        <Categories />
        <div className="grid grid-rows-2 gap-4">
          <div className="w-[660px] border rounded-md flex gap-5">
            <img src={getProduct.productImage} alt="bean" className="w-96" />
            <div className="w-64 flex flex-col justify-between p-2 ">
              <div>
                <h1 className="font-semibold text-2xl ">
                  {getProduct.productName}{" "}
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
              <div className="flex justify-evenly gap-2 items-center  ">
                <button
                  className="border border-black w-10 rounded-full "
                  onClick={() => {
                    setCount(count - 1);
                  }}
                >
                  -
                </button>
                <div className="p-1 text-center">{count}</div>
                <button
                  className="border border-black w-10 rounded-full "
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
                <ActionButton title="Add to chart" />
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
