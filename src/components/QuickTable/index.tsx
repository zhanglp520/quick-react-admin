import { IActionbar, IBtns, IColumn, IFormItem } from "@ainiteam/quick-vue3-ui";
import { Space, Table } from "antd";
import "./index.less";
import { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";

type PropType = {
  data: any;
  btns?: IBtns[];
  tableColumns?: IColumn[];
  editButtonName?: string;
  deleteButtonName?: string;
  detailButtonName?: string;
  hiddenEditButton?: boolean;
  hiddenDeleteButton?: boolean;
  hiddenDetailButton?: boolean;
  onSelectionChange?: any;
  onRowEdit?: any;
  onRowDelete?: any;
  onRowDetail?: any;
  onDone?: any;
  onTableRef?: any;
};
const AiniTable: React.FC<PropType> = (props: PropType) => {
  const {
    data,
    btns,
    tableColumns,
    editButtonName = "编辑",
    deleteButtonName = "删除",
    detailButtonName = "详情",
    hiddenEditButton,
    hiddenDeleteButton,
    hiddenDetailButton,
    onSelectionChange,
    onRowEdit,
    onRowDelete,
    onRowDetail,
    onDone,
    onTableRef,
  } = props;
  // tableActionbar
  const columns: ColumnsType = [];
  tableColumns &&
    tableColumns.forEach((item: IColumn) => {
      columns.push({
        title: item.label,
        dataIndex: item.prop,
        key: item.prop,
      });
    });

  const render = (_: any, record: any) => {
    return (
      <Space>
        {!hiddenEditButton && (
          <a
            onClick={() => {
              onRowEdit(record);
            }}
          >
            {editButtonName}
          </a>
        )}
        {!hiddenDeleteButton && (
          <a
            onClick={() => {
              onRowDelete(record);
            }}
          >
            {deleteButtonName}
          </a>
        )}
        {!hiddenDetailButton && (
          <a
            onClick={() => {
              onRowDetail(record);
            }}
          >
            {detailButtonName}
          </a>
        )}
        {btns &&
          btns.map((item: IBtns) => {
            return (
              !item.hidden &&
              item.render &&
              item.render(record) && (
                <a
                  onClick={() => {
                    item.click(record);
                  }}
                >
                  {item.name}
                </a>
              )
            );
          })}
      </Space>
    );
  };

  columns.push({
    title: "操作栏",
    key: "action",
    render,
  });

  return (
    <Table
      rowSelection={onSelectionChange}
      dataSource={data}
      columns={columns}
      pagination={false}
    />
  );
};

export default AiniTable;
