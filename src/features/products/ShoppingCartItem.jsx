import useProduct from "../../hooks/use-product";
import trash from "../../icon/trash.png";

export default function ShoppingCartItem({ name, price, amount, img, id }) {
  const { increaseProductstCart, decreaseProductstCart, deleteProductCart } =
    useProduct();
  return (
    <div>
      <div className="flex flex-col gap-2 justify-between items-start border border-gray-300 p-2 rounded-lg relative">
        <div
          onClick={() => deleteProductCart(id)}
          className="absolute bottom-2 right-2"
        >
          <img src={trash} alt="trash" className="w-8" />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <img src={img} alt="cart" className="w-full rounded-md" />
          </div>
          <div>
            <div className="text-sm">name: {name}</div>
            {/* <div className="text-sm">Roast :{roast}</div> */}
            <div className="text-sm">Amount : {amount} </div>
            <div className="text-sm">price : {amount * price} </div>
          </div>
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
