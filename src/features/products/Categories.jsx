export default function Categories() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">Categories</h1>
      <hr className="bg-gray-600" />
      <p className="text-sm active:bg-slate-400 cursor-pointer">Light Roast</p>
      <p className="text-sm active:bg-slate-400 cursor-pointer">Medium Roast</p>
      <p className="text-sm active:bg-slate-400 cursor-pointer">
        Medium-dark Roast
      </p>
      <p className="text-sm active:bg-slate-400 cursor-pointer">Dark Roast</p>
    </div>
  );
}
