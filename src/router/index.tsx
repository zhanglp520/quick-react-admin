import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IMenubar } from "@/types";
import { lazy, Suspense } from "react";
import Layout from "@/layout/index";
import Home from "@/views/home";
import Login from "@/pages/login";
import ChangePassword from "@/views/changePassword";
import NotFound from "@/pages/404";

const Router = () => {
  const user = useSelector((state: RootState) => state.user);
  let menuList: IMenubar[] = [];
  if (user) {
    menuList = user.menuList;
  }
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

  const genRouter = (menuList: IMenubar[], routes: RouteObject[]) => {
    menuList.map((ele: IMenubar) => {
      const arr: RouteObject[] = [];
      let path = "";
      path = ele.path;
      if (ele.children && ele.children.length > 0) {
        ele.children.map((item: IMenubar) => {
          arr.push({
            path: item.path,
            element: LazyWrapper(item.path),
          });
        });
      }
      routes.push({
        path: path,
        element: <Layout />,
        children: arr,
      });
    });
  };
  const LazyWrapper = (path: any) => {
    const Component = lazy(() => import(`../views${path}`));
    return (
      <Suspense>
        <Component />
      </Suspense>
    );
  };
  genRouter(menuList, routes);
  routes.push({
    path: "/:catchAll(.*)",
    element: <NotFound />,
  });
  const element = useRoutes(routes);
  console.log("路由", routes);
  return <>{element}</>;
};
export default Router;
