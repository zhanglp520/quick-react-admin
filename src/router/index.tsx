import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { IMenubar } from "@/types";
import Layout from "@/layout";
import NotFound from "@/pages/404";
import Login from "@/pages/login";
import Home from "@/views/home";
import ChangePassword from "@/views/changePassword";

const Router: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  let menuList: IMenubar[] = [];
  menuList = user.menuList;
  console.log("menuList", menuList);
  const renderElement = (path: string) => {
    const Component = lazy(() => import(`../views${path}`));
    return (
      <>
        <Suspense>{<Component></Component>}</Suspense>
      </>
    );
  };
  const renderDynamicElement = () => {
    {
      return menuList.map((menu1: IMenubar) => (
        <Route
          key={menu1.path}
          path={menu1.path}
          element={
            menu1.children &&
            menu1.children.length <= 0 &&
            renderElement(menu1.path)
          }
        >
          {menu1.children &&
            menu1.children.length > 0 &&
            menu1.children.map((menu2: IMenubar) => (
              <Route
                key={menu2.path}
                path={menu2.path}
                element={
                  menu2.children &&
                  menu2.children.length <= 0 &&
                  renderElement(menu2.path)
                }
              ></Route>
            ))}
        </Route>
      ));
    }
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route key="/" path="/" element={<Navigate to="/home" />}></Route>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          {renderDynamicElement()}
        </Route>
        <Route path="/:catchAll(.*)" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
export default Router;
