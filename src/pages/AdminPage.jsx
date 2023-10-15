import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export default function AdminPage() {
  return (
    <div className="w-80 h-screen flex flex-col justify-center items-center gap-5 m-auto">
      <Link to="/admin/login">
        <ActionButton title="ADMIN LOGIN" />
      </Link>
      <Link to="/admin/register">
        <ActionButton title="ADMIN REGISTER" />
      </Link>
    </div>
  );
}
