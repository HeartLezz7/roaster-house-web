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
import AddressForm from "../features/profile/AddressForm";
import UserProfile from "../features/profile/UserProfile";
import PaymentPage from "../pages/PaymentPage";
import OrderPage from "../pages/OrderPage";
import OrderList from "../features/profile/OrderList";

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
          { path: "address", element: <AddressForm /> },
          {
            path: "order",
            element: <OrderList />,
          },
        ],
      },

      {
        path: "order/:orderId",
        element: <OrderPage />,
      },
      {
        path: "payment/:paymentId",
        element: <PaymentPage />,
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
