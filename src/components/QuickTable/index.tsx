import { IActionbar, IBtns, IColumn, IFormItem } from "@ainiteam/quick-vue3-ui";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import "./index.less";
import { ColumnsType } from "antd/es/table";
import { ReactNode, useState } from "react";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

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
  rowEdit?: boolean;
  displayNumber?: boolean;
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
    rowEdit = false,
    displayNumber = true,
    onSelectionChange,
    onRowEdit,
    onRowDelete,
    onRowDetail,
    onDone,
    onTableRef,
  } = props;
  // tableActionbar

  const [form] = Form.useForm();
  const [tableData, setTableData] = useState(data);

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: Partial<any> & { key: React.Key }) => {
    const obj = {};
    tableColumns &&
      tableColumns.forEach((item: IColumn) => {
        if (item.prop) {
          obj[item.prop] = "";
        }
      });
    form.setFieldsValue(obj);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as any;

      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTableData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setTableData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns: ColumnsType = [];

  if (displayNumber) {
    columns.push({
      title: "序号",
      render: (text, _, index) => index + 1,
    });
  }

  tableColumns &&
    tableColumns.forEach((item: IColumn) => {
      columns.push({
        title: item.label,
        dataIndex: item.prop,
        key: item.prop,
        editable: item.edit,
      });
    });

  const render = (_: any, record: any) => {
    const editable = isEditing(record);
    return (
      <Space>
        {rowEdit &&
          (editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{ marginRight: 8 }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          ))}

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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowSelection={{
            type: "checkbox",
          }}
          // rowSelection={onSelectionChange}
          dataSource={data}
          columns={mergedColumns}
          pagination={false}
        />
      </Form>
    </>
  );
};

export default AiniTable;
