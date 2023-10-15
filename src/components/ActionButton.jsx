export default function ActionButton({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-sm outline-none w-full"
    >
      {title}
    </button>
  );
}
