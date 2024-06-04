import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import QuickRadio from "./components/quickRadio";
import { getDictionaryList } from "@/api/system/dictionary";
import { selectFormat } from "@/utils";
import { IDictionary } from "@/types";

const Database: React.FC = () => {
  const [databaseDic, setDatabaseDic] = useState(null);
  const titleForm = {
    title1: "类型",
  };

  const databaseData = [
    {
      label: "sqlserver",
      value: 0,
      explain: `Vue2-JS：一套构建数据驱动的 web 界面的渐进式框架。
      与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。
      只关注视图层，非常容易与其它库或已有项目整合。`,
    },
    {
      label: "mysql",
      value: 1,
    },
    {
      label: "oracle",
      value: 2,
      explain: `React：一个由Facebook开发的非MVC模式的框架,主要用于构建用户界面。
      它采用虚拟DOM和组件化开发模式，支持JSX，适合构建单页应用程序和交互式界面。
      它允许你创建一个可复用的UI组件，Facebook和Instagram的用户界面就是用ReactJS开发的。 `,
    },
  ];
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
  }, [databaseDic]);
  return (
    <>
      <Divider orientation="left">{titleForm.title1}</Divider>
      <QuickRadio data={databaseDic} value="sqlserver"></QuickRadio>
    </>
  );
};
export default Database;
