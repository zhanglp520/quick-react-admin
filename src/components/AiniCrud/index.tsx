import { IColumn, IFormItem, IPage, ILeftTree } from "@ainiteam/quick-vue3-ui";
import {
  Col,
  Modal,
  Pagination,
  PaginationProps,
  Row,
  Tree,
  message,
} from "antd";
import "./index.less";
import AiniTable from "../AiniTable";
import AiniForm from "../AiniForm";
import { useState } from "react";
import AiniToolbar from "../AiniToolbar";
import AiniSearch from "../AiniSearch";

export type FormType = "search" | "add" | "edit" | "detail" | "form";
export type FormLayout = "horizontal" | "inline" | "vertical";
export type Title = {
  add: string;
  edit: string;
  // delete: string;
  detail: string;
};
type PropType = {
  searchFormModel?: object;
  searchFormItems?: IFormItem[];
  leftTree?: boolean | ILeftTree;
  leftTreeRefresh?: boolean;
  tableData?: unknown[];
  tableColumns?: IColumn[];
  tableActionbar?: boolean;
  tableToolbar?: boolean;
  page?: boolean | IPage;
  dialogTitle?: Title;
  formModel?: object;
  formItems?: IFormItem[];
  formLayout?: FormLayout;
  loading?: boolean;
  height?: number;
  onTreeClick?: any;
  onLoad?: any;
  onTreeLoad?: any;
  onAdd?: any;
  onEdit?: any;
  onDelete?: any;
  onDetail?: any;
  onBatchDelete?: any;
  onImport?: any;
  onExport?: any;
  onPrint?: any;
  onRefresh?: any;
  onSearchFormSubmit?: any;
  onSearchFormClear?: any;
  onFormSubmit?: any;
  onFormCancel?: any;
  onSizeChange?: any;
  onCurrentChange?: any;
  onSelectionChange?: any;
  onTableRef?: any;
};
const AiniCrud: React.FC<PropType> = (props: PropType) => {
  const {
    searchFormModel,
    searchFormItems,
    leftTree,
    leftTreeRefresh,
    tableData,
    tableColumns,
    tableActionbar,
    tableToolbar,
    page,
    dialogTitle,
    formModel,
    formItems,
    formLayout,
    loading,
    height,
    onTreeClick,
    onLoad,
    onTreeLoad,
    onAdd,
    onEdit,
    onDelete,
    onDetail,
    onBatchDelete,
    onImport,
    onExport,
    onPrint,
    onRefresh,
    onSearchFormSubmit,
    onSearchFormClear,
    onFormSubmit,
    onFormCancel,
    onSizeChange,
    onCurrentChange,
    onselectionchange,
    onTableRef,
  } = props;

  const tree = leftTree as ILeftTree;
  const treeSpan = tree.treeSpan ? tree.treeSpan : 4;

  /**
   * 属性
   */
  const [selectTree, setSelectTree] = useState<Tree>();
  const [checkDataList, setCheckDataList] = useState<any>();
  const [formTitle, setFormTitle] = useState<Title>({
    add: "添加",
    edit: "编辑",
    delete: "删除",
    detail: "详情",
  });
  const [dialogFormType, setDialogFormType] = useState<FormType>("form");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  /**
   * 表单
   */
  const handleOk = () => {
    // quickFormRef.value?.handleSubmit()
  };
  const handleCancel = () => {
    Object.keys(formModel).forEach((key) => {
      formModel.value[key] = "";
    });
    // quickFormRef.value?.handleClear()
    setIsModalOpen(false);
  };
  const handleFormSubmit = () => {
    onFormSubmit(formModel, () => {
      setIsModalOpen(false);
      refresh();
    });
  };

  /**
   * 工具栏
   */
  const handleAdd = () => {
    if (leftTree && !selectTree.id) {
      message.warning("请选择节点");
      return;
    }
    onAdd(formModel, (data: any) => {
      Object.keys(formModel).forEach((key) => {
        formModel[key] = data[key];
      });
      setIsModalOpen(true);
    });
    setDialogFormType("add");
    formTitle.add = dialogTitle ? dialogTitle.add : formTitle.add;
    setFormTitle(formTitle);
    setTitle(formTitle.add);
    setIsModalOpen(true);
  };
  const handleBatchDelete = () => {
    if (leftTree && !selectTree.id) {
      message.warning("请选择节点");
      return;
    }
    if (checkDataList.length < 1) {
      message.warning("至少选择一行");
      return;
    }
    const ids = checkDataList
      .map((x) => {
        return x.id;
      })
      .join(",");
    onBatchDelete({ checkDataList, ids }, () => {
      refresh();
    });
  };
  const handleImport = () => {
    if (leftTree && !selectTree.id) {
      message.warning("请选择节点");
      return;
    }
    console.log("handleImport");
    onImport(() => {
      refresh();
    });
  };
  const handleExport = () => {
    if (leftTree && !selectTree.id) {
      message.warning("请选择节点");
      return;
    }
    console.log("handleExport");
    onExport();
  };
  const handlePrint = () => {
    if (leftTree && !selectTree.id) {
      message.warning("请选择节点");
      return;
    }
    console.log("handlePrint");
    onPrint();
  };
  const handleRefresh = () => {
    console.log("handleRefresh");
    load();
  };

  /**
   * 加载数据
   */
  const load = () => {
    onLoad();
  };
  const handleTreeNodeClick = (data: Tree) => {
    selectTree.value = data;
    onTreeClick(data, () => {
      load();
    });
  };
  const treeLoad = () => {
    onTreeLoad((id: string) => {
      // treeRef?.setCurrentKey(id)
      // const node = treeRef.value?.getCurrentNode() as Tree
      // handleTreeNodeClick(node)
      load();
    });
  };
  const refresh = () => {
    if (leftTree && leftTreeRefresh) {
      treeLoad();
    } else {
      load();
    }
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setCheckDataList(newSelectedRowKeys);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber: number) => {
    console.log("Page: ", pageNumber);
  };
  const [title, setTitle] = useState("");
  const handleRowSelection = {
    selectedRowKeys: checkDataList,
    onChange: onSelectChange,
  };
  const handleSearchSubmit = () => {
    onSearchFormSubmit(searchFormModel);
  };

  const handleSearchClear = () => {
    onSearchFormClear(searchFormModel);
  };
  return (
    <div className="quick-crud">
      <Row gutter={40}>
        <Col span={leftTree ? treeSpan : 0}>col-12</Col>
        <Col span={leftTree ? 24 - treeSpan : 24}>
          <div>
            {searchFormModel && (
              <AiniSearch
                model={searchFormModel}
                items={searchFormItems}
                onSearch={handleSearchSubmit}
                onClear={handleSearchClear}
              ></AiniSearch>
            )}
            <AiniToolbar
              onAdd={handleAdd}
              onBatchDelete={handleBatchDelete}
              onImport={handleImport}
              onExport={handleExport}
              onPrint={handlePrint}
              onRefresh={handleRefresh}
            ></AiniToolbar>
            <AiniTable
              data={tableData}
              columns={tableColumns}
              onRowSelection={handleRowSelection}
            ></AiniTable>
            <div style={{ marginTop: 10 }}>
              <Pagination
                showQuickJumper
                defaultCurrent={2}
                total={500}
                onChange={onChange}
              />
            </div>
            <Modal
              title={title}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <AiniForm
                model={formModel}
                formItems={formItems}
                layout={formLayout}
                formType={dialogFormType}
                hiddenAction={true}
                onSubmit={handleFormSubmit}
              ></AiniForm>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AiniCrud;
