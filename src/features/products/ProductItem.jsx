import { Link } from "react-router-dom";
import logo from "../../icon/coffee_bean.svg";

export default function ProductItem({ name, roast, price, size, image, id }) {
  return (
    <Link to={`/products/${id}`}>
      <div className="flex flex-col items-center w-[280px] gap-1 border border-gray-300 rounded-3xl shadow-lg ">
        <div>
          <img src={image || logo} alt="bean" className="rounded-t-3xl" />
        </div>
        <div className="flex flex-col justify-center items-center  ">
          <h1 className="text-xl">
            {name} - {roast}
          </h1>
          <div className="text-lg">{`${size} g.`}</div>
          <div className="text-lg">{`฿${price}`}</div>
        </div>
      </div>
    </Link>
  );
}
