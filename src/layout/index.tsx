import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout as ALayout, Button, Tabs, Tooltip, theme } from "antd";

import AiniSidebar from "./components/AiniSidebar";
import AiniTop from "./components/AiniTop";
import { AppDispatch, RootState } from "@/store";
import { ITab } from "@/types";
import { deleteTab, setActiveTab, clear } from "@/store/modules/tab";
import { setActiveMenuId, clear as clearMenu } from "@/store/modules/menu";
import "./index.less";
import { CloseOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = ALayout;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
type TabItemType = {
  key: string;
  label: string;
  path: string;
};

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { tabList, activeTab } = useSelector((state: RootState) => state.tab);
  const { collapsed } = useSelector((state: RootState) => state.app);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [activeKey, setActiveKey] = useState(
    activeTab.id ? activeTab.id : "home"
  );
  const items: TabItemType[] = [];
  tabList.forEach((tab: ITab) => {
    items.push({
      key: tab.id!,
      label: tab.name!,
      path: tab.path!,
    });
  });
  console.log("items", items);

  useEffect(() => {
    if (activeTab) {
      console.log("activeTab-监听", activeTab);
      const { id, path } = activeTab;
      if (id) {
        setActiveKey(id);
      }
    }
  }, [activeTab]);

  const handleTabsEdit = (
    targetKey: TargetKey,
    action: "add" | "remove"
  ): void => {
    if (action === "remove") {
      if (targetKey && targetKey !== "home") {
        const index = items.findIndex((x) => x.key === targetKey);
        const tab = items[index + 1] || items[index - 1];
        navigate(tab.path!);
        dispatch(deleteTab(targetKey.toString()));
      }
    }
  };
  const handleClick = (key: string) => {
    const index = tabList.findIndex((x) => x.id === key);
    if (index !== -1) {
      const tab = tabList[index];
      dispatch(setActiveTab(tab));
      dispatch(setActiveMenuId(key.toString()));
      setActiveKey(key.toString());
      navigate(tab.path!);
    }
  };
  const closeAll = () => {
    dispatch(clear());
    dispatch(clearMenu());
    setActiveKey("home");
    navigate("/home");
  };
  return (
    <div className="aini-layout">
      <ALayout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <AiniSidebar></AiniSidebar>
        </Sider>
        <ALayout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              boxShadow: "0px 1px 6px 1px #80808069",
            }}
          >
            <AiniTop></AiniTop>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              boxShadow: "0px 3px 4px 3px #80808069",
            }}
          >
            <Tabs
              hideAdd
              type="editable-card"
              activeKey={activeKey}
              items={items}
              onEdit={handleTabsEdit}
              onChange={handleClick}
            />
            <Tooltip title="关闭全部">
              <Button
                style={{ position: "absolute", top: "110px", right: "45px" }}
                icon={<CloseOutlined />}
                onClick={closeAll}
              ></Button>
            </Tooltip>

            <Outlet />
          </Content>
        </ALayout>
      </ALayout>
    </div>
  );
};

export default Layout;
