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
  ISearchDataSource,
  IDataSource,
  IDataSourcePermissionButton,
} from "@/types";
import {
  getDataSourcesList,
  addDataSource,
  updateDataSource,
  deleteDataSource,
} from "@/api/developerTools/generator/dataSource";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";

const DataSource: React.FC = () => {
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
  const { permissionBtn }: { permissionBtn: IDataSourcePermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IDataSource[]>([]);

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
  const searchForm: ISearchDataSource = {
    keyword: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "数据源",
      vModel: "keyword",
      placeholder: "数据源名称",
    },
    {
      label: "编号",
      vModel: "keyword",
      placeholder: "数据源编号",
    },
  ];

  /**
   * 工具栏
   */

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
    add: "添加数据源",
    edit: "编辑数据源",
    detail: "数据源详情",
  };
  const formModel: IDataSource = {
    id: undefined,
    dsId: "",
    dsName: "",
    dbAddress: "",
    dbPort: "",
    dbName: "",
    dbAccount: "",
    dbPassword: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "数据源编码",
      labelWidth: "80px",
      vModel: "dsId",
      editReadonly: true,
      placeholder: "请输入数据源编码",
      prop: "dsId",
      rules: [
        {
          required: true,
          message: "请输入数据源编码",
          trigger: "blur",
        },
      ],
    },
    {
      label: "数据源名称",
      labelWidth: "80px",
      vModel: "dsName",
      placeholder: "请输入数据源名称",
      prop: "dsName",
      rules: [
        {
          required: true,
          message: "请输入数据源名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "数据库地址",
      labelWidth: "80px",
      vModel: "dbAddress",
      placeholder: "请输入数据库地址",
      prop: "dbAddress",
      rules: [
        {
          trigger: "blur",
        },
      ],
    },
    {
      label: "数据库端口",
      labelWidth: "80px",
      vModel: "dbPort",
      placeholder: "请输入数据库端口",
      prop: "dbPort",
    },
    {
      label: "数据库名称",
      labelWidth: "80px",
      vModel: "dbName",
      placeholder: "请输入数据库名称",
      prop: "dbName",
      rules: [
        {
          trigger: "blur",
        },
      ],
    },
    {
      label: "数据库账号",
      labelWidth: "80px",
      vModel: "dbAccount",
      placeholder: "请输入数据库账号",
      prop: "dbAccount",
      rules: [
        {
          trigger: "blur",
        },
      ],
    },
    {
      label: "数据库密码",
      labelWidth: "80px",
      vModel: "dbPassword",
      placeholder: "请输入数据库密码",
      prop: "dbPassword",
      rules: [
        {
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
  const handleFormSubmit = (form: IDataSource, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateDataSource", row);
      updateDataSource(row).then(() => {
        message.success("数据源修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addDataSource", row);
      addDataSource(row).then(() => {
        message.success("数据源创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: IDataSource, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.dsName}】的数据源吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteDataSource(item.id).then(() => {
          message.success("数据源删除成功");
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
  };

  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      label: "数据源编号",
      prop: "dsId",
    },
    {
      label: "数据源名称",
      prop: "dsName",
      // edit: true,
    },
    {
      label: "数据库地址",
      prop: "dbAddress",
    },
    {
      label: "数据源端口",
      prop: "dbPort",
    },
    {
      label: "数据源名称",
      prop: "dbName",
    },
    {
      label: "数据源账号",
      prop: "dbAccount",
    },
    {
      label: "数据源密码",
      prop: "dbPassword",
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
    getDataSourcesList(parmas)
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

export default DataSource;
