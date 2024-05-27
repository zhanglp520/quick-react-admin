import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { ITab } from "@/types";
import { setCollapse } from "@/store/modules/app";
import { AppDispatch, RootState } from "@/store";
import { addTab } from "@/store/modules/tab";
import AiniTheme from "../AiniTheme";

const AiniTop: FC = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { tabList } = useSelector((state: RootState) => state.tab);
  const { collapsed } = useSelector((state: RootState) => state.app);
  const [themeVisible, setThemeVisible] = useState(false);
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
    if (tabList.length >= 13) {
      message.warning("选项卡最多13个，请关闭部分再试");
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
    if (tabList.length >= 13) {
      message.warning("选项卡最多13个，请关闭部分再试");
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

  const handleSearch = () => {};
  const handleOpenChat = () => {};
  const handleFunllScreen = () => {};
  const handlePhone = () => {};
  const handleSetting = () => {
    setThemeVisible(true);
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
        <Button
          type="text"
          icon={<SearchOutlined />}
          className="btn"
          onClick={handleSearch}
        />
        <Button
          type="text"
          icon={<WechatOutlined />}
          className="btn"
          onClick={handleOpenChat}
        />
        <Button
          type="text"
          icon={<FullscreenOutlined />}
          className="btn"
          onClick={handleFunllScreen}
        />
        <Button
          type="text"
          icon={<PhoneOutlined />}
          className="btn"
          onClick={handlePhone}
        />
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
        <Button
          type="text"
          icon={<SettingOutlined />}
          className="btn"
          onClick={handleSetting}
        />
      </div>
      {themeVisible && (
        <AiniTheme
          themeVisible={themeVisible}
          onClose={() => {
            setThemeVisible(false);
          }}
        ></AiniTheme>
      )}
    </div>
  );
};

export default AiniTop;
