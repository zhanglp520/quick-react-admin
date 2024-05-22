/**导入第三方库 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Crud,
  IColumn,
  IActionbar,
  IToolbar,
  IFormItem,
  IOptions,
  ITree,
  ILeftTree,
  IDialogTitle,
  ITreeOptions,
} from "@ainiteam/quick-react-ui";
/**导入项目文件 */
import {
  validatePermission,
  listToSelectTree,
  listToTableTree,
  listToTree,
} from "@/utils";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import {
  addDept,
  deleteDept,
  getDeptList,
  updateDept,
} from "@/api/system/dept";
import { IDept, IDeptPermissionButton } from "@/types";

const Dept: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: IDeptPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [deptTreeData, setDeptTreeData] = useState<ITreeOptions[]>([]);
  const [tableDataList, setTableDataList] = useState<IDept[]>([]);
  const [deptDdataListTemp, setDeptDdataListTemp] = useState<IDept[]>([]);
  const [currentTreeData, setCurrentTreeData] = useState({
    key: "",
    title: "",
    children: [],
  });
  /**
   * 工具栏
   */
  const handleAdd = (item: IDept, done: any) => {
    const form = { ...item };
    form.pId = Number(currentTreeData.key);
    done(form);
  };
  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: !validatePermission(permissionBtn?.add),
  };
  /**
   * 操作栏
   */
  const handleDelete = (item: IDept, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.deptName}】的用户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteDept(item.id).then(() => {
          message.success("用户删除成功");
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 300,
    hiddenDetailButton: true,
    hiddenEditButton: !validatePermission(permissionBtn?.edit),
  };
  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "50",
      type: "selection",
    },
    {
      label: "部门编号",
      prop: "deptId",
      width: "200",
    },
    {
      label: "部门名称",
      prop: "deptName",
    },
  ];
  /**
   * 加载父级部门树下拉框
   */
  const loadSelectTreeData = () => {
    const deptTree = listToSelectTree(deptDdataListTemp, 0, {
      value: "id",
      label: "deptName",
    });
    setDeptTreeData([...deptTree]);
    console.log("deptTreeData", deptTreeData);
  };
  /**
   * 加载数据
   */
  const loadData = () => {
    const { key } = currentTreeData;
    const pId = key;
    setLoading(true);
    const deptTree = listToTableTree(deptDdataListTemp, Number(pId));
    setLoading(false);
    setTableDataList([...deptTree]);
  };
  /**
   * 左树
   */
  const [leftTree, setLeftTree] = useState<ILeftTree>({
    treeData: [],
    treeSpan: 6,
  });
  const treeLoad = (done: any) => {
    getDeptList().then((res) => {
      const { data: deptList } = res;
      console.log("deptList", deptList);
      setDeptDdataListTemp([...deptList]);
      const deptTree = listToTree(deptList, 0, {
        id: "id",
        label: "deptName",
      });
      console.log("deptTree", deptTree);
      leftTree.treeData = deptTree;
      console.log("leftTree", leftTree.treeData);
      setCurrentTreeData({ ...(deptTree && deptTree[0]) });
      done(currentTreeData);
    });
  };
  const handleTreeClick = (data: any, done: any) => {
    setCurrentTreeData({ ...data });
    done();
  };
  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "创建部门",
    edit: "修改部门",
    detail: "部门详情",
  };
  const formModel: IDept = {
    id: undefined,
    deptId: "",
    deptName: "",
    pId: undefined,
  };
  const formItems: IFormItem[] = [
    {
      label: "部门编号",
      labelWidth: "80px",
      vModel: "deptId",
      placeholder: "请输入部门编号",
      editReadonly: true,
      prop: "deptId",
      rules: [
        {
          required: true,
          message: "请输入部门编号",
          trigger: "blur",
        },
      ],
    },
    {
      label: "部门名称",
      labelWidth: "80px",
      vModel: "deptName",
      placeholder: "请输入部门名称",
      prop: "deptName",
      rules: [
        {
          required: true,
          message: "请输入部门名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "父级部门",
      labelWidth: "80px",
      vModel: "pId",
      placeholder: "请选择父级部门",
      type: "treeselect",
      // addDisabled: true,
      detailDisabled: true,
      options: deptTreeData,
      prop: "pId",
      rules: [
        {
          required: true,
          message: "请选择父级部门",
          // trigger: "change",
        },
      ],
    },
  ];
  const handleFormSubmit = (form: IDept, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateUser", row);
      updateDept(row).then(() => {
        message.success("用户修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addUser", row);
      addDept(row).then(() => {
        message.success("用户创建成功");
        done();
      });
    }
  };
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
    loadData();
    loadSelectTreeData();
  }, [activeTab, currentTreeData, dispatch]);
  return (
    <>
      <div className="dept_wrap">
        <Crud
          dialogTitle={dialogTitle}
          formModel={formModel}
          formItems={formItems}
          tableData={tableDataList}
          tableColumns={tableColumns}
          tableActionbar={tableActionbar}
          tableToolbar={tableToolbar}
          // dialogTitles={dialogTitles}
          leftTree={leftTree}
          leftTree-refresh={true}
          loading={loading}
          onTreeLoad={treeLoad}
          onTreeClick={handleTreeClick}
          onFormSubmit={handleFormSubmit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        ></Crud>
      </div>
    </>
  );
};

export default Dept;
