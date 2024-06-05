import { Tabs } from "antd";
import type { TabsProps } from "antd";
import UIConfig from "./UIConfig";
import Backend from "./backend";
import Database from "./database";
import BasicConfig from "./basicConfig";
import { useRef } from "react";

const CodeConfig: React.FC = () => {
  const basicConfigRef = useRef(null);
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "基础配置",
      children: <BasicConfig ref={basicConfigRef} />,
    },
    {
      key: "1",
      label: "前端配置",
      children: <UIConfig />,
    },
    {
      key: "2",
      label: "后端配置",
      children: <Backend></Backend>,
    },
    {
      key: "3",
      label: "数据库配置",
      children: <Database></Database>,
    },
  ];
  const handleChange = (key: string) => {
    console.log(key);
    switch (key) {
      case "0":
        break;
      case "1":
        break;
      case "2":
        break;
      case "3":
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Tabs defaultActiveKey="0" items={items} onChange={handleChange}></Tabs>
    </>
  );
};
export default CodeConfig;
