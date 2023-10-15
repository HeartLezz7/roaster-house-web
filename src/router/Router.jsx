import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import AdminPage from "../pages/AdminPage";
import AdminLogin from "../features/auth/AdminLogin";
import AdminRegisterForm from "../features/auth/AdminRegisterForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "register", element: <RegisterPage /> },
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

export default function Router() {
  return <RouterProvider router={router} />;
}

// {
//     path: "/",
//     element: (
//       <Authenticated>
//         <Layout />
//       </Authenticated>
//     ),
//     children: [
//       { path: "", element: <HomePage /> },
//       { path: "friend", element: <FriendPage /> },
//       { path: "profile/:profileId", element: <ProfilePage /> },
//     ],
//   },
//   {
//     path: "/login",
//     element: (
//       <RedirectIfAuthenticated>
//         <LoginPage />,
//       </RedirectIfAuthenticated>
//     ),
//   },
// ]);
