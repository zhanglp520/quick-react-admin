import { IFormItem } from "@ainiteam/quick-react-ui";
import { Form } from "antd";
import AiniFormItem from "../QuickFormItem";
import "./index.less";

type PropType = {
  formItems: IFormItem[];
};
const AiniForm: React.FC<PropType> = (props: PropType) => {
  const { formItems } = props;
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {formItems.map((item: IFormItem) => {
        return <AiniFormItem formItem={item}></AiniFormItem>;
      })}
    </Form>
  );
};

export default AiniForm;
