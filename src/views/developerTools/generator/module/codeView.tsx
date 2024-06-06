import { Tabs } from "antd";
import { useState } from "react";
import { CodeMirror } from "@ainiteam/quick-react-ui";
import "./index.less";

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

  const handleCodeChange = (value: any) => {
    setData1(value);
  };
  const arr = [
    {
      id: 0,
      label: "index.tsx",
      data: `  return (
        <div>
          <Crud
            dialogTitle={dialogTitle}
            formModel={formModel}
            formItems={formItems}
            tableData={tableDataList}
            tableColumns={tableColumns}
            tableActionbar={tableActionbar}
            tableToolbar={tableToolbar}
            searchFormItems={searchFormItems}
            searchFormModel={searchForm}
            pagebar={page}
            loading={loading}
            rowEdit={true}
            displayNumber={true}
            onLoad={loadData}
            onFormSubmit={handleFormSubmit}
            onDelete={handleDelete}
            onBatchDelete={handleBatchDelete}
            onImport={handleImport}
            onExport={handleExport}
            onPrint={handlePrint}
          ></Crud>
        </div>
      );`,
    },
    {
      id: 1,
      label: "api.ts",
      data: "console.log(222)",
    },
  ];

  const handleChange = (key: string) => {
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
      <Tabs
        defaultActiveKey="1"
        onChange={handleChange}
        items={arr.map((item) => {
          const { id, label, data } = item;
          return {
            key: id,
            label: label,
            children: <CodeMirror value={data} onChange={handleCodeChange} />,
          };
        })}
      ></Tabs>
    </>
  );
};
export default CodeView;
