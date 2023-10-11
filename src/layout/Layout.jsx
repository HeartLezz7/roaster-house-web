import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
