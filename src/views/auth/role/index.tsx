import {
  addRole,
  deleteRole,
  getRoleList,
  updateRole,
} from "@/api/system/role";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import { IRole, IRolePermissionButton } from "@/types";
import { validatePermission } from "@/utils";
import {
  Crud,
  IActionbar,
  IColumn,
  IFormItem,
  //   IPage,
  IToolbar,
} from "@ainiteam/quick-react-ui";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogProgress from "./components/DialogProgress";

const Role: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;

  const [dataList, setDataList] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: IRolePermissionButton } =
    useSelector((state: RootState) => state.user);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [role, setRole] = useState({});
  const handleAuth = (item: IRole) => {
    setDialogVisible(true);
    setRole({ ...item });
  };

  /**
   * 工具栏
   */
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

  const tableActionbar: IActionbar = {
    width: 300,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenDetailButton: true,
    btns: [
      {
        name: "配置权限",
        click(item: IRole) {
          handleAuth(item);
        },
        render() {
          return true;
        },
      },
    ],
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
      label: "角色编号",
      prop: "roleId",
      width: "200",
    },
    {
      label: "角色名称",
      prop: "roleName",
    },
  ];
  const handleDelete = (item: IRole, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.roleName}】的字典吗？`,
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
   * 加载数据
   */
  const load = () => {
    setLoading(true);
    getRoleList().then((res) => {
      setLoading(false);

      const { data: roleList } = res;
      setDataList([...roleList]);
    });
  };
  /**
   * 表单
   */
  const dialogTitle = {
    add: "新增角色",
    edit: "编辑角色",
    detail: "角色详情",
  };
  const formModel: IRole = {
    id: undefined,
    roleId: "",
    roleName: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "角色编号",
      labelWidth: "80px",
      vModel: "roleId",
      placeholder: "角色编号",
      editReadonly: true,
      prop: "roleId",
      rules: [
        {
          required: true,
          message: "角色编号不能为空",
          trigger: "blur",
        },
      ],
    },
    {
      label: "角色名称",
      labelWidth: "80px",
      vModel: "roleName",
      placeholder: "角色名称",
      prop: "roleName",
      rules: [
        {
          required: true,
          message: "角色名称不能为空",
          trigger: "blur",
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
   * 弹窗
   */
  const handleOk = () => {
    setDialogVisible(false);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };
  const prev = () => {
    // dialogProgressRef?.prev();
  };
  const next = () => {
    // dialogProgressRef?.next();
  };
  const save = () => {
    // dialogProgressRef?.save(() => {
    //   setDialogVisible(false);
    // });
  };
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
    load();
  }, []);

  return (
    <>
      <Crud
        dialogTitle={dialogTitle}
        formModel={formModel}
        formItems={formItems}
        tableData={dataList}
        tableColumns={tableColumns}
        tableActionbar={tableActionbar}
        tableToolbar={tableToolbar}
        // pagebar={page}
        loading={loading}
        onLoad={load}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
      ></Crud>
      <Modal
        title="角色授权"
        open={dialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="30%"
        footer={[
          <Button key="back" onClick={prev} type="primary">
            上一步
          </Button>,
          <Button type="primary" loading={loading} onClick={next}>
            下一步
          </Button>,
          <Button type="primary" loading={loading} onClick={save}>
            保存
          </Button>,
        ]}
      >
        <div>
          <DialogProgress role={role}></DialogProgress>
        </div>
      </Modal>
    </>
  );
};

export default Role;
