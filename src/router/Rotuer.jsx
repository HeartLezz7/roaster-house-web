import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "login", element: <LoginPage /> },
    ],
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
