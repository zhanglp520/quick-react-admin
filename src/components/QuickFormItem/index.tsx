import { IFormItem } from "@ainiteam/quick-vue3-ui";
import {
  Checkbox,
  ColorPicker,
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
import "./index.less";

export type FormType = "search" | "add" | "edit" | "detail" | "form";
type PropType = {
  model: object;
  formItem: IFormItem;
  formType: FormType;
};
const AiniFormItem: React.FC<PropType> = (props: PropType) => {
  const { model, formItem, formType } = props;
  const isDisable = (item: IFormItem) => {
    if (
      (formType === "add" && item.addDisabled) ||
      (formType === "edit" && (item.editDisabled || item.editReadonly)) ||
      formType === "detail"
    ) {
      return true;
    }
  };
  const getFormItem = (item: IFormItem) => {
    if (item.type === "password") {
      return (
        <Input.Password
          placeholder={item.placeholder}
          disabled={isDisable(item)}
        />
      );
    } else if (item.type === "radio") {
      return <Radio value="apple"> Apple </Radio>;
    } else if (item.type === "radioGroup") {
      return (
        <Radio.Group disabled={isDisable(item)}>
          return (
          {item.options?.map((option: any) => {
            return <Radio value={option.value}>{option.label}</Radio>;
          })}
          );
        </Radio.Group>
      );
    } else if (item.type === "number") {
      return <InputNumber disabled={isDisable(item)} />;
    } else if (item.type === "checkbox") {
      return (
        <Checkbox
          disabled={isDisable(item)}
          // checked={componentDisabled}
          // onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox>
      );
    } else if (item.type === "select") {
      return (
        <Select disabled={isDisable(item)}>
          {item.options?.map((option: any) => {
            return (
              <Select.Option value={option.value}>{option.label}</Select.Option>
            );
          })}
        </Select>
      );
    } else if (item.type === "color") {
      return <ColorPicker showText disabled={isDisable(item)} />;
    } else if (item.type === "switch") {
      return <Switch disabled={isDisable(item)} />;
    } else if (item.type === "datetime") {
      return <DatePicker disabled={isDisable(item)} />;
    } else if (item.type === "treeselect") {
      return (
        <TreeSelect
          disabled={isDisable(item)}
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
      return <TextArea rows={4} disabled={isDisable(item)} />;
    } else {
      return (
        <Input placeholder={item.placeholder} disabled={isDisable(item)} />
      );
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
