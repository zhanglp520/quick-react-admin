import { useSelector } from "react-redux";
import { RouteObject } from "react-router-dom";
import { IMenu } from "@/types";
import { Suspense, lazy } from "react";
import staticRouter from "./staticRouter";

const getElement = (path: string) => {
  console.log('path',path);
  
  const Element = lazy(() => import(`../${path}`));
  return (
    <Suspense fallback={<div>loading</div>}>
      <Element />
    </Suspense>
  );
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
    const routerObj: RouteObject = {
      path: element.path,
      element: getElement(`Layout`),
      // redirect: `${element.path}/index`,
      children: [
        {
          path: `${element.path}/index`,
          element: getElement(`layout${element.path}`),
        },
      ],
      // meta: {
      //   title: element.menuName,
      //   icon: element.icon,
      //   link: element.link,
      // },
    };
    arr.push(routerObj);
  });
  firstMenuArr.forEach((element) => {
    const routerObj: RouteObject = {
      path: element.path,
      element: getElement(`Layout`),
      // redirect: "",
      children: [],
      // meta: {
      //   title: element.menuName,
      //   icon: element.icon,
      //   link: element.link,
      // },
    };
    const childMenu = secondMenuArr.filter((x) => x.pId === element.id);
    if (childMenu.length > 0) {
      childMenu.forEach((childElement: IMenu) => {
        if (childElement.link) return;
        // console.log('childElement', childElement.menuName)
        const childRouterObj: RouteObject = {
          path: childElement.path,
          element: getElement(`views${element.path}`),
          // meta: {
          //   title: childElement.menuName,
          //   icon: childElement.icon,
          //   link: childElement.link,
          // },
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { permissionMenuList: menuList } = useSelector(
    (state: RootState) => state.user
  );
  console.log('menuList',menuList);
  const routerData = formatRouter(menuList);
  staticRouter[0].children=routerData
  console.log("routerData", routerData);
  return staticRouter;
};
