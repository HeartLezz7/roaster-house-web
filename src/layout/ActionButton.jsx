import { Link } from "react-router-dom";

export default function ActionButton({ link, message, onClick }) {
  return (
    <Link to={link}>
      <button
        onClick={onClick}
        className="bg-amber-900 hover:bg-amber-800 text-white py-3 px-4 rounded-full cursor-pointer "
      >
        {message}
      </button>
    </Link>
  );
}
