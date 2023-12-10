import { IFormItem } from "@ainiteam/quick-vue3-ui";
import { Button, Form, Space } from "antd";
import AiniFormItem from "../QuickFormItem";
import "./index.less";
import { useForm } from "antd/es/form/Form";
// import { useState } from "react";

export type FormType = "search" | "add" | "edit" | "detail" | "form";
export type FormLayout = "horizontal" | "inline" | "vertical";
type PropType = {
  model?: object;
  formItems?: IFormItem[];
  formType?: FormType;
  layout?: FormLayout;
  hiddenAction?: boolean;
  actionSlot?: any;
  submitButtonName?: string;
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
    submitButtonName = "提交",
    resetButtonName = "重置",
    onSubmit,
    onReset,
  } = props;
  // const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const formItemLayout =
    layout === "horizontal"
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    layout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null;
  const [form] = Form.useForm();
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
        // initialValues={{ layout: layout }}
        initialValues={{ ...model }}
        // disabled={true}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formItems &&
          formItems.map((item: IFormItem) => {
            if (
              formType === "search" ||
              (formType === "add" && !item.addHidden) ||
              (formType === "edit" && !item.editHidden) ||
              (formType === "detail" && !item.detailHidden) ||
              formType === "form"
            ) {
              return (
                <AiniFormItem model={model} formItem={item} formType={formType}></AiniFormItem>
              );
            }
          })}
        {!hiddenAction && (
          <Form.Item {...buttonItemLayout}>
            <Space>
              <Button type="primary" onClick={onSubmit}>
                {submitButtonName}
              </Button>
              <Button onClick={onReset}>{resetButtonName}</Button>
            </Space>
          </Form.Item>
        )}
        {hiddenAction && (
          <Form.Item {...buttonItemLayout}>{actionSlot}</Form.Item>
        )}
      </Form>
    </div>
  );
};

export default AiniForm;
