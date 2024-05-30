import { useEffect, useState } from "react";
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
import { validatePermission } from "@/utils";
import { ISearchProjec, IProjec, IProjecPermissionButton } from "@/types";
import {
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUser,
} from "@/api/system/user";
import {
  getProjectList,
  buildProjec,
} from "@/api/developerTools/generator/project";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";

const Project: React.FC = () => {
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
  const { permissionBtn }: { permissionBtn: IProjecPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IProjec[]>([]);

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
  const searchForm: ISearchProjec = {
    keyword: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "项目",
      vModel: "keyword",
      placeholder: "项目名称",
    },
    {
      label: "编号",
      vModel: "keyword",
      placeholder: "项目编号",
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
      content: "你真的删除选择的项目吗？",
      onOk() {
        batchDeleteUser(ids).then(() => {
          message.success("项目删除成功");
          done();
        });
      },
    });
  };
  const tableToolbar: IToolbar = {
    // importButtonName: "导入（默认后端方式）",
    // exportButtonName: "导出（默认后端方式）",
    hiddenBatchDeleteButton: !validatePermission(permissionBtn?.batchDelete),
    hiddenImportButton: true,
    hiddenExportButton: true,
    // hiddenAddButton: !validatePermission(permissionBtn?.add),
    hiddenPrintButton: true,
    position: "left",
  };

  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "添加项目",
    edit: "编辑项目",
    detail: "项目详情",
  };
  const formModel: IProjec = {
    id: undefined,
    projectId: undefined,
    projectName: "",
    dbId: "",
    author: "",
    createTime: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "项目编码",
      labelWidth: "80px",
      vModel: "projectId",
      editReadonly: true,
      placeholder: "请输入项目编码",
      prop: "projectId",
      rules: [
        {
          required: true,
          message: "请输入项目编码",
          trigger: "blur",
        },
        {
          // validator: validateUserId,
          trigger: "blur",
        },
      ],
    },
    {
      label: "项目名称",
      labelWidth: "80px",
      vModel: "projectName",
      placeholder: "请输入项目名称",
      prop: "projectName",
      rules: [
        {
          required: true,
          message: "请输入项目名称",
          trigger: "blur",
        },
        {
          // validator: validateUserName,
          trigger: "blur",
        },
      ],
    },
    {
      label: "数据源编码",
      labelWidth: "80px",
      vModel: "dbId",
      placeholder: "请输入数据源编码",
      prop: "dbId",
      rules: [
        {
          // validator: validateFullName,
          trigger: "blur",
        },
      ],
    },
    {
      label: "作者",
      labelWidth: "80px",
      vModel: "author",
      placeholder: "请输入作者",
      prop: "author",
      rules: [
        {
          // validator: validateFullName,
          trigger: "blur",
        },
      ],
    },

    {
      label: "创建时间",
      labelWidth: "80px",
      vModel: "createTime",
      placeholder: "请输入创建时间",
      prop: "createTime",
      rules: [
        {
          // validator: validatePhone,
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
  const handleFormSubmit = (form: IProjec, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateUser", row);
      updateUser(row).then(() => {
        message.success("项目修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addUser", row);
      addUser(row).then(() => {
        message.success("项目创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: IProjec, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.projectName}】的项目吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteUser(item.id).then(() => {
          message.success("项目删除成功");
          done();
        });
      },
    });
  };
  const handleBuild = (item: IProjec, done: any) => {
    confirm({
      title: "警告",
      icon: "",
      content: `你真的确定生成【${item.projectName}】项目吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        buildProjec(item.id).then(() => {
          message.success("项目生成成功");
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 300,
    // hiddenEditButton: !validatePermission(permissionBtn?.edit),
    // hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    // hiddenDetailButton: !validatePermission(permissionBtn?.detail),
    btns: [
      {
        name: "生成",
        // hidden: !validatePermission(permissionBtn?.build),
        click(item: IProjec, done: any) {
          handleBuild(item, done);
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
      label: "项目编号",
      prop: "projectId",
    },
    {
      label: "项目名称",
      prop: "projectName",
      // edit: true,
    },
    {
      label: "数据源编码",
      prop: "dbId",
    },
    {
      label: "作者",
      prop: "author",
    },

    {
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
    getProjectList(parmas)
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

export default Project;
