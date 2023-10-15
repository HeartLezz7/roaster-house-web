export default function HeaderButton({ message, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-amber-900 hover:bg-amber-800 text-white py-3 px-4 rounded-full cursor-pointer "
    >
      {message}
    </button>
  );
}
