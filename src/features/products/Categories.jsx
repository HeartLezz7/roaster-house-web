export default function Categories() {
  return (
    <div className="w-[170px] flex flex-col gap-2">
      <h1 className="text-xl font-semibold">Categories</h1>
      <hr className="bg-gray-600" />
      <p className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md">
        Light Roast
      </p>
      <p className="text-sm hover:bg-slate-500 hover:text-white p-2 rounded-md">
        Medium Roast
      </p>
      <p className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md">
        Medium-dark Roast
      </p>
      <p className="text-sm hover:bg-slate-500 hover:text-white cursor-pointer p-2 rounded-md">
        Dark Roast
      </p>
    </div>
  );
}
