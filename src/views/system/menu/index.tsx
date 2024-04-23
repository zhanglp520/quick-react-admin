import { useState } from "react";
import { Modal, message } from "antd";
// import "@/assets/iconfont/quickIconFont.js";
// import quickIconFont from "@/config/quickIconFont.json";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  IColumn,
  IFormItem,
  IPage,
  Crud,
  IDialogTitle,
  IOptions,
} from "@ainiteam/quick-react-ui";
// import "./index.less";
import { ISearchUser, IMenu } from "@/types";
import {
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUser,
} from "@/api/system/user";
import {
  getMenuList,
  addMenu,
  updateMenu,
  deleteMenu,
} from "@/api/system/menu";
import { AppDispatch, RootState } from "@/store";
/**导入项目文件 */
import {
  listToSelectTree,
  listToTableTree,
  validatePermission,
} from "@/utils/index";
const Menu: React.FC = () => {
  const { confirm } = Modal;

  /**
   * 属性
   */
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IMenu[]>([]);
  const [parentTreeData, setParentTreeData] = useState<Array<IOptions>>([]);
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
      label: "菜单名称",
      vModel: "keyword",
      placeholder: "请输入菜单名称",
    },
  ];

  const handleBatchDelete = (data: any, done: any) => {
    const { ids } = data;
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: "你真的删除选择的菜单吗？",
      onOk() {
        batchDeleteUser(ids).then(() => {
          message.success("菜单删除成功");
          done();
        });
      },
    });
  };

  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "创建菜单",
    edit: "编辑菜单",
    detail: "菜单详情",
  };
  const formModel: IMenu = {
    id: undefined,
    menuId: "",
    menuName: "",
    path: "",
    viewPath: "",
    menuType: 0,
    icon: "",
    sort: 0,
    pId: undefined,
    link: 0,
    linkUrl: "",
    enabled: true,
    status: true,
    cache: true,
  };
  const formItems: IFormItem[] = [
    {
      label: "菜单编号",
      labelWidth: "80px",
      vModel: "menuId",
      placeholder: "请输入菜单编号",
      editReadonly: true,
      prop: "menuId",
      width: "400px",
      rules: [
        {
          required: true,
          message: "请输入菜单编号",
          trigger: "blur",
        },
      ],
    },
    {
      label: "菜单名称",
      labelWidth: "80px",
      vModel: "menuName",
      placeholder: "请输入菜单名称",
      prop: "menuName",
      width: "400px",
      rules: [
        {
          required: true,
          message: "请输入菜单名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "菜单类型",
      labelWidth: "80px",
      vModel: "menuType",
      placeholder: "请选择菜单类型",
      prop: "menuType",
      type: "select",
      width: "400px",
      options: [
        {
          label: "目录",
          value: 0,
        },
        {
          label: "菜单",
          value: 1,
        },
        {
          label: "按钮",
          value: 2,
        },
      ],
      rules: [
        {
          required: true,
          message: "请选择菜单类型",
          trigger: "change",
        },
      ],
    },
    {
      label: "菜单图标",
      labelWidth: "80px",
      vModel: "icon",
      placeholder: "请选择菜单图标",
      prop: "icon",
      type: "icon",
      // iconOptions: [
      //   {
      //     label: "quick官网",
      //     data: quickIconFont,
      //   },
      // ],
      width: "400px",
      select: (val) => {
        formModel.icon = val;
      },
    },
    {
      label: "路由地址",
      labelWidth: "80px",
      vModel: "path",
      placeholder: "请输入路由地址",
      width: "400px",
      prop: "path",
    },
    {
      label: "视图路径",
      labelWidth: "80px",
      vModel: "viewPath",
      placeholder: "请输入视图路径",
      width: "400px",
      prop: "viewPath",
    },
    {
      label: "排序",
      labelWidth: "80px",
      vModel: "sort",
      placeholder: "请输入排序",
      prop: "sort",
      width: "400px",
    },
    {
      label: "父级菜单",
      labelWidth: "80px",
      vModel: "pId",
      placeholder: "请选择父级菜单",
      type: "treeselect",
      options: parentTreeData,
      width: "400px",
      prop: "pId",
    },
    {
      label: "缓存",
      labelWidth: "80px",
      vModel: "cache",
      prop: "cache",
      type: "switch",
      width: "400px",
    },
    {
      label: "启用",
      labelWidth: "80px",
      vModel: "enabled",
      prop: "enabled",
      type: "switch",
      width: "400px",
    },
    {
      label: "显示",
      labelWidth: "80px",
      vModel: "status",
      prop: "status",
      type: "switch",
      width: "400px",
    },
    {
      label: "外链",
      labelWidth: "80px",
      vModel: "link",
      placeholder: "外链",
      prop: "link",
      type: "switch",
      width: "400px",
    },
    {
      label: "链接地址",
      labelWidth: "80px",
      vModel: "linkUrl",
      placeholder: "链接地址",
      width: "400px",
      prop: "linkUrl",
    },
  ];
  const handleFormSubmit = (form: IMenu, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateUser", row);
      updateUser(row).then(() => {
        message.success("菜单修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addUser", row);
      addUser(row).then(() => {
        message.success("菜单创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: IMenu, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.userName}】的菜单吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteUser(item.id).then(() => {
          message.success("菜单删除成功");
          done();
        });
      },
    });
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
      label: "菜单编号",
      prop: "menuId",
      width: "200",
    },
    {
      label: "菜单名称",
      prop: "menuName",
      width: "200",
      fixed: true,
    },
    {
      label: "路由地址",
      prop: "path",
      width: "200",
    },
    {
      label: "视图路径",
      prop: "viewPath",
      width: "200",
    },
    {
      label: "菜单类型",
      prop: "menuType",
      width: "200",
      format: (row: IMenu) => {
        console.log("菜单类型", row);

        if (row.menuType === 0) {
          return "目录";
        }
        if (row.menuType === 1) {
          return "菜单";
        }
        if (row.menuType === 2) {
          return "按钮";
        }
        return "";
      },
    },
    {
      label: "菜单图标",
      prop: "icon",
      width: "200",
    },
    {
      label: "菜单排序",
      prop: "sort",
      width: "200",
    },
    {
      label: "缓存",
      prop: "cache",
      width: "200",
      format: (row: IMenu) => {
        return row.cache ? "缓存" : "不缓存";
      },
    },
    {
      label: "显示",
      prop: "status",
      width: "200",
      format: (row: IMenu) => {
        return row.status ? "显示" : "不显示";
      },
    },
    {
      label: "启用",
      prop: "enabled",
      width: "200",
      format: (row: IMenu) => {
        return !row.enabled ? "启用" : "禁用";
      },
    },
    {
      label: "是否外链",
      prop: "link",
      width: "200",
      format: (row: IMenu) => {
        return row.link === 1 ? "外链" : "非外链";
      },
    },
  ];

  /**
   * 加载父级菜单下拉框
   * @param data 菜单数据
   */
  const loadParentMenuData = (data: IMenu[]) => {
    const parentMenuList = data.filter((x: IMenu) => x.menuType !== 2);
    const parentTree = listToSelectTree(parentMenuList, 0, {
      value: "id",
      label: "menuName",
    });

    // useState(parentTreeData)
    // parentTreeData.length = 0;
    setParentTreeData([...parentTree]);
    console.log("父级菜单", parentTree);
  };

  /**
   * 加载数据
   */
  const loadData = () => {
    setLoading(true);
    getMenuList().then((res) => {
      setLoading(false);
      const { data: menuList } = res;
      console.log("menuList", menuList);
      loadParentMenuData(menuList);
      const menuTree = listToTableTree(menuList, 0, {
        pId: "pId",
      });

      setTableDataList([...menuTree]);
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

export default Menu;
