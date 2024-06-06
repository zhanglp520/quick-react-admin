import { Tabs } from "antd";
import type { TabsProps } from "antd";
import UIConfig from "./UIConfig";
import Backend from "./backend";
// import Database from "./database";
import BasicConfig from "./basicConfig";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CodeConfig: React.FC = (props: any, ref) => {
  const basicConfigRef = useRef(null);
  const UIConfigRef = useRef(null);
  const backendRef = useRef(null);

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
  const callChildMethod = () => {
    const form = {
      basicConfig: { author: "土豆哥", folderName: "tudouge" },
      uiConfig: {
        frameworkType: "react-ts",
        listType: "table_list",
        isDialog: "0",
        formType: "basic_form",
      },
      backEndConfig: {
        framework: "springboot",
        backendLang: "nodejs",
        designPattern: "",
      },
    };

    if (basicConfigRef.current) {
      form.basicConfig = basicConfigRef.current.form;
    }
    if (UIConfigRef.current) {
      form.uiConfig = UIConfigRef.current.form;
    }
    if (backendRef.current) {
      form.backEndConfig = backendRef.current.form;
    }
    // if (databaseRef.current) {
    //   const dt4 = databaseRef.current.form;
    //   setDBdata({ ...dt4 });
    // }

    return form;
  };
  useImperativeHandle(ref, () => {
    return {
      callChildMethod,
    };
  });
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "基础配置",
      children: <BasicConfig ref={basicConfigRef} />,
    },
    {
      key: "1",
      label: "前端配置",
      children: <UIConfig ref={UIConfigRef} />,
    },
    {
      key: "2",
      label: "后端配置",
      children: <Backend ref={backendRef} />,
    },
    // {
    //   key: "3",
    //   label: "数据库配置",
    //   children: <Database ref={databaseRef} />,
    // },
  ];
  return (
    <>
      <Tabs defaultActiveKey="0" items={items} onChange={handleChange}></Tabs>
    </>
  );
};
export default forwardRef(CodeConfig);
