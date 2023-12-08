import { IFormItem } from "@ainiteam/quick-vue3-ui";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import './index.less'

type PropType = {
  formItem: IFormItem;
};
const AiniFormItem: React.FC<PropType> = (props: PropType) => {
  const { formItem } = props;
  const getFormItem = (item: IFormItem) => {
    if (item.type === "password") {
      return <Input.Password placeholder="请输入密码" />;
    } else if (item.type === "radio") {
      return <Radio value="apple"> Apple </Radio>;
    } else if (item.type === "number") {
      return <InputNumber />;
    } else if (item.type === "checkbox") {
      return (
        <Checkbox
        // checked={componentDisabled}
        // onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox>
      );
    } else if (item.type === "select") {
      return (
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      );
    } else if (item.type === "switch") {
      return <Switch />;
    } else if (item.type === "datetime") {
      return <DatePicker />;
    } else if (item.type === "treeselect") {
      return (
        <TreeSelect
          treeData={[
            {
              title: "Light",
              value: "light",
              children: [{ title: "Bamboo", value: "bamboo" }],
            },
          ]}
        />
      );
    } else if (item.type === "textarea") {
      return <TextArea rows={4} />;
    } else {
      return <Input placeholder="请输入用户编号" />;
    }
  };

  return (
    <Form.Item<FieldType>
      label={formItem.label}
      name={formItem.vModel}
      rules={formItem.rules}
    >
      {getFormItem(formItem)}
    </Form.Item>
  );
};

export default AiniFormItem;
