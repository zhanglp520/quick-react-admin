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
  const modules = import.meta.glob("../views/**/*.tsx");
  console.log("modules", modules);
  const user = useSelector((state: RootState) => state.user);
  let menuList: IMenubar[] = [];
  menuList = user.menuList;
  console.log("menuList", menuList);
  const renderElement = (menu: IMenubar) => {
    let Component = null;
    if (menu.viewPath) {
      const viewPath = modules[`../views${menu.viewPath}.tsx`];
      if (!viewPath) {
        console.error(
          `IMenu view path configuration error or view does not exist ../views${menu.viewPath}.vue`
        );
      } else {
        Component = lazy(viewPath);
      }
    } else {
      const pathData = menu.path.split("/:");
      const path = modules[`../views${pathData[0]}/index.tsx`];
      if (!path) {
        console.error(
          `IMenu routing path configuration error or view does not exist ../views${pathData[0]}/index.vue`
        );
      } else {
        Component = lazy(path);
      }
    }
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
            menu1.children && menu1.children.length <= 0 && renderElement(menu1)
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
                  renderElement(menu2)
                }
              >
                {menu2.children &&
                  menu2.children.length > 0 &&
                  menu2.children.map((menu3: IMenubar) => (
                    <Route
                      key={menu3.path}
                      path={menu3.path}
                      element={
                        menu3.children &&
                        menu3.children.length <= 0 &&
                        renderElement(menu3)
                      }
                    ></Route>
                  ))}
              </Route>
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
