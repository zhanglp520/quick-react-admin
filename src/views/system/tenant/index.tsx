import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import {
  ApartmentOutlined,
  ContainerOutlined,
  DownloadOutlined,
  ExclamationCircleFilled,
  ExportOutlined,
  ImportOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
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

const Tenant: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
  }, []);
  const { permissionBtn }: { permissionBtn: IUserPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IUser[]>([]);

  /**
   * 分页
   */
  const [page] = useState<IPage>({
    current: 1,
    size: 10,
    sizes: [10, 20, 30, 40, 50],
    total: 0,
  });

  /**
   * 搜索
   */
  const searchForm: ISearchUser = {
    keyword: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "租户",
      vModel: "keyword",
      placeholder: "租户名称",
    },
    {
      label: "编号",
      vModel: "keyword",
      placeholder: "租户编号",
    },
    {
      label: "联系人",
      vModel: "keyword",
      placeholder: "联系人",
    },
  ];

  /**
   * 工具栏
   */

  const handleBatchDelete = (data: any, done: any) => {
    const { ids } = data;
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: "你真的删除选择的租户吗？",
      onOk() {
        batchDeleteUser(ids).then(() => {
          message.success("租户删除成功");
          done();
        });
      },
    });
  };
  const tableToolbar: IToolbar = {
    // importButtonName: "导入（默认后端方式）",
    // exportButtonName: "导出（默认后端方式）",
    hiddenBatchDeleteButton: !validatePermission(permissionBtn?.batchDelete),
    // hiddenImportButton: !validatePermission(permissionBtn?.import),
    // hiddenExportButton: !validatePermission(permissionBtn?.export),
    hiddenAddButton: !validatePermission(permissionBtn?.add),
    // hiddenPrintButton: !validatePermission(permissionBtn?.print),
    position: "left",
    // leftToolbarSlot: <div>lll</div>,
    // rightToolbarSlot: <div>rrr</div>,
    btns: [
      {
        name: "授权配置",
        position: "right",
        type: "dashed",
        icon: <UnorderedListOutlined />,
        // hidden: !validatePermission(permissionBtn?.download),
        click() {
          // window.location.href = `${
          //   import.meta.env.VITE_APP_BASE_URL
          // }/api/v2/downloads?filePath=templates/租户模板.xlsx`;
        },
      },
      {
        name: "数据源配置",
        position: "right",
        icon: <ApartmentOutlined />,
        type: "dashed",
        // hidden: !validatePermission(permissionBtn?.download),
        click() {
          // downloadFileStream("templates/租户模板.xlsx").then((res) => {
          //   downloadExcel(res, "租户导入模板");
          // });
        },
      },
      {
        name: "产品包配置",
        position: "right",
        icon: <ContainerOutlined />,
        type: "dashed",
        // hidden: !validatePermission(permissionBtn?.import),
        click() {
          // const fileBtn = uploadRef as HTMLInputElement;
          // fileBtn.click();
        },
      },
      {
        name: "产品包管理",
        position: "right",
        icon: <ContainerOutlined />,
        type: "dashed",
        // hidden: !validatePermission(permissionBtn?.export),
        click() {
          // 导出的字段映射
          // const columns = [
          //   {
          //     label: "编号",
          //     value: "id",
          //   },
          //   {
          //     label: "租户编号",
          //     value: "userId",
          //   },
          //   {
          //     label: "租户名称",
          //     value: "userName",
          //   },
          //   {
          //     label: "联系人",
          //     value: "fullName",
          //   },
          //   {
          //     label: "联系电话",
          //     value: "phone",
          //   },
          //   {
          //     label: "账号额度",
          //     value: "email",
          //   },
          //   {
          //     label: "绑定域名",
          //     value: "address",
          //   },
          // ];
          // exportExcel(tableDataList, "租户列表", columns);
        },
      },
    ],
  };

  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "添加租户",
    edit: "编辑租户",
    detail: "租户详情",
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
      label: "租户ID",
      labelWidth: "80px",
      vModel: "userId",
      editReadonly: true,
      placeholder: "请输入租户ID",
      prop: "userId",
      rules: [
        {
          required: true,
          message: "请输入租户ID",
          trigger: "blur",
        },
        {
          // validator: validateUserId,
          trigger: "blur",
        },
      ],
    },
    {
      label: "租户名称",
      labelWidth: "80px",
      vModel: "userName",
      placeholder: "请输入租户名称",
      prop: "userName",
      rules: [
        {
          required: true,
          message: "请输入租户名称",
          trigger: "blur",
        },
        {
          // validator: validateUserName,
          trigger: "blur",
        },
      ],
    },
    {
      label: "联系人",
      labelWidth: "80px",
      vModel: "fullName",
      placeholder: "请输入联系人",
      prop: "fullName",
      rules: [
        {
          // validator: validateFullName,
          trigger: "blur",
        },
      ],
    },
    {
      label: "联系电话",
      labelWidth: "80px",
      vModel: "phone",
      placeholder: "请输入联系电话",
      prop: "phone",
      rules: [
        {
          // validator: validatePhone,
          trigger: "blur",
        },
      ],
    },
    {
      label: "账号额度",
      labelWidth: "80px",
      vModel: "email",
      placeholder: "请输入账号额度",
      prop: "email",
      rules: [
        {
          // validator: validateEmail,
          trigger: "blur",
        },
      ],
    },
    {
      label: "绑定域名",
      labelWidth: "80px",
      vModel: "address",
      placeholder: "请输入绑定域名",
      prop: "address",
    },
    {
      label: "租户背景",
      labelWidth: "80px",
      vModel: "address",
      placeholder: "请输入租户背景",
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
        message.success("租户修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addUser", row);
      addUser(row).then(() => {
        message.success("租户创建成功");
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
      content: `你真的删除【${item.userName}】的租户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteUser(item.id).then(() => {
          message.success("租户删除成功");
          done();
        });
      },
    });
  };
  const handleResetPassword = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的重置【${item.userName}】租户的密码吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        resetUserPassword(item.id).then(() => {
          message.success("置租户密码重成功");
          done();
        });
      },
    });
  };
  const handleEnable = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的启用【${item.userName}】的租户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        enableUser(item.id).then(() => {
          message.success("租户启用成功");
          done();
        });
      },
    });
  };
  const handleDisable = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的禁用【${item.userName}】的租户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        disableUser(item.id).then(() => {
          message.success("租户启用成功");
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
      label: "租户编号",
      prop: "userId",
    },
    {
      label: "租户名称",
      prop: "userName",
      // edit: true,
    },
    {
      label: "联系人",
      prop: "fullName",
    },
    {
      label: "联系电话",
      prop: "phone",
    },
    {
      label: "账号额度",
      prop: "email",
    },
    // {
    //   label: "启用",
    //   prop: "enabled",
    //   render: (value: number) => {
    //     return value === 1 ? "启用" : "禁用";
    //   },
    // },
    {
      label: "过期时间",
      prop: "createTime",
    },
    {
      label: "绑定域名",
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
        displayNumber={true}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
        onBatchDelete={handleBatchDelete}
      ></Crud>
    </div>
  );
};

export default Tenant;
