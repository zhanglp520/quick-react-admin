import { useSelector } from "react-redux";
import { RouteObject, Router } from "react-router-dom";
import { IMenu } from "@/types";
// import { Suspense, lazy } from "react";
import store, { RootState } from "@/store";
import { lazy } from "react";

const modules = import.meta.glob("../views/**/*.tsx");
const components = Object.keys(modules).reduce<Record<string, any>>(
  (prev: any, cur: any) => {
    prev[cur.replace("./views", "")] = modules[cur];
    return prev;
  },
  {}
) as any;

// const getElement = (path: string) => {
//   console.log("path", path);

//   const Element = lazy(() => import(`../${path}`));
//   return (
//     <Suspense fallback={<div>loading</div>}>
//       <Element />
//     </Suspense>
//   );
// };

const getComponent = (childElement: IMenu) => {
  let filePath = "";
  if (childElement.viewPath) {
    const viewPath = `../views${childElement.viewPath}.tsx`;
    if (!viewPath) {
      console.error(
        `IMenu view path configuration error or view does not exist ../views${childElement.viewPath}.tsx`
      );
    } else {
      filePath = viewPath;
    }
  } else {
    const path = `../views${childElement.path}/index.tsx`;
    if (!path) {
      console.error(
        `IMenu routing path configuration error or view does not exist ../views${childElement.path}/index.tsx`
      );
    } else {
      filePath = path;
    }
  }
  return components[filePath];
};
const formatRouter = (data: IMenu[]) => {
  const arr: RouteObject[] = [];
  const firstMenuArr: IMenu[] = [];
  const secondMenuArr: IMenu[] = [];
  data.forEach((element: IMenu) => {
    if (element.menuType === 0) {
      firstMenuArr.push(element);
    } else if (element.menuType === 1) {
      secondMenuArr.push(element);
    }
  });
  console.log("secondMenuArr", secondMenuArr);
  const childMenus = secondMenuArr.filter((x) => Number(x.pId) === 0);
  console.log("childMenus", childMenus);

  childMenus.forEach((element) => {
    const component = getComponent(element);
    const routerObj: RouteObject = {
      id: element.menuId,
      path: element.path,
      Component: lazy(() => import("../layout")),
      // redirect: `${element.path}/index`,
      children: [
        {
          id: `${element.menuId}/index`,
          path: `${element.path}/index`,
          Component: component,
        },
      ],
      handle: {
        title: element.menuName,
        icon: element.icon,
        link: element.link,
      },
    };
    arr.push(routerObj);
  });
  firstMenuArr.forEach((element) => {
    const routerObj: RouteObject = {
      id: element.menuId,
      path: element.path,
      Component: lazy(() => import("../layout")),
      // redirect: "",
      children: [],
      handle: {
        title: element.menuName,
        icon: element.icon,
        link: element.link,
      },
    };
    const childMenu = secondMenuArr.filter((x) => x.pId === element.id);
    if (childMenu.length > 0) {
      // routerObj.redirect = childMenu[0].path;
      childMenu.forEach((childElement: IMenu) => {
        if (childElement.link) return;
        // console.log('childElement', childElement.menuName)

        const component = getComponent(childElement);
        const childRouterObj: RouteObject = {
          id: childElement.menuId,
          path: childElement.path,
          Component: component,
          handle: {
            title: childElement.menuName,
            icon: childElement.icon,
            link: childElement.link,
          },
        };
        if (routerObj.children) {
          routerObj.children.push(childRouterObj);
        }
      });
    }
    arr.push(routerObj);
  });
  return arr;
};
export const addRoutes = () => {
  const { permissionMenuList: menuList } = store.getState().user;
  const routerData = formatRouter(menuList);
  console.log("routerData", menuList);
  return routerData;
};
