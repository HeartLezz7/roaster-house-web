import useProduct from "../../hooks/use-product";

export default function ShoppingCartItem({ name, roast, price, amount, id }) {
  const { increaseProductstCart, decreaseProductstCart, deleteProductCart } =
    useProduct();

  return (
    <div>
      <div className="flex flex-col gap-2 justify-between items-start border border-gray-300 p-2 rounded-lg relative">
        <div
          className="absolute right-2 top-"
          onClick={() => deleteProductCart(id)}
        >
          X
        </div>
        <div>
          <div>name: {name}</div>
          <div>Roast :{roast}</div>
          <div>Amount : {amount} </div>
          <div>price : {amount * price} </div>
        </div>
        <div className="flex gap-5 mx-auto">
          <button
            className="border border-black w-10  rounded-full "
            onClick={() => {
              decreaseProductstCart(id);
            }}
          >
            -
          </button>
          <button
            className="border border-black w-10 rounded-full"
            onClick={() => increaseProductstCart(id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
