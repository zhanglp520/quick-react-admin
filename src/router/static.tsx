import { Navigate, RouteObject } from "react-router-dom";

import Layout from "@/layout";
import Login from "@/pages/login";
import Home from "@/views/home";
import ChangePassword from "@/views/changePassword";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/changePassword",
    element: <Layout />,
    children: [
      {
        path: "/changePassword/index",
        element: <ChangePassword />,
      },
    ],
  },
  // {
  //   path: "/:catchAll(.*)",
  //   element: <NotFound />,
  // },
];

export default routes;
