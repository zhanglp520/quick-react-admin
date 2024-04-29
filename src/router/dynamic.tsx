import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

import { IMenubar } from "@/types";
import Layout from "@/layout";

const getElement = (path: any) => {
  console.log("视图路径", `../views${path}`);
  const Component = lazy(() => import(`../views${path}`));
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export const buildRoutes = (menuList: IMenubar[]) => {
  const routes: RouteObject[] = [];
  menuList.forEach((menuItem: IMenubar) => {
    if (menuItem.children.length > 0) {
      const arr: RouteObject[] = [];
      menuItem.children.forEach((childMenuItem) => {
        arr.push({
          path: childMenuItem.path,
          element: getElement(childMenuItem.path),
          children: [],
        });
      });
      routes.push({
        path: menuItem.path,
        element: <Layout />,
        children: arr,
      });
    } else {
      routes.push({
        path: menuItem.path,
        element: <Layout />,
        children: [
          {
            path: menuItem.path,
            element: <Layout />,
          },
        ],
      });
    }
  });
  return routes;
};
