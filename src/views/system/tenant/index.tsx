import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import {
  ApartmentOutlined,
  ContainerOutlined,
  ExclamationCircleFilled,
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
import { ISearchUser, ITenant, IUserPermissionButton } from "@/types";
import {
  getTenantList,
  addTenant,
  updateTenant,
  deleteTenant,
} from "@/api/system/tenant";
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
  // useEffect(() => {
  //   dispatch(getPermissionBtns(activeTab));
  // }, []);
  const { permissionBtn }: { permissionBtn: IUserPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<ITenant[]>([]);

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
      label: "编码",
      vModel: "keyword",
      placeholder: "租户编码",
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

  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: !validatePermission(permissionBtn?.batchDelete),
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenAddButton: false,
    // hiddenAddButton: !validatePermission(permissionBtn?.add),
    hiddenPrintButton: true,
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

  const formModel: ITenant = {
    id: undefined,
    tenantCode: "1",
    tenantName: "2",
    contacts: "3",
    phone: "4",
    balance: "5",
    // expire: "2024-06-03T16:00:00.000Z",
    expire: 0,
    dbHost: "",
    dbPort: "",
    dbName: "",
    dbUsername: "",
    dbPassword: "",
    dbType: 0,
    deleted: "",
    createTime: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "租户编号",
      vModel: "tenantCode",
      editReadonly: true,
      placeholder: "请输入租户编号",
      prop: "tenantCode",
      rules: [
        {
          required: true,
          message: "请输入租户编号",
          trigger: "blur",
        },
      ],
    },
    {
      label: "租户名称",
      vModel: "tenantName",
      placeholder: "请输入租户名称",
      prop: "tenantName",
      rules: [
        {
          required: true,
          message: "请输入租户名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "联系人",
      vModel: "contacts",
      placeholder: "请输入联系人",
      prop: "contacts",
    },
    {
      label: "联系电话",

      vModel: "phone",
      placeholder: "请输入联系电话",
      prop: "phone",
    },
    {
      label: "账号额度",
      vModel: "balance",
      placeholder: "请输入账号额度",
      prop: "balance",
      rules: [
        {
          required: true,
          message: "请输入账号额度",
          trigger: "blur",
        },
      ],
    },
    {
      label: "过期时间",
      vModel: "expire",
      placeholder: "请输入过期时间",
      prop: "expire",
      type: "datepicker",
      rules: [
        {
          required: true,
          message: "请输入过期时间",
          trigger: "blur",
        },
      ],
    },
    {
      label: "地址",
      vModel: "dbHost",
      placeholder: "请输入数据服务器地址",
      prop: "dbHost",
      rules: [
        {
          required: true,
          message: "请输入数据服务器地址",
          trigger: "blur",
        },
      ],
    },
    {
      label: "端口号",
      vModel: "dbPort",
      placeholder: "请输入数据库端口号",
      prop: "dbPort",
      rules: [
        {
          required: true,
          message: "请输入数据库端口号",
          trigger: "blur",
        },
      ],
    },
    {
      label: "名称",
      vModel: "dbName",
      placeholder: "请输入数据库名称",
      prop: "dbName",
      rules: [
        {
          required: true,
          message: "请输入数据库名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "账号",
      vModel: "dbUsername",
      placeholder: "请输入数据库账号",
      prop: "dbUsername",
      rules: [
        {
          required: true,
          message: "请输入数据库账号",
          trigger: "blur",
        },
      ],
    },
    {
      label: "密码",
      vModel: "dbPassword",
      placeholder: "请输入数据库密码",
      prop: "dbPassword",
      rules: [
        {
          required: true,
          message: "请输入数据库密码",
          trigger: "blur",
        },
      ],
    },
    {
      label: "类型",
      vModel: "dbType",
      editReadonly: true,
      placeholder: "请输入数据库类型",
      prop: "dbType",
      rules: [
        {
          required: true,
          message: "请输入数据库类型",
          trigger: "blur",
        },
      ],
    },
    // {
    //   label: "绑定域名",
    //
    //   vModel: "address",
    //   placeholder: "请输入绑定域名",
    //   prop: "address",
    // rules: [
    //   {
    //     required: true,
    //     message: "请输入绑定域名",
    //     trigger: "blur",
    //   },
    // ],
    // },

    {
      label: "备注",

      vModel: "remark",
      placeholder: "请输入备注",
      type: "textarea",
      prop: "remark",
    },
  ];
  const handleFormSubmit = (form: ITenant, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateTenant", row);
      updateTenant(row).then(() => {
        message.success("租户修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addTenant", row);
      addTenant(row).then(() => {
        message.success("租户创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: ITenant, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.tenantName}】的租户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteTenant(item.id).then(() => {
          message.success("租户删除成功");
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 300,
    // hiddenEditButton: !validatePermission(permissionBtn?.edit),
    // hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn?.detail),
  };

  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      label: "租户编码",
      prop: "tenantCode",
    },
    {
      label: "租户名称",
      prop: "tenantName",
      // edit: true,
    },
    {
      label: "联系人",
      prop: "contacts",
    },
    {
      label: "联系电话",
      prop: "phone",
    },
    {
      label: "账号额度",
      prop: "balance",
    },
    {
      label: "过期时间",
      prop: "expire",
    },
    {
      label: "地址",
      prop: "dbHost",
    },
    {
      label: "端口号",
      prop: "dbPort",
    },
    {
      label: "数据库名称",
      prop: "dbName",
    },
    {
      label: "数据库账号",
      prop: "dbUsername",
    },
    {
      label: "数据库类型",
      prop: "dbType",
    },
    {
      label: "删除",
      prop: "deleted",
    },

    {
      label: "创建时间",
      prop: "createTime",
    },
    // {
    //   label: "绑定域名",
    //   prop: "address",
    // },
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
    getTenantList(parmas)
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
      ></Crud>
    </div>
  );
};

export default Tenant;
