import plus from "../../icon/plus.png";

export default function CreateProductItem() {
  return (
    <div className=" w-[280px] h-[380px] gap-1 border border-gray-300 rounded-3xl shadow-lg p-2 cursor-pointer">
      <div className="bg-gray-300 w-full h-full flex justify-center items-center relative rounded-3xl">
        <div className="text-xl  w-8 h-8 ">
          <img src={plus} alt="plus" />
        </div>
      </div>
    </div>
  );
}
