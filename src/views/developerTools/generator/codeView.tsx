import CodeMirror from "@/components/CodeMirror";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";

const CodeView: React.FC = () => {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");
  const [data6, setData6] = useState("");
  const form = {
    script: `
    /**
* 功能模块：用户控制器类
* 作者：zhanglp
* 创建时间:2023-11-05 14:56:45
*/
import { BaseController } from '../base/base.controller';
import { UserVO } from './user.vo';
import { UserService } from './user.service';

export class UserController extends BaseController<UserVo> {
    constructor() {
        super();
        this.server = new UserService()
    }
}
    `,
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "entity",
      children: <CodeMirror itemData={data1} />,
    },
    {
      key: "2",
      label: "vo",
      children: <CodeMirror itemData={data2} />,
    },
    {
      key: "3",
      label: "dto",
      children: <CodeMirror itemData={data3} />,
    },
    {
      key: "4",
      label: "repository",
      children: <CodeMirror itemData={data4} />,
    },
    {
      key: "5",
      label: "server",
      children: <CodeMirror itemData={data5} />,
    },
    {
      key: "6",
      label: "controller",
      children: <CodeMirror itemData={data6} />,
    },
  ];
  const handleClick = (key: string) => {
    console.log(key);
    switch (key) {
      case "1":
        setData1(form.script);
        break;
      case "2":
        setData2(form.script);
        break;
      case "3":
        setData3(form.script);
        break;
      case "4":
        setData4(form.script);
        break;
      case "5":
        setData5(form.script);
        break;
      case "6":
        setData6(form.script);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={handleClick}></Tabs>
    </>
  );
};
export default CodeView;
