import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, message } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { MenuItemType, SubMenuType } from "antd/es/menu/hooks/useItems";
import "./index.less";
import { AppDispatch, RootState } from "@/store";
import { IMenubar, ITab } from "@/types";
import { addTab } from "@/store/modules/tab";

type PropType = {
  collapsed: boolean;
};
type ItemType = MenuItemType | SubMenuType;
const AiniMenu: FC<PropType> = (props: PropType) => {
  console.log("AiniMenu-props", props);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { tabList } = useSelector((state: RootState) => state.tab);
  // const { menuList } = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user);
  let menuList: IMenubar[] = [];
  if (user) {
    menuList = user.menuList;
  }

  // const navigate = useNavigate();
  // const menuClick = (menu: IMenubar) => {
  //   const { id, menuName, path } = menu;
  //   const tab: ITab = {
  //     id: id?.toString(),
  //     name: menuName,
  //     path,
  //   };
  //   dispatch(setActiveTab(tab));
  // };
  const menuClick = (item: IMenubar) => {
    const { id, menuName, path, link, linkUrl } = item;
    if (link) {
      window.open(linkUrl);
    } else {
      const routerPath = path;
      const tab: ITab = {
        id: id?.toString(),
        name: menuName,
        path: routerPath,
      };
      if (tabList.length >= 15) {
        message.warning("选项卡最多15个，请关闭部分再试");
        return;
      }
      dispatch(addTab(tab));
      navigate(tab.path);
    }
  };
  const homeMenuClick = () => {
    const menu: IMenubar = {
      id: "home",
      menuId: "home",
      menuName: "首页",
      icon: "",
      sort: 0,
      pId: 0,
      link: 0,
      path: "/home",
      viewPath: "",
      cache: false,
      children: [],
    };
    menuClick(menu);
  };
  const items: ItemType[] = [];
  items.push({
    key: "home",
    icon: <HomeOutlined />,
    label: "首页",
    onClick: () => {
      homeMenuClick();
    },
  });
  menuList.forEach((menu: IMenubar) => {
    items.push({
      key: menu.menuId,
      icon: <AppstoreOutlined />,
      label: menu.menuName,
      // onClick: ({ domEvent}) => {
      //   domEvent.stopPropagation();
      //   menuClick(menu);
      // },
      children: menu.children.map((child: IMenubar) => {
        return {
          key: child.menuId,
          icon: <AppstoreOutlined />,
          label: child.menuName,
          onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            menuClick(child);
          },
          children:
            child.children.length <= 0
              ? undefined
              : child.children.map((child2: IMenubar) => {
                  return {
                    key: child2.menuId,
                    icon: <AppstoreOutlined />,
                    label: child2.menuName,
                    onClick: ({ domEvent }) => {
                      domEvent.stopPropagation();
                      menuClick(child2);
                    },
                  };
                }),
        };
      }),
    });
  });
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
};

export default AiniMenu;
