import { useState } from "react";
import useProduct from "../../hooks/use-product";

export default function ShoppingCartItem({ name, roast, price }) {
  console.log("first");
  const { amount } = useProduct();
  const [amountCart, setAmountCart] = useState(amount);
  console.log(name, roast, price);

  return (
    <div>
      <div className="flex flex-col gap-2 justify-between items-start border border-gray-300 p-2 rounded-lg ">
        <div>
          <div>name: {name}</div>
          <div>Roast :{roast}</div>
          <div>Amount : {amountCart} </div>
          <div>price : {amountCart * price} </div>
        </div>
        <div className="flex gap-5 mx-auto">
          <button
            className="border border-black w-10  rounded-full "
            onClick={() => {
              setAmountCart(amountCart - 1);
              if (amountCart === 0) {
                setAmountCart(0);
              }
            }}
          >
            -
          </button>
          <button
            className="border border-black w-10 rounded-full"
            onClick={() => setAmountCart(amountCart + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
