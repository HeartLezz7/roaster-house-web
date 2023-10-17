export default function ProductItem({ name, roast, price, size, image }) {
  return (
    <div className="flex flex-col items-center w-[280px] h-[380px] gap-1 border border-gray-300 rounded-md shadow-lg ">
      <div>
        <img src={image || "src/icon/coffee_bean.svg"} alt="bean" />
      </div>
      <div className="flex flex-col justify-center items-center  ">
        <h1 className="text-xl">
          {name} - {roast}
        </h1>
        <h1 className="text-lg">{`${size} g.`}</h1>
        <p className="text-lg">{`฿${price}`}</p>
      </div>
    </div>
  );
}
