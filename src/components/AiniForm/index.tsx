import { IFormItem } from "@ainiteam/quick-vue3-ui";
import { Button, Form, Space } from "antd";
import AiniFormItem from "../AiniFormItem";
import "./index.less";
// import { useState } from "react";

export type FormType = "search" | "add" | "edit" | "detail" | "form";
export type FormLayout = "horizontal" | "inline" | "vertical";
type PropType = {
  model?: IFormItem;
  formItems?: IFormItem[];
  formType?: FormType;
  layout?: FormLayout;
  hiddenAction?: boolean;
  actionSlot?: any;
  searchButtonName?: string;
  resetButtonName?: string;
  onSubmit?: any;
  onReset?: any;
};

const AiniForm: React.FC<PropType> = (props: PropType) => {
  const {
    model,
    formItems,
    formType,
    layout = "horizontal",
    hiddenAction,
    actionSlot,
    searchButtonName,
    resetButtonName,
    onSubmit,
    onReset,
  } = props;
  // const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [form] = Form.useForm();
  const formItemLayout =
    layout === "horizontal"
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    layout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null;
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        {...formItemLayout}
        layout={layout}
        form={form}
        style={{ maxWidth: layout === "inline" ? "none" : 600 }}
        initialValues={{ layout: layout }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formItems &&
          formItems.map((item: IFormItem) => {
            return <AiniFormItem formItem={item}></AiniFormItem>;
          })}
        {!hiddenAction && (
          <Form.Item {...buttonItemLayout}>
            <Space>
              <Button type="primary" onClick={onSubmit}>
                {searchButtonName}
              </Button>
              <Button onClick={onReset}>{resetButtonName}</Button>
            </Space>
          </Form.Item>
        )}
      </Form>
      {hiddenAction && (
        <Form.Item {...buttonItemLayout}>
          <Space>{actionSlot}</Space>
        </Form.Item>
      )}
    </div>
  );
};

export default AiniForm;
