// import { useState } from "react";
import {
  Button,
  Dropdown,
  Space,
  message,
  Avatar,
  MenuProps,
  Modal,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  WechatOutlined,
  FullscreenOutlined,
  PhoneOutlined,
  DownOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.less";
import { useDispatch, useSelector } from "react-redux";
import { setCollapse } from "@/store/modules/app";
import { AppDispatch, RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { ITab } from "@/types";
import { addTab } from "@/store/modules/tab";

const AiniTop: React.FC = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { tabList } = useSelector((state: RootState) => state.tab);
  const { collapsed } = useSelector((state: RootState) => state.app);
  const loginOut = () => {
    confirm({
      title: "警告",
      // icon: <ExclamationCircleFilled />,
      content: "你真的要退出系统吗?",
      onOk() {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      },
    });
  };
  const personalInfo = () => {
    const tab: ITab = {
      id: "PersonalInfo",
      name: "个人资料",
      path: "/personalInfo",
    };
    if (tabList.length >= 15) {
      message.warning("选项卡最多15个，请关闭部分再试");
      return;
    }
    dispatch(addTab(tab));
    navigate("/personalInfo");
  };
  const changePassword = () => {
    const tab: ITab = {
      id: "ChangePassword",
      name: "修改密码",
      path: "/changePassword",
    };
    if (tabList.length >= 15) {
      message.warning("选项卡最多15个，请关闭部分再试");
      return;
    }
    dispatch(addTab(tab));
    navigate("/changePassword");
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "loginOut":
        loginOut();
        break;
      case "personalInfo":
        personalInfo();
        break;
      case "changePassword":
        changePassword();
        break;
      default:
        break;
    }
  };
  const handleSetting = () => {
    // themeVisible.value = true;
    // testInput.value = "11111111";
  };
  const handleCollapse = () => {
    dispatch(setCollapse(!collapsed));
  };
  const items: MenuProps["items"] = [
    {
      label: "个人资料",
      key: "personalInfo",
    },
    {
      label: "修改密码",
      key: "changePassword",
    },
    {
      label: "退出",
      key: "loginOut",
    },
  ];

  return (
    <div className="aini-top">
      <div className="left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleCollapse}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div>
          {/* <quick-breadcrumb :data="bredcrumbData"></quick-breadcrumb> */}
        </div>
      </div>
      <div className="right">
        <span className="test">
          <SearchOutlined />
        </span>
        <span className="test">
          <WechatOutlined />
        </span>
        <span className="test">
          <FullscreenOutlined />
        </span>
        <span className="test">
          <PhoneOutlined />
        </span>
        <span className="test">
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size={32} icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
        <span className="test" onClick={handleSetting}>
          <SettingOutlined />
        </span>
      </div>
      {/* <AiniTheme v-model="themeVisible"></AiniTheme> */}
    </div>
  );
};

export default AiniTop;
