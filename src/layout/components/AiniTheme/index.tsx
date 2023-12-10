import { Drawer, Form } from "antd";
import "./index.less";
import AiniForm from "@/components/QuickForm";
import { IFormItem } from "@ainiteam/quick-vue3-ui";

type PropType = {
  themeVisible: boolean;
  onClose: any;
};
const langOptions = [
  {
      label: "英文",
      value: "en"
  },
  {
      label: "中文",
      value: "zh-cn"
  }
];
const sizeOptions = [
  {
      label: "大",
      value: "large"
  },
  {
      label: "中",
      value: "default"
  },{
    label: "小",
    value: "small"
}
];
const modelOptions = [
  {
      label: "亮色",
      value: "light"
  },
  {
      label: "暗色",
      value: "dark"
  }
];

const themeColorOptions = [
  {
      label: "quick",
      value: {
          default: "#fff",
          primary: "#0000FF",
          success: "#00FF00",
          info: "#909399",
          warning: "#FFFF00",
          danger: "#FF0000"
      }
  },
  {
      label: "element",
      value: {
          default: "#fff",
          primary: "#66b1ff",
          success: "#67c23a",
          info: "#909399",
          warning: "#e6a23c",
          danger: "#f56c6c"
      }
  },
  {
      label: "ant",
      value: {
          default: "#fff",
          primary: "#1890ff",
          success: "#52c41a",
          info: "rgba(0, 0, 0, 0.25)",
          warning: "#faad14",
          danger: "#f5222d"
      }
  },
  {
      label: "layui",
      value: {
          default: "#fff",
          primary: "#16baaa",
          success: "#16b777",
          info: "#31bdec",
          warning: "#ffb800",
          danger: "#ff5722"
      }
  }
];
const themeOptions = [
  {
      label: "quick主题",
      value: "quick"
  },
  {
      label: "element主题",
      value: "element"
  },
  {
      label: "ant主题",
      value: "ant"
  },
  {
      label: "layui主题",
      value: "layui"
  },
  {
      label: "自定义主题",
      value: "custom"
  }
];
const bgthemeOptions = [
  {
      label: "政务蓝",
      value: "rgb(41,23,91)"
  },
  {
      label: "中国红",
      value: "rgb(255,0,0)"
  }
];

const AiniTheme: React.FC<PropType> = (props: PropType) => {
  const { themeVisible, onClose } = props;
  const [form] = Form.useForm();
  const formModel: any = {
    lang: "en",
    zIndex: 1000, //>=3000时，官方bug
    namespace: "el",
    size: "default",
    model: "light",
    // button: {
    //   autoInsertSpace: false
    // },
    // message: {
    //   max: 10
    // },
    theme: "element",
    defaultColor: "#fff",
    primaryColor: "#66b1ff",
    successColor: "#67c23a",
    infoColor: "#909399",
    warningColor: "#e6a23c",
    dangerColor: "#f56c6c",
    bgColor: "rgb(41,23,91)"
  };
  const formItems: IFormItem[] = [
    {
      label: "语言",
      labelWidth: "80px",
      vModel: "lang",
      editReadonly: true,
      placeholder: "请选择语言",
      prop: "lang",
      type: "select",
      options:langOptions,
    },
    {
      label: "大小",
      labelWidth: "80px",
      vModel: "size",
      placeholder: "请选择大小",
      prop: "size",
      type: "radioGroup",
      options:sizeOptions,
    },
    {
      label: "暗黑模式",
      labelWidth: "80px",
      vModel: "model",
      placeholder: "请选择暗黑模式",
      prop: "model",
      type: "radioGroup",
      options:modelOptions,
    },
    {
      label: "主题",
      labelWidth: "80px",
      vModel: "theme",
      placeholder: "请选择暗主题",
      prop: "theme",
      type: "select",
      options:themeOptions,
    },
    {
      label: "默认颜色",
      labelWidth: "80px",
      vModel: "defaultColor",
      placeholder: "请选择默认颜色",
      prop: "defaultColor",
      type:"color",
    },
    {
      label: "主要颜色",
      labelWidth: "80px",
      vModel: "primaryColor",
      placeholder: "请选择主要颜色",
      prop: "primaryColor",
      type:"color",
    },
    {
      label: "成功颜色",
      labelWidth: "80px",
      vModel: "successColor",
      placeholder: "请选择成功颜色",
      prop: "successColor",
      type:"color",
    },
    {
      label: "信息颜色",
      labelWidth: "80px",
      vModel: "infoColor",
      placeholder: "请选择成功颜色",
      prop: "infoColor",
      type:"color",
    },
    {
      label: "警告颜色",
      labelWidth: "80px",
      vModel: "warningColor",
      placeholder: "请选择警告颜色",
      prop: "warningColor",
      type:"color",
    },
    {
      label: "危险颜色",
      labelWidth: "80px",
      vModel: "dangerColor",
      placeholder: "请选择危险颜色",
      prop: "dangerColor",
      type:"color",
    },
    {
      label: "皮肤",
      labelWidth: "80px",
      vModel: "bgColor",
      placeholder: "请选择皮肤",
      type: "select",
      options:bgthemeOptions,
      prop: "bgColor",
    },
  ];
  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      Object.keys(values).forEach((key) => {
        formModel[key] = values[key];
      });
      // onFormSubmit(formModel, () => {
      //   setIsModalOpen(false);
      //   refresh();
      // });
    });
  };
  return (
    <div>
      <Drawer
        title="系统配置"
        placement="right"
        width={500}
        onClose={onClose}
        open={themeVisible}
      >
        <AiniForm
          form={form}
          model={formModel}
          formItems={formItems}
          hiddenAction={true}
          onSubmit={handleFormSubmit}
        ></AiniForm>
      </Drawer>
    </div>
  );
};

export default AiniTheme;
