import {
  IColumn,
  IFormItem,
  IPage,
  ILeftTree,
  IActionbar,
  IToolbar,
} from "@ainiteam/quick-vue3-ui";
import {
  Col,
  Form,
  Modal,
  Pagination,
  PaginationProps,
  Row,
  Tree,
  message,
} from "antd";
import "./index.less";
import AiniTable from "../QuickTable";
import AiniForm from "../QuickForm";
import { useState } from "react";
import AiniToolbar from "../QuickToolbar";
import AiniSearch from "../QuickSearch";

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
  tableActionbar?: boolean | IActionbar;
  tableToolbar?: boolean | IToolbar;
  pagebar?: boolean | IPage;
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
    leftTree = false,
    leftTreeRefresh,
    tableData,
    tableColumns,
    tableActionbar = true,
    tableToolbar = true,
    pagebar,
    dialogTitle,
    formModel,
    formItems,
    formLayout,
    loading = false,
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

  /**
   * 类型转换
   */
  const page = pagebar as IPage;
  const toolbar = tableToolbar as IToolbar;
  const actionbar = tableActionbar as IActionbar;
  const tree = leftTree as ILeftTree;
  const treeSpan = tree.treeSpan ? tree.treeSpan : 4;

  /**
   * 属性
   */
  const [form] = Form.useForm();
  const [selectTree, setSelectTree] = useState<Tree>();
  const [checkDataList, setCheckDataList] = useState<any>();
  const [formTitle, setFormTitle] = useState<Title>({
    add: "添加",
    edit: "编辑",
    detail: "详情",
  });
  const [dialogFormType, setDialogFormType] = useState<FormType>("form");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  /**
   * 操作栏
   */
  const handleEdit = (row: any) => {
    debugger;
    Object.keys(formModel).forEach((key) => {
      formModel[key] = row[key];
    });
    // onEdit(formModel, (data: any) => {
    //   Object.keys(formModel).forEach((key) => {
    //     formModel[key] = data[key];
    //   });
    //   setIsModalOpen(true);
    // });
    setDialogFormType("edit");
    formTitle.edit = dialogTitle ? dialogTitle.edit : formTitle.edit;
    setTitle(formTitle.edit);
    setIsModalOpen(true);
  };
  const handleDelete = (row: any) => {
    onDelete(row, () => {
      refresh();
    });
  };
  const handleDetail = (row: any) => {
    Object.keys(formModel).forEach((key) => {
      formModel[key] = row[key];
    });
    // onDetail(formModel, (data: any) => {
    //   Object.keys(formModel).forEach((key) => {
    //     formModel[key] = data[key];
    //   });
    //   setIsModalOpen(true);
    // });
    setDialogFormType("detail");
    formTitle.detail = dialogTitle ? dialogTitle.detail : formTitle.detail;
    setTitle(formTitle.detail);
    setIsModalOpen(true);
  };

  /**
   * 表单
   */
  const handleOk = () => {
    handleFormSubmit();
  };
  const handleCancel = () => {
    Object.keys(formModel).forEach((key) => {
      formModel[key] = "";
    });
    // quickFormRef.value?.handleClear()
    setIsModalOpen(false);
  };
  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      Object.keys(values).forEach((key) => {
        formModel[key] = values[key];
      });
      onFormSubmit(formModel, () => {
        setIsModalOpen(false);
        refresh();
      });
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
    // onAdd(formModel, (data: any) => {
    //   Object.keys(formModel).forEach((key) => {
    //     formModel[key] = data[key];
    //   });
    //   setIsModalOpen(true);
    // });
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
    const { current, size } = page;
    const params = { ...searchFormModel, current, size };
    onLoad(params);
  };
  const handleTreeNodeClick = (data: Tree) => {
    selectTree = data;
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

  const handleSizeChange: PaginationProps["onChange"] = (val: number) => {
    page.size = val;
    // onSizeChange(val);
    load();
  };
  const handleCurrentChange: PaginationProps["onChange"] = (val: number) => {
    page.current = val;
    // onCurrentChange(val);
    load();
  };
  const [title, setTitle] = useState("");
  const handleRowSelection = {
    selectedRowKeys: checkDataList,
    onChange: onSelectChange,
  };
  const handleSearchSubmit = () => {
    onSearchFormSubmit(searchFormModel);
    load();
  };

  const handleSearchClear = () => {
    Object.keys(searchFormModel).forEach((key) => {
      searchFormModel[key] = "";
    });
    onSearchFormClear(searchFormModel);
    load();
  };

  const handleDone = () => {
    load();
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
            {tableToolbar && (
              <AiniToolbar
                addButtonName={toolbar.addButtonName}
                batchDeleteButtonName={toolbar.batchDeleteButtonName}
                importButtonName={toolbar.importButtonName}
                exportButtonName={toolbar.exportButtonName}
                printButtonName={toolbar.printButtonName}
                refreshButtonName={toolbar.refreshButtonName}
                hiddenAddButton={toolbar.hiddenAddButton}
                hiddenBatchDeleteButton={toolbar.hiddenBatchDeleteButton}
                hiddenImportButton={toolbar.hiddenImportButton}
                hiddenExportButton={toolbar.hiddenExportButton}
                hiddenPrintButton={toolbar.hiddenPrintButton}
                hiddenRefreshButton={toolbar.hiddenRefreshButton}
                position={toolbar.position}
                btns={toolbar.btns}
                leftToolbarSlot={toolbar.leftToolbarSlot}
                rightToolbarSlot={toolbar.rightToolbarSlot}
                onAdd={handleAdd}
                onBatchDelete={handleBatchDelete}
                onImport={handleImport}
                onExport={handleExport}
                onPrint={handlePrint}
                onRefresh={handleRefresh}
              ></AiniToolbar>
            )}
            <AiniTable
              data={tableData}
              tableColumns={tableColumns}
              btns={actionbar.btns}
              editButtonName={actionbar.editButtonName}
              deleteButtonName={actionbar.deleteButtonName}
              detailButtonName={actionbar.detailButtonName}
              hiddenEditButton={actionbar.hiddenEditButton}
              hiddenDeleteButton={actionbar.hiddenDeleteButton}
              hiddenDetailButton={actionbar.hiddenDetailButton}
              onRowEdit={handleEdit}
              onRowDelete={handleDelete}
              onRowDetail={handleDetail}
              onSelectionChange={handleRowSelection}
              onDone={handleDone}
            ></AiniTable>
            {pagebar && (
              <div style={{ marginTop: 10 }}>
                <Pagination
                  showQuickJumper
                  defaultCurrent={1}
                  current={page.current}
                  pageSize={page.size}
                  total={page.total}
                  // hideOnSinglePage={true}
                  onChange={handleCurrentChange}
                  onShowSizeChange={handleSizeChange}
                />
              </div>
            )}
            <Modal
              title={title}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <AiniForm
                form={form}
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
