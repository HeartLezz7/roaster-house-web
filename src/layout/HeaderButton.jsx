export default function HeaderButton({ message, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-amber-900 hover:bg-amber-800 text-white py-1.5 px-3 rounded-full cursor-pointer "
    >
      {message}
    </button>
  );
}
