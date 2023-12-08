import { IFormItem } from "@ainiteam/quick-vue3-ui";
import { Table } from "antd";
import "./index.less";

type PropType = {
  data: any;
  columns: any;
  onRowSelection: any;
};
const AiniTable: React.FC<PropType> = (props: PropType) => {
  const { data, columns, onRowSelection } = props;
  return (
    <Table
      rowSelection={onRowSelection}
      dataSource={data}
      columns={columns}
      pagination={false}
    />
  );
};

export default AiniTable;
