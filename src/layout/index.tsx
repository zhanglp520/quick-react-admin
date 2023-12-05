import React, { useEffect, useRef, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tabs } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.less";
import AiniSidebar from "./components/AiniSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ITab } from "@/types";
import { deleteTab, setActiveTab } from "@/store/modules/tab";
import { setActiveMenuId } from "@/store/modules/menu";

const { Header, Sider, Content } = Layout;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
type TabItemType = {
  key: string;
  label: string;
  path: string;
};

const Layout1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { tabList, activeTab } = useSelector((state: RootState) => state.tab);
  const [collapsed, setCollapsed] = useState(false);
  // const [activeKey, setActiveKey] = useState(
  //   activeTab.id ? activeTab.id : "home"
  // );
  const [activeKey, setActiveKey] = useState("home");
  const [items] = useState<TabItemType[]>([]);

  tabList.forEach((tab: ITab) => {
    items.push({
      key: tab.id!,
      label: tab.name!,
      path: tab.path!,
    });
  });
  const handleTabsEdit = (
    targetKey: TargetKey,
    action: "add" | "remove"
  ): void => {
    if (action === "remove") {
      if (targetKey) {
        dispatch(deleteTab(targetKey.toString()));
      }
    }
  };
  const handleClick = (key: string) => {
    const index = tabList.findIndex((x) => x.id === key);
    if (index !== -1) {
      dispatch(setActiveTab(tabList[index]));
      dispatch(setActiveMenuId(key.toString()));
      setActiveKey(key.toString());
    }
  };
  // const closeAll = () => {
  //   tabStore.clear();
  //   menuStore.clear();
  //   editableTabsValue.value = "home";
  // };

  useEffect(() => {
    if (activeTab) {
      const { id, path } = activeTab;
      if (id) {
        setActiveKey(id);
      }
      if (path) {
        navigate(path);
      }
    }
  }, [activeTab]);
  return (
    <div className="aini-layout">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <AiniSidebar></AiniSidebar>
        </Sider>
        <Layout>
          <Header>{/* <aini-top></aini-top> */}</Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Tabs
              hideAdd
              type="editable-card"
              activeKey={activeKey}
              items={items}
              onEdit={handleTabsEdit}
              onChange={handleClick}
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Layout1;
