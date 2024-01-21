import Crud, { Title } from "@ainiteam/quick-react-ui";
import { IRole } from "@/types";
import {
  IActionbar,
  IColumn,
  IFormItem,
  IPage,
  IToolbar,
} from "@ainiteam/quick-react-ui";
import { useState } from "react";
import {
  getRoleList,
  addRole,
  updateRole,
  deleteRole,
} from "@/api/system/role";
import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const role: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { confirm } = Modal;

  /**
   * 属性
   */
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IRole[]>([
    {
      id: 116,
      roleId: "YH_0003",
      roleName: "管理员",
      deptId: "管理层",
      createTime: "2023-09-21 11:28:35",
      remark: "管理员（请误删）",
    },
    {
      id: 115,
      roleId: "YH_0002",
      roleName: "员工1",
      deptId: "普通角色",
      createTime: "2023-09-21 11:27:28",
      remark: "",
    },
    {
      id: 114,
      roleId: "YH_0001",
      roleName: "员工2",
      deptId: "普通角色",
      createTime: "2023-09-19 11:01:20",
      remark: "",
    },
  ]);

  /**
   * 工具栏
   */

  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
  };

  /**
   * 表单
   */
  const dialogTitle: Title = {
    add: "添加角色",
    edit: "编辑角色",
    detail: "角色详情",
  };
  const formModel: IRole = {
    id: undefined,
    roleId: "",
    roleName: "",
    deptId: "",
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
          trigger: "blur",
        },
      ],
    },
    {
      label: "角色名称",
      labelWidth: "80px",
      vModel: "roleName",
      placeholder: "请输入角色名称",
      prop: "roleName",
      rules: [
        {
          required: true,
          message: "请输入角色名称",
          trigger: "blur",
        },
        {
          trigger: "blur",
        },
      ],
    },
    {
      label: "所属部门",
      labelWidth: "80px",
      vModel: "deptId",
      placeholder: "请选择所属部门",
      prop: "deptId",
      rules: [
        {
          trigger: "blur",
        },
      ],
    },

    {
      label: "备注",
      labelWidth: "80px",
      vModel: "remark",
      placeholder: "请输入备注",
      type: "textarea",
      prop: "remark",
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
  const handleDelete = (item: IRole, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.roleName}】的角色吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteRole(item.id).then(() => {
          message.success("角色删除成功");
          done();
        });
      },
    });
  };
  /**
   * 操作栏
   */
  const tableActionbar: IActionbar = {
    width: 300,
  };

  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    { title: "序号", dataIndex: "key", rowScope: "row" },
    {
      width: "100",
      label: "角色编号",
      prop: "roleId",
    },
    {
      width: "100",
      label: "角色名称",
      prop: "roleName",
    },
    {
      width: "100",
      label: "所属部门",
      prop: "deptId",
    },

    {
      width: "180",
      label: "创建时间",
      prop: "createTime",
    },

    {
      label: "备注",
      prop: "remark",
    },
  ];

  /**
   * 加载数据
   */
  const loadData = (parmas: object) => {
    setLoading(true);
    getRoleList(parmas)
      .then((res) => {
        setLoading(false);
        const { data: roleList } = res;
        console.log("roleList", roleList);
        if (roleList) {
          tableDataList.length = 0;
          tableDataList.push(...roleList);
          setTableDataList(tableDataList);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Crud
        dialogTitle={dialogTitle}
        formModel={formModel}
        formItems={formItems}
        tableData={tableDataList}
        tableColumns={tableColumns}
        tableActionbar={tableActionbar}
        tableToolbar={tableToolbar}
        loading={loading}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
      ></Crud>
    </>
  );
};

export default role;
