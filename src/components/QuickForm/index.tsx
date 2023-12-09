import { IFormItem } from "@ainiteam/quick-vue3-ui";
import { Button, Form, Space } from "antd";
import AiniFormItem from "../QuickFormItem";
import "./index.less";
// import { useState } from "react";

export type FormType = "search" | "add" | "edit" | "detail" | "form";
export type FormLayout = "horizontal" | "inline" | "vertical";
type PropType = {
  form:any;
  model?: object;
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
    form,
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
        // initialValues={{ layout: layout }}
        initialValues={{...model}}

        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formItems &&
          formItems.map((item: IFormItem) => {
            return <AiniFormItem model={model} formItem={item}></AiniFormItem>;
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
         {hiddenAction && (
        <Form.Item {...buttonItemLayout}>
          <Space>{actionSlot}</Space>
        </Form.Item>
      )}
      </Form>
    </div>
  );
};

export default AiniForm;
