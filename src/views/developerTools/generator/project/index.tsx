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
import {
  ISearchProjec,
  IProject,
  IProjecPermissionButton,
  ITab,
  IMenu,
} from "@/types";
import { batchDeleteUser } from "@/api/system/user";
import {
  addProject,
  updateProject,
  deleteProject,
  getProjectList,
  buildProjec,
} from "@/api/developerTools/generator/project";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";
import { addTab } from "@/store/modules/tab";

const Project: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: IProjecPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IProject[]>([]);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  let menuList: IMenu[] = [];

  if (user) {
    menuList = user.permissionMenuList;
  }

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
      label: "编码",
      vModel: "keyword",
      placeholder: "项目编码",
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
  const formModel: IProject = {
    id: undefined,
    projectId: undefined,
    projectName: "",
    dbId: "",
    author: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "项目编码",
      labelWidth: "80px",
      vModel: "projectCode",
      editReadonly: true,
      placeholder: "请输入项目编码",
      prop: "projectCode",
      rules: [
        {
          required: true,
          message: "请输入项目编码",
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
      ],
    },
    {
      label: "数据源编码",
      labelWidth: "80px",
      vModel: "dbCode",
      placeholder: "请输入数据源编码",
      prop: "dbCode",
    },
    {
      label: "作者",
      labelWidth: "80px",
      vModel: "author",
      placeholder: "请输入作者",
      prop: "author",
      rules: [],
    },

    {
      label: "创建时间",
      labelWidth: "80px",
      vModel: "createTime",
      placeholder: "请输入创建时间",
      prop: "createTime",
      addHidden: true,
      editHidden: true,
      detailHidden: true,
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
  const handleFormSubmit = (form: IProject, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateProject", row);
      updateProject(row).then(() => {
        message.success("项目修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addProject", row);
      addProject(row).then(() => {
        message.success("项目创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: IProject, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.projectName}】的项目吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteProject(item.id).then(() => {
          message.success("项目删除成功");
          done();
        });
      },
    });
  };
  const handleBuild = (item: IProject, done: any) => {
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
        click(item: IProject, done: any) {
          handleBuild(item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "模块管理",
        // hidden: !validatePermission(permissionBtn?.build),
        click(item: IProject) {
          const menu = menuList.find((x) => x.menuName == "模块管理");
          if (menu) {
            const { id, menuName, path } = menu;
            const pathData = path.split("/:");
            const tab: ITab = {
              id: id?.toString(),
              name: menuName,
              path: `${pathData[0]}/${item.id}`,
            };
            dispatch(addTab(tab));
            navigate(`/developerTools/generator/module/${item.id}`);
          }
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
      label: "项目编码",
      prop: "projectCode",
    },
    {
      label: "项目名称",
      prop: "projectName",
      // edit: true,
    },
    {
      label: "数据源编码",
      prop: "dbCode",
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
        // page.total = total;
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
  }, []);
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
