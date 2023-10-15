export default function ProductItem({ name, roast, price, size, image }) {
  console.log(image);
  return (
    <div className="flex flex-col items-center justify-center w-80 border border-gray-300 rounded-md shadow-lg">
      <img src={image || "src/icon/coffee_bean.svg"} alt="bean" />
      <h1 className="text-2xl">
        {name} - {roast}
      </h1>
      <h1 className="text-lg">{`${size} g.`}</h1>
      <p className="text-lg">{`฿${price}`}</p>
    </div>
  );
}
