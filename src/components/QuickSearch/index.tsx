import { IFormItem } from "@ainiteam/quick-react-ui";
import { Button, Form, Space } from "antd";
import AiniFormItem from "../QuickFormItem";
import "./index.less";
import AiniForm from "../QuickForm";

type PropType = {
  model?: object;
  items?: IFormItem[];
  searchButtonName?: string;
  resetButtonName?: string;
  hiddenResetButton?: boolean;
  onSearch?: any;
  onClear?: any;
};
const AiniSearch: React.FC<PropType> = (props: PropType) => {
  const {
    model,
    items,
    searchButtonName = "查询",
    resetButtonName = "清空",
    hiddenResetButton,
    onSearch,
    onClear,
  } = props;
  return (
    <AiniForm
      model={model}
      formItems={items}
      formType="search"
      layout="inline"
      hiddenAction={true}
      actionSlot={
        <Space>
          <Button type="primary" onClick={onSearch}>
            {searchButtonName}
          </Button>
          {!hiddenResetButton && (
            <Button onClick={onClear}>{resetButtonName}</Button>
          )}
        </Space>
      }
    ></AiniForm>
  );
};

export default AiniSearch;
