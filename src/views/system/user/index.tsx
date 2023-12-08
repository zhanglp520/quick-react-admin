import AiniCrud, { Title } from "@/components/AiniCrud";
import { ISearchUser, IUser } from "@/types";
import { IColumn, IFormItem, IPage } from "@ainiteam/quick-vue3-ui";
import { useState } from "react";
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
import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const User: React.FC = () => {
  const { confirm } = Modal;

  /**
   * 属性
   */
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IUser[]>([
    {
      id: 116,
      userId: "YH_0003",
      userName: "test",
      avatar: null,
      fullName: "测试",
      phone: "",
      email: "",
      address: "",
      deleted: 0,
      enabled: 1,
      createTime: "2023-09-21 11:28:35",
      remark: "",
    },
    {
      id: 115,
      userId: "YH_0002",
      userName: "user",
      avatar: null,
      fullName: "普通用户",
      phone: "",
      email: "",
      address: "",
      deleted: 0,
      enabled: 1,
      createTime: "2023-09-21 11:27:28",
      remark: "",
    },
    {
      id: 114,
      userId: "YH_0001",
      userName: "admin",
      avatar: null,
      fullName: "管理员",
      phone: "15229380174",
      email: "zhanglp15229380174@163.com",
      address: "北京",
      deleted: 0,
      enabled: 1,
      createTime: "2023-09-19 11:01:20",
      remark: "管理员（请误删）",
    },
  ]);

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
      label: "",
      vModel: "keyword",
      placeholder: "用户名|手机号",
    },
  ];

  /**
   * 导入
   */
  // const [dialogVisible, setDialogVisible] = useState(false);
  const handleImport = () => {
    // setDialogVisible(true);
  };

  /**
   * 工具栏
   */
  const handleExport = () => {
    exportUser().then((res) => {
      // downloadExcel(res, "用户列表");
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

  /**
   * 表单
   */
  const dialogTitle: Title = {
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
   * 表格
   */
  const tableColumns: IColumn[] = [
    // {
    //   width: "50",
    //   type: "selection",
    // },
    // {
    //   width: "60",
    //   type: "index",
    //   label: "序号",
    // },
    {
      width: "100",
      label: "用户编号",
      prop: "userId",
    },
    {
      width: "100",
      label: "用户名",
      prop: "userName",
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
      format: (row: IUser) => {
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
          tableDataList.length = 0;
          tableDataList.push(...userList);
        }
        page.total = total;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <AiniCrud
        dialogTitle={dialogTitle}
        formModel={formModel}
        formItems={formItems}
        tableData={tableDataList}
        tableColumns={tableColumns}
        tableActionbar={false}
        tableToolbar={false}
        searchFormItems={searchFormItems}
        searchFormModel={searchForm}
        page={page}
        loading={false}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        // @on-delete="handleDelete"
        onBatchDelete={handleBatchDelete}
        onImport={handleImport}
        onExport={handleExport}
        onPrint={handlePrint}
      ></AiniCrud>
    </div>
  );
};

export default User;
