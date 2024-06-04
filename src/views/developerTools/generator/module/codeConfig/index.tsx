import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import { CodeMirror } from "@ainiteam/quick-react-ui";
import UIConfig from "./UIConfig";
import Backend from "./backend";
import Database from "./database";

const CodeConfig: React.FC = () => {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");

  const form = {
    script: `111`,
  };

  const handleCodeChange = (value: any) => {
    setData1(value);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "前端配置",
      children: <UIConfig value={data1} />,
    },
    {
      key: "2",
      label: "后端配置",
      children: <Backend value={data2}></Backend>,
    },
    {
      key: "3",
      label: "数据库配置",
      children: <Database value={data3}></Database>,
    },
  ];
  const handleChange = (key: string) => {
    console.log(key);
    switch (key) {
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
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange}></Tabs>
    </>
  );
};
export default CodeConfig;
