import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  IActionbar,
  IColumn,
  IFormItem,
  IPage,
  IToolbar,
  Crud,
  IDialogTitle,
} from "@ainiteam/quick-react-ui";
import "./index.less";
import { validatePermission } from "@/utils";
import { downloadExcel, exportExcel } from "@/utils/download";
import { ISearchUser, IUser, IUserPermissionButton } from "@/types";
import {
  exportUser,
  getUserPageList,
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUser,
  resetUserPassword,
  enableUser,
  disableUser,
  downloadFileStream,
} from "@/api/system/user";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";

const User: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  dispatch(getPermissionBtns(activeTab));
  const { permissionBtn }: { permissionBtn: IUserPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IUser[]>([]);

  /**
   * 分页
   */
  const page: IPage = {
    current: 1,
    size: 10,
    sizes: [10, 20, 30, 40, 50],
    total: 0,
  };

  /**
   * 搜索
   */
  const searchForm: ISearchUser = {
    keyword: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "用户",
      vModel: "keyword",
      placeholder: "用户名|手机号",
    },
  ];

  /**
   * 导入
   */
  const [dialogVisible, setDialogVisible] = useState(false);
  const handleImport = () => {
    setDialogVisible(true);
  };

  /**
   * 工具栏
   */
  const handleExport = () => {
    exportUser().then((res) => {
      downloadExcel(res, "用户列表");
    });
  };
  const handlePrint = () => {
    window.print();
  };
  const handleBatchDelete = (data: any, done: any) => {
    const { ids } = data;
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: "你真的删除选择的用户吗？",
      onOk() {
        batchDeleteUser(ids).then(() => {
          message.success("用户删除成功");
          done();
        });
      },
    });
  };
  const tableToolbar: IToolbar = {
    importButtonName: "导入（默认后端方式）",
    exportButtonName: "导出（默认后端方式）",
    hiddenBatchDeleteButton: !validatePermission(permissionBtn?.batchDelete),
    hiddenImportButton: !validatePermission(permissionBtn?.import),
    hiddenExportButton: !validatePermission(permissionBtn?.export),
    hiddenAddButton: !validatePermission(permissionBtn?.add),
    hiddenPrintButton: !validatePermission(permissionBtn?.print),
    position: "right",
    // leftToolbarSlot: <div>lll</div>,
    // rightToolbarSlot: <div>rrr</div>,
    btns: [
      {
        name: "下载模板(浏览器下载方式)",
        position: "left",
        type: "primary",
        hidden: !validatePermission(permissionBtn?.download),
        click() {
          window.location.href = `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/v2/downloads?filePath=templates/用户模板.xlsx`;
        },
      },
      {
        name: "下载模板(流文件方式)",
        position: "left",
        type: "primary",
        hidden: !validatePermission(permissionBtn?.download),
        click() {
          downloadFileStream("templates/用户模板.xlsx").then((res) => {
            downloadExcel(res, "用户导入模板");
          });
        },
      },
      {
        name: "导入(前端方式)",
        position: "left",
        type: "warning",
        hidden: !validatePermission(permissionBtn?.import),
        click() {
          // const fileBtn = uploadRef as HTMLInputElement;
          // fileBtn.click();
        },
      },
      {
        name: "导出(前端方式)",
        position: "left",
        type: "danger",
        hidden: !validatePermission(permissionBtn?.export),
        click() {
          // 导出的字段映射
          const columns = [
            {
              label: "编号",
              value: "id",
            },
            {
              label: "用户编号",
              value: "userId",
            },
            {
              label: "用户名",
              value: "userName",
            },
            {
              label: "姓名",
              value: "fullName",
            },
            {
              label: "手机号",
              value: "phone",
            },
            {
              label: "邮箱",
              value: "email",
            },
            {
              label: "地址",
              value: "address",
            },
          ];
          exportExcel(tableDataList, "用户列表", columns);
        },
      },
    ],
  };

  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "添加用户",
    edit: "编辑用户",
    detail: "用户详情",
  };
  const formModel: IUser = {
    id: undefined,
    userId: "",
    userName: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "用户编号",
      labelWidth: "80px",
      vModel: "userId",
      editReadonly: true,
      placeholder: "请输入用户编号",
      prop: "userId",
      rules: [
        {
          required: true,
          message: "请输入用户编号",
          trigger: "blur",
        },
        {
          // validator: validateUserId,
          trigger: "blur",
        },
      ],
    },
    {
      label: "用户名",
      labelWidth: "80px",
      vModel: "userName",
      placeholder: "请输入用户名",
      prop: "userName",
      rules: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        {
          // validator: validateUserName,
          trigger: "blur",
        },
      ],
    },
    {
      label: "姓名",
      labelWidth: "80px",
      vModel: "fullName",
      placeholder: "请输入姓名",
      prop: "fullName",
      rules: [
        {
          // validator: validateFullName,
          trigger: "blur",
        },
      ],
    },
    {
      label: "手机号",
      labelWidth: "80px",
      vModel: "phone",
      placeholder: "请输入手机号",
      prop: "phone",
      rules: [
        {
          // validator: validatePhone,
          trigger: "blur",
        },
      ],
    },
    {
      label: "邮箱",
      labelWidth: "80px",
      vModel: "email",
      placeholder: "请输入邮箱",
      prop: "email",
      rules: [
        {
          // validator: validateEmail,
          trigger: "blur",
        },
      ],
    },
    {
      label: "地址",
      labelWidth: "80px",
      vModel: "address",
      placeholder: "请输入地址",
      prop: "address",
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
  const handleFormSubmit = (form: IUser, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateUser", row);
      updateUser(row).then(() => {
        message.success("用户修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addUser", row);
      addUser(row).then(() => {
        message.success("用户创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.userName}】的用户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteUser(item.id).then(() => {
          message.success("用户删除成功");
          done();
        });
      },
    });
  };
  const handleResetPassword = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的重置【${item.userName}】用户的密码吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        resetUserPassword(item.id).then(() => {
          message.success("置用户密码重成功");
          done();
        });
      },
    });
  };
  const handleEnable = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的启用【${item.userName}】的用户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        enableUser(item.id).then(() => {
          message.success("用户启用成功");
          done();
        });
      },
    });
  };
  const handleDisable = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的禁用【${item.userName}】的用户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        disableUser(item.id).then(() => {
          message.success("用户启用成功");
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 300,
    hiddenEditButton: !validatePermission(permissionBtn?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn?.detail),
    btns: [
      {
        name: "重置密码",
        hidden: !validatePermission(permissionBtn?.resetPassword),
        click(item: IUser, done: any) {
          handleResetPassword(item, done);
        },
      },
      {
        name: "启用",
        hidden: !validatePermission(permissionBtn?.enabled),
        click(item: IUser, done: any) {
          handleEnable(item, done);
        },
        render(row: IUser) {
          return row.enabled === 0;
        },
      },
      {
        name: "禁用",
        hidden: !validatePermission(permissionBtn?.disabled),
        click(item: IUser, done: any) {
          handleDisable(item, done);
        },
        render(row: IUser) {
          return row.enabled !== 0;
        },
      },
    ],
  };

  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "100",
      label: "用户编号",
      prop: "userId",
    },
    {
      width: "100",
      label: "用户名",
      prop: "userName",
      // edit: true,
    },
    {
      width: "100",
      label: "姓名",
      prop: "fullName",
    },
    {
      width: "120",
      label: "手机号",
      prop: "phone",
    },
    {
      width: "200",
      label: "邮箱",
      prop: "email",
    },
    {
      width: "60",
      label: "启用",
      prop: "enabled",
      render: (row: IUser) => {
        return row.enabled === 1 ? "启用" : "禁用";
      },
    },
    {
      width: "180",
      label: "创建时间",
      prop: "createTime",
    },
    {
      width: "150",
      label: "地址",
      prop: "address",
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
    getUserPageList(parmas)
      .then((res) => {
        setLoading(false);
        const { data: userList, total } = res;
        console.log("userList", userList);
        if (userList) {
          setTableDataList([...userList]);
        }
        page.total = total;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Crud
        dialogTitle={dialogTitle}
        formModel={formModel}
        formItems={formItems}
        tableData={tableDataList}
        tableColumns={tableColumns}
        tableActionbar={tableActionbar}
        tableToolbar={tableToolbar}
        searchFormItems={searchFormItems}
        searchFormModel={searchForm}
        pagebar={page}
        loading={loading}
        rowEdit={true}
        displayNumber={true}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
        onBatchDelete={handleBatchDelete}
        onImport={handleImport}
        onExport={handleExport}
        onPrint={handlePrint}
      ></Crud>
    </div>
  );
};

export default User;
