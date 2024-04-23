import { useState } from "react";
import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  IActionbar,
  IColumn,
  IFormItem,
  // IPage,
  Crud,
  IDialogTitle,
  // IToolbar,
} from "@ainiteam/quick-react-ui";
import "./index.less";
import { IDept, IRole } from "@/types";
import {
  getRoleList,
  addRole,
  updateRole,
  // deleteRole,
  deleteRole,
  // resetRolePassword,
  // enableRole,
  // disableRole,
  getDeptList,
} from "@/api/system/role";
import { listToSelectTree } from "@/utils";
// import Crud from "node_modules/@ainiteam/quick-react-ui/dist/src/crud/crud";

const Role: React.FC = () => {
  const { confirm } = Modal;
  const [deptDataList, setDeptDataList] = useState([]);

  const [deptTreeData, setDeptTreeData] = useState([]);

  /**
   * 属性
   */
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IRole[]>([]);

  const handleBatchDelete = (data: any, done: any) => {
    const { ids } = data;
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: "你真的删除选择的角色吗？",
      onOk() {
        deleteRole(ids).then(() => {
          message.success("角色删除成功");
          done();
        });
      },
    });
  };

  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "添加角色",
    edit: "编辑角色",
    detail: "角色详情",
  };
  const formModel: IRole = {
    id: undefined,
    roleId: "",
    roleName: "",
    deptId: 0,
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "角色编号",
      labelWidth: "80px",
      vModel: "roleId",
      editReadonly: true,
      placeholder: "请输入角色编号",
      prop: "roleId",
      rules: [
        {
          required: true,
          message: "请输入角色编号",
          trigger: "blur",
        },
        {
          // validator: validateRoleId,
          trigger: "blur",
        },
      ],
    },
    {
      label: "角色名称",
      labelWidth: "80px",
      vModel: "roleName",
      placeholder: "请输入角色名",
      prop: "roleName",
      rules: [
        {
          required: true,
          message: "请输入角色名",
          trigger: "blur",
        },
        // {
        //   // validator: validateRoleName,
        //   trigger: "blur",
        // },
      ],
    },
    {
      label: "所属部门",
      labelWidth: "80px",
      vModel: "deptId",
      placeholder: "请选择所属部门",
      type: "treeselect",
      prop: "deptId",
      options: deptTreeData,
      rules: [
        {
          required: true,
          message: "请选择所属部门",
          trigger: "change",
        },
      ],
    },
  ];
  const handleFormSubmit = (form: IRole, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateRole", row);
      updateRole(row).then(() => {
        message.success("角色修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addRole", row);
      addRole(row).then(() => {
        message.success("角色创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */

  const tableActionbar: IActionbar = {
    width: 300,
    // hiddenEditButton: !validatePermission(permissionBtn?.edit),
    // hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    // hiddenDetailButton: !validatePermission(permissionBtn?.detail),
    btns: [],
  };

  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "100",
      label: "角色编号",
      prop: "roleId",
    },
    {
      width: "100",
      label: "角色名称",
      prop: "roleName",
      // edit: true,
    },
    {
      width: "200",
      label: "所属部门",
      prop: "deptId",
      format(row: IRole) {
        console.log("拿到的所属部门", deptDataList);
        const dept = deptDataList?.find((x: IDept) => x.id === row.deptId);

        return dept ? dept.deptName : "";
      },
    },
    {
      width: "80",
      label: "创建时间",
      prop: "createTime",
    },
    {
      // width: "100",
      label: "备注",
      prop: "remark",
    },
  ];

  /**
   * 工具栏
   */
  const tableToolbar = {
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    // hiddenAddButton: !validatePermission(permissionBtn.value?.add)
  };
  // /**
  //  * 加载部门下拉框数据
  //  */
  const loadDeptSelectData = () => {
    getDeptList().then((res: any) => {
      // debugger;
      const { data: deptList } = res;
      setDeptDataList([...deptList]);
      const deptTree = listToSelectTree(deptList, 0, {
        value: "id",
        label: "deptName",
      });
      setDeptTreeData([...deptTree]);
      console.log("下拉框数据", deptTree);
    });
  };

  /**
   * 加载数据
   */
  const loadData = () => {
    setLoading(true);
    loadDeptSelectData();
    getRoleList()
      .then((res: any) => {
        setLoading(false);
        const { data: roleList } = res;
        console.log("roleList", roleList);
        if (roleList) {
          setTableDataList([...roleList]);
        }
        // page.total = total;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div></div>
      <Crud
        dialogTitle={dialogTitle}
        formModel={formModel}
        formItems={formItems}
        tableData={tableDataList}
        tableColumns={tableColumns}
        tableActionbar={tableActionbar}
        tableToolbar={tableToolbar}
        pagebar={false}
        loading={loading}
        rowEdit={true}
        displayNumber={true}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        // onDelete={handleDelete}
        onBatchDelete={handleBatchDelete}
      ></Crud>
    </div>
  );
};

export default Role;
