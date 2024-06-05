import { IFormItem, Form as QuickForm } from "@ainiteam/quick-react-ui";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { getDictionaryList } from "@/api/system/dictionary";
import { selectFormat } from "@/utils";

interface IDatabase {
  id?: number;
  databaseType: string;
  address?: string;
  port: string;
  databaseName: string;
  accountNumber: string;
  password?: string;
}

const Database: React.FC = () => {
  const [databaseDic, setDatabaseDic] = useState(null);

  const form: IDatabase = {
    id: undefined,
    databaseType: "sqlserver",
    address: "",
    port: "",
    databaseName: "",
    accountNumber: "",
    password: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "数据库类型",
      labelWidth: "120px",
      vModel: "databaseType",
      prop: "databaseType",
      type: "radio",
      options: databaseDic,
      change: (e) => {
        form.databaseType = e.target.value;
      },
    },
    {
      label: "地址",
      labelWidth: "120px",
      vModel: "address",
      editReadonly: true,
      placeholder: "请输入",
      prop: "address",
      type: "input",
    },
    {
      label: "端口",
      labelWidth: "120px",
      vModel: "port",
      editReadonly: true,
      placeholder: "请输入",
      prop: "port",
      type: "input",
    },
    {
      label: "数据库名称",
      labelWidth: "120px",
      vModel: "databaseName",
      editReadonly: true,
      placeholder: "请输入",
      prop: "databaseName",
      type: "input",
    },
    {
      label: "账号",
      labelWidth: "120px",
      vModel: "accountNumber",
      editReadonly: true,
      placeholder: "请输入",
      prop: "accountNumber",
      type: "input",
    },
    {
      label: "密码",
      labelWidth: "120px",
      vModel: "password",
      editReadonly: true,
      placeholder: "请输入",
      prop: "password",
      type: "input",
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
  const loadDicData = () => {
    getDictionaryList("database_type").then((res) => {
      const { data: dictionaryList } = res;
      console.log("database_type-dictionaryList", dictionaryList);
      const dataList = selectFormat(dictionaryList, {
        label: "dicName",
        value: "dicId",
      });
      setDatabaseDic([...dataList]);
    });
  };
  useEffect(() => {
    loadDicData();
  }, []);
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
export default Database;
