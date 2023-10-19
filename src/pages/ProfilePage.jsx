import { Outlet } from "react-router-dom";
import ShoppingCart from "../features/products/ShoppingCart";
import ProfileSideBar from "../features/profile/ProfileSideBar";

export default function ProfilePage() {
  return (
    <>
      <div className="flex gap-8 mx-10">
        <ProfileSideBar />
        <Outlet />
      </div>
      <ShoppingCart />
    </>
  );
}
