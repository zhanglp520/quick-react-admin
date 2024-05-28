import { deleteRole } from "@/api/system/role";
import {
  addUser,
  deleteUser,
  downloadFileStream,
  getUserPageList,
  updateUser,
} from "@/api/system/user";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import { IUser, IUserPermissionButton } from "@/types";
import { validatePermission } from "@/utils";
import { downloadExcel } from "@/utils/download";
import {
  IActionbar,
  IColumn,
  IFormItem,
  IPage,
  IToolbar,
  Crud,
  IDialogTitle,
} from "@ainiteam/quick-react-ui";
import {
  DownloadOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { Modal, message, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeView from "./codeView";
const Generator: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  const [dialogConfigVisible, setDialogConfigVisible] = useState(false);
  const [dialogViewVisible, setDialogViewVisible] = useState(false);
  const [tableDataList, setTableDataList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: IUserPermissionButton } =
    useSelector((state: RootState) => state.user);
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
  /**
   * 表单
   */
  const dialogTitle = {
    add: "新增角色",
    edit: "编辑角色",
    detail: "角色详情",
  };
  const validateUserId = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^YH_\d+$/;
    if (!reg.test(value)) {
      callback(new Error("用户编号必须是以YH_开头和数字组合"));
    } else {
      callback();
    }
  };
  const validateUserName = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^[a-zA-Z0-9]{4,16}$/;
    if (!reg.test(value)) {
      callback(new Error("用户必须是4-16位的字母、数字"));
    } else {
      callback();
    }
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
      label: "项目编号",
      labelWidth: "80px",
      vModel: "userId",
      editReadonly: true,
      addHidden: true,
      placeholder: "请输入用户编号",
      prop: "userId",
      rules: [
        {
          required: true,
          message: "请输入用户编号",
          trigger: "blur",
        },
        {
          validator: validateUserId,
          trigger: "blur",
        },
      ],
    },
    {
      label: "项目名称",
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
          validator: validateUserName,
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
  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "50",
      type: "selection",
    },
    {
      width: "60",
      type: "index",
      label: "序号",
    },
    {
      width: "100",
      label: "项目编号",
      prop: "userId",
    },
    {
      width: "500",
      label: "保存路径",
      prop: "fullName",
    },
    {
      width: "120",
      label: "创建人",
      prop: "phone",
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
  const tableActionbar: IActionbar = {
    width: 300,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenDetailButton: true,
    btns: [
      {
        name: "配置",
        // hidden: !validatePermission(permissionBtn?.config),
        click(item: IUser, done: any) {
          setDialogConfigVisible(true);
          console.log("11111", item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "生成",
        // hidden: !validatePermission(permissionBtn?.build),
        click(item: IUser, done: any) {
          handleBuild(item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "预览",
        // hidden: !validatePermission(permissionBtn?.view),
        click(item: IUser, done: any) {
          setDialogViewVisible(true);
          console.log("11111", item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "下载",
        // hidden: !validatePermission(permissionBtn?.view),
        click(item: IUser, done: any) {
          console.log("11111", item, done);
        },
        render() {
          return true;
        },
      },
    ],
  };
  const handleBuild = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: "",
      content: `你真的启用【${item.userName}】的用户吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        // deleteRole(item.id).then(() => {
        //   message.success("删除成功");
        //   done();
        // });
      },
    });
  };
  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: !validatePermission(permissionBtn?.add),
    position: "left",
    btns: [
      {
        name: "下载模板(浏览器下载方式)",
        position: "left",
        type: "primary",
        icon: <DownloadOutlined />,
        // hidden: !validatePermission(permissionBtn?.download),
        click() {
          window.location.href = `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/v2/downloads?filePath=templates/用户模板.xlsx`;
        },
      },
      {
        name: "下载模板(流文件方式)",
        position: "left",
        icon: <DownloadOutlined />,
        type: "primary",
        // hidden: !validatePermission(permissionBtn?.download),
        click() {
          downloadFileStream("templates/用户模板.xlsx").then((res) => {
            downloadExcel(res, "用户导入模板");
          });
        },
      },
      {
        name: "导入(前端方式)",
        position: "left",
        icon: <ImportOutlined />,
        type: "warning",
        // hidden: !validatePermission(permissionBtn?.import),
        click() {
          // const fileBtn = uploadRef as HTMLInputElement;
          // fileBtn.click();
        },
      },
      {
        name: "导出(前端方式)",
        position: "left",
        icon: <ExportOutlined />,
        type: "danger",
        // hidden: !validatePermission(permissionBtn?.export),
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
   * 操作栏
   */
  const handleDelete = (item: IUser, done: any) => {
    confirm({
      title: "警告",
      icon: "",
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
  /**
   * 弹窗
   */
  const handleOk = () => {
    setDialogConfigVisible(false);
  };

  const handleCancel = () => {
    setDialogConfigVisible(false);
  };
  //   useEffect(() => {
  //     dispatch(getPermissionBtns(activeTab));
  //     loadData();
  //   }, []);
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
        pagebar={page}
        loading={loading}
        displayNumber={true}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
      ></Crud>
      <Modal
        title="配置"
        open={dialogConfigVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="30%"
      >
        <div>{/* <code-config></code-config> */}</div>
      </Modal>
      <Modal
        title="预览"
        open={dialogViewVisible}
        // onOk={handleOk}
        // onCancel={handleCancel}
        // width="30%"
      >
        <CodeView></CodeView>
      </Modal>
    </>
  );
};
export default Generator;
