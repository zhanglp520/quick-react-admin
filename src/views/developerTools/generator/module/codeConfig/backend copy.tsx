import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import QuickRadio from "./components/quickRadio";
import { getDictionaryList } from "@/api/system/dictionary";
import { selectFormat } from "@/utils";
const Backend: React.FC = () => {
  const [backendLangDic, setBackendLangDic] = useState(null);
  const [backendFrameworkDic, setBackendFrameworkDic] = useState(null);

  const titleForm = {
    title1: "后端框架",
    title2: "后端语言",
    title3: "设计模式",
  };
  const frameworkData = [
    {
      label: "c#",
      value: 0,
      explain: `Vue2-JS：一套构建数据驱动的 web 界面的渐进式框架。
      与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。
      只关注视图层，非常容易与其它库或已有项目整合。`,
    },
    {
      label: "java",
      value: 1,
    },
    {
      label: "nodejs",
      value: 2,
      explain: `React：一个由Facebook开发的非MVC模式的框架,主要用于构建用户界面。
      它采用虚拟DOM和组件化开发模式，支持JSX，适合构建单页应用程序和交互式界面。
      它允许你创建一个可复用的UI组件，Facebook和Instagram的用户界面就是用ReactJS开发的。 `,
    },
    {
      label: "python",
      value: 4,
      explain: `AngularJS：早期版本的Angular，现在已被Angular取代，但仍然广泛使用于维护现有AngularJS项目。`,
    },
  ];
  const listData = [
    {
      label: "springboot",
      value: 0,
    },
    {
      label: "microservices（微服务）",
      value: 1,
    },
  ];
  const dialogData = [
    {
      label: "开发中",
      value: 0,
    },
  ];
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
    <>
      <Divider orientation="left">{titleForm.title1}</Divider>
      <QuickRadio data={backendLangDic} value="c#"></QuickRadio>
      <Divider orientation="left">{titleForm.title2}</Divider>
      <QuickRadio data={backendFrameworkDic} value="springboot"></QuickRadio>
      <Divider orientation="left">{titleForm.title3}</Divider>
      <QuickRadio data={dialogData} value=""></QuickRadio>
    </>
  );
};
export default Backend;
