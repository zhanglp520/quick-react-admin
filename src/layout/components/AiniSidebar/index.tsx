import { IMenubar, ITab } from "@/types";
import "./index.less";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setActiveTab } from "@/store/modules/tab";
import logo from "@/assets/react.svg";
import AiniMenu from "../AiniMenu";

const AiniSideBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title] = useState("quick-react-admin");
  const { collapsed } = useSelector((state: RootState) => state.app);
  const goHome = () => {
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
    const { id, menuName, path } = menu;
    const tab: ITab = {
      id: id?.toString(),
      name: menuName,
      path,
    };
    dispatch(setActiveTab(tab));
  };
  let comm;
  if (!collapsed) {
    comm = <h5>{title}</h5>;
  }
  return (
    <div className="aini-sidebar">
      <div className="aini-title" onClick={goHome}>
        <img src={logo} />
        {comm}
      </div>
      <AiniMenu collapsed={collapsed}></AiniMenu>
    </div>
  );
};

export default AiniSideBar;
