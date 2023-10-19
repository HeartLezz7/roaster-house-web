export default function ActionButton({ title, type = "submit", onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-xl outline-none w-full"
    >
      {title}
    </button>
  );
}
