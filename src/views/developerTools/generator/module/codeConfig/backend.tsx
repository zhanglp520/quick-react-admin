import { IFormItem, Form as QuickForm } from "@ainiteam/quick-react-ui";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { getDictionaryList } from "@/api/system/dictionary";
import { selectFormat } from "@/utils";

interface IBackend {
  id?: number;
  framework: string;
  backendLang?: string;
  designPattern: string;
}

const Backend: React.FC = () => {
  const [backendLangDic, setBackendLangDic] = useState(null);
  const [backendFrameworkDic, setBackendFrameworkDic] = useState(null);
  const form: IBackend = {
    id: undefined,
    framework: "c#",
    backendLang: "springboot",
    designPattern: "",
  };
  const dialogData = [
    {
      label: "开发中",
      value: 0,
    },
  ];
  const formItems: IFormItem[] = [
    {
      label: "后端框架",
      labelWidth: "120px",
      vModel: "framework",
      prop: "framework",
      type: "radio",
      options: backendLangDic,
      change: () => {},
    },
    {
      label: "后端语言",
      labelWidth: "120px",
      vModel: "backendLang",
      prop: "backendLang",
      type: "radio",
      options: backendFrameworkDic,
      change: () => {},
    },
    {
      label: "设计模式",
      labelWidth: "120px",
      vModel: "designPattern",
      prop: "designPattern",
      type: "radio",
      options: dialogData,
      change: () => {},
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
    getDictionaryList("backend_lang").then((res) => {
      const { data: dictionaryList } = res;
      console.log("list_template-dictionaryList", dictionaryList);
      const dataList = selectFormat(dictionaryList, {
        label: "dicName",
        value: "dicId",
      });
      setBackendLangDic([...dataList]);
    });
    getDictionaryList("backend_framework").then((res) => {
      const { data: dictionaryList } = res;
      console.log("form_template-dictionaryList", dictionaryList);
      const dataList = selectFormat(dictionaryList, {
        label: "dicName",
        value: "dicId",
      });
      setBackendFrameworkDic([...dataList]);
    });
  };
  useEffect(() => {
    loadDicData();
  }, [backendLangDic, backendFrameworkDic]);
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
export default Backend;
