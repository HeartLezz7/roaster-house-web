import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import AdminPage from "../pages/AdminPage";
import AdminLogin from "../features/auth/AdminLogin";
import AdminRegisterForm from "../features/auth/AdminRegisterForm";
import ProductItemPage from "../pages/ProductItemPage";
import ProfilePage from "../pages/ProfilePage";
import Address from "../features/profile/AddressForm";
import UserProfile from "../features/profile/UserProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:productId", element: <ProductItemPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { path: "user", element: <UserProfile /> },
          { path: "address", element: <Address /> },
        ],
      },
    ],
  },
  {
    path: "admin/",
    element: <AdminPage />,
  },
  {
    path: "admin/login",
    element: <AdminLogin />,
  },
  {
    path: "admin/register",
    element: <AdminRegisterForm />,
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
