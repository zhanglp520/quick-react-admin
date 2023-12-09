import { IFormItem } from "@ainiteam/quick-vue3-ui";
import { Button, Form } from "antd";
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
      layout='inline'
      hiddenAction={true}
      actionSlot={
        <div>
          <Button type="primary" onClick={onSearch}>
            {searchButtonName}
          </Button>
          {!hiddenResetButton && (
            <Button onClick={onClear}>{resetButtonName}</Button>
          )}
        </div>
      }
    ></AiniForm>
  );
};

export default AiniSearch;
