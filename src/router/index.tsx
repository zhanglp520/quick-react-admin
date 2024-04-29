import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { IMenubar } from "@/types";
import NotFound from "@/pages/404";
import staticRoutes from "./static";
import { buildRoutes } from "./dynamic";
import AuthRouter from "./AuthRouter";

const Router: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  let menuList: IMenubar[] = [];
  menuList = user.menuList;
  console.log("menuList", menuList);

  const dynamicRoutes = buildRoutes(menuList);
  console.log("staticRoutes", staticRoutes);
  console.log("dynamicRoutes", dynamicRoutes);

  const routes = [
    ...staticRoutes,
    ...dynamicRoutes,
    {
      path: "/:catchAll(.*)",
      element: <NotFound />,
    },
  ];

  console.log("合并后的路由", routes);
  const element = useRoutes(routes);
  return <>{element}</>;
};
export default Router;
