import { IFormItem, Form as QuickForm } from "@ainiteam/quick-react-ui";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { getDictionaryList } from "@/api/system/dictionary";
import { selectFormat } from "@/utils";

interface IUIConfig {
  id?: number;
  frameworkType: string;
  listType?: string;
  isDialog: string;
  formType: string;
}

const UIConfig: React.FC = () => {
  const [formInstance] = Form.useForm();
  const [frameworkTemplateDic, setFrameworkTemplateDic] = useState(null);
  const [listTemplateDic, setListTemplateDic] = useState(null);
  const [formTemplateDic, setFormTemplateDic] = useState(null);
  const form: IUIConfig = {
    id: undefined,
    frameworkType: "vue",
    listType: "tree_table",
    isDialog: "0",
    formType: "parant_child",
  };
  const frameworkData = [
    {
      label: "Vue2-JS",
      value: 0,
      explain: `Vue2-JS：一套构建数据驱动的 web 界面的渐进式框架。
      与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。
      只关注视图层，非常容易与其它库或已有项目整合。`,
    },
    {
      label: "Vue3-TS",
      value: 1,
    },
    {
      label: "React",
      value: 2,
      explain: `React：一个由Facebook开发的非MVC模式的框架,主要用于构建用户界面。
      它采用虚拟DOM和组件化开发模式，支持JSX，适合构建单页应用程序和交互式界面。
      它允许你创建一个可复用的UI组件，Facebook和Instagram的用户界面就是用ReactJS开发的。 `,
    },
    {
      label: "AngularJS",
      value: 4,
      explain: `AngularJS：早期版本的Angular，现在已被Angular取代，但仍然广泛使用于维护现有AngularJS项目。`,
    },
    {
      label: "Angular",
      value: 3,
      explain: `Angular：由Google开发，基于TypeScript，采用MVC架构。
      它支持双向数据绑定和模块化开发，适合构建大型、复杂的Web应用程序。`,
    },
    {
      label: "Ember.js",
      value: 5,
      explain: `Ember.js：一个全功能的JavaScript框架，用于构建大型、复杂的Web应用程序。
      它强调约定优于配置，提供了一整套工具和最佳实践。`,
    },
    {
      label: "jQuery",
      value: 6,
      explain: `jQuery：一个流行的JavaScript库，简化了DOM操作和事件处理。
      它提供了丰富的选择器和实用工具函数，常用于处理低级别的浏览器兼容性问题。`,
    },
    {
      label: "Bootstrap",
      value: 7,
      explain: `Bootstrap：用于快速开发 Web 应用程序和网站的前端框架。
      用于开发响应式布局、移动设备优先的 WEB 项目。
      是基于HTML5和CSS3开发的，并在jQuery框架的基础上进行了更为个性化的完善。
      形成一套自己独有的网站风格，并兼容大部分jQuery插件。
      包含了丰富的Ｗｅｂ组件（下拉框，按钮，导航，分页，排版，缩略图等）。`,
    },
    {
      label: "Foundation",
      value: 8,
      explain: `Foundation：是一款开源的前端框架，可以使用它快速创建页面原型。
      相比于其他同类型工具，Foundation的移动化方案更加出色；借鉴响应式Web 设计的思路和方法。
      Foundation 对内容结构在不同类型设备中的的呈现方式进行了相应的预设。
      也就是说这货是为当前移动互联网而生的，更多是对付日益多样的移动设备。
      Foundation是在国外比较流行在国内的使用就比较少，在兼容上Foundation在Foundation4就已经放弃了IE8的支持。
      这点可能也是在国内使用者少的原因之一，Foundation在js库中使用的是Zepto（就是轻量级的JQuery）。
      Foundation4就已经把mobile first放在首要开发。`,
    },
  ];
  const dialogData = [
    {
      label: "是",
      value: "0",
    },
    {
      label: "否",
      value: "1",
    },
  ];
  const formItems: IFormItem[] = [
    {
      label: "前端框架",
      labelWidth: "120px",
      vModel: "frameworkType",
      prop: "frameworkType",
      type: "radio",
      options: frameworkTemplateDic,
      change: (e) => {
        form.frameworkType = e.target.value;
      },
    },
    {
      label: "列表模板",
      labelWidth: "120px",
      vModel: "listType",
      prop: "listType",
      type: "radio",
      options: listTemplateDic,
      change: (e) => {
        form.listType = e.target.value;
      },
    },
    {
      label: "表单弹窗",
      labelWidth: "120px",
      vModel: "isDialog",
      prop: "isDialog",
      type: "radio",
      options: dialogData,
      change: (e) => {
        form.isDialog = e.target.value;
      },
    },
    {
      label: "表单模板",
      labelWidth: "120px",
      vModel: "formType",
      prop: "formType",
      type: "radio",
      options: formTemplateDic,
      change: (e) => {
        form.formType = e.target.value;
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

  const loadDicData = () => {
    getDictionaryList("framework_template").then((res) => {
      const { data: dictionaryList } = res;
      console.log("framework_template-dictionaryList", dictionaryList);
      const dataList = selectFormat(dictionaryList, {
        label: "dicName",
        value: "dicId",
      });
      setFrameworkTemplateDic([...dataList]);
    });
    getDictionaryList("list_template").then((res) => {
      const { data: dictionaryList } = res;
      console.log("list_template-dictionaryList", dictionaryList);
      const dataList = selectFormat(dictionaryList, {
        label: "dicName",
        value: "dicId",
      });
      setListTemplateDic([...dataList]);
    });
    getDictionaryList("form_template").then((res) => {
      const { data: dictionaryList } = res;
      console.log("form_template-dictionaryList", dictionaryList);
      const dataList = selectFormat(dictionaryList, {
        label: "dicName",
        value: "dicId",
      });
      setFormTemplateDic([...dataList]);
    });
  };
  useEffect(() => {
    loadDicData();
  }, []);
  return (
    <QuickForm
      style={{ width: "100%" }}
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
export default UIConfig;
