import { IFormItem, Form as QuickForm } from "@ainiteam/quick-react-ui";
import { Form } from "antd";
import React from "react";

interface IBasicConfig {
  id?: number;
  author: string;
  folderName: string;
  radioValue: string;
}

const BasicConfig: React.FC = () => {
  const form: IBasicConfig = {
    id: undefined,
    author: "",
    folderName: "",
    radioValue: "1",
  };
  const formItems: IFormItem[] = [
    {
      label: "作者",
      labelWidth: "120px",
      vModel: "author",
      editReadonly: true,
      placeholder: "请输入作者",
      prop: "author",
      type: "input",
      change: (e) => {
        form.author = e.target.value;
      },
    },
    {
      label: "文件夹",
      labelWidth: "120px",
      vModel: "folderName",
      editReadonly: true,
      placeholder: "请输入文件夹名称",
      prop: "folderName",
      type: "input",
      change: (e) => {
        form.folderName = e.target.value;
      },
    },
  ];
  const handleSubmit = (value: any) => {
    console.log("handleSubmit", form, value);
  };
  const handleClear = () => {
    Object.keys(form).forEach((key) => {
      form[key] = "";
    });
    console.log("handleClear", form);
  };
  const handleError = (errInfo: any) => {
    console.log("handleError", errInfo);
  };
  const [formInstance] = Form.useForm();
  return (
    <QuickForm
      form={formInstance}
      model={form}
      formItems={formItems}
      hiddenAction={true}
      onSubmit={handleSubmit}
      onError={handleError}
      onReset={handleClear}
    ></QuickForm>
  );
};
export default BasicConfig;
