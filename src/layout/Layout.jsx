import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-500">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
