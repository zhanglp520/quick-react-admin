import {
  addApi,
  batchDeleteApi,
  deleteApi,
  getApiPageList,
  updateApi,
} from "@/api/system/api";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import { IApi, ISearchApi, IApiPermissionButton } from "@/types";
import { validatePermission } from "@/utils";
import {
  Crud,
  IActionbar,
  IColumn,
  IDialogTitle,
  IFormItem,
  IPage,
  IToolbar,
} from "@ainiteam/quick-react-ui";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Api: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  const [dataList, setDataList] = useState<IApi[]>();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: IApiPermissionButton } =
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
   * 搜索
   */
  const searchForm: ISearchApi = {
    keyword: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "",
      vModel: "keyword",
      placeholder: "接口名称|接口编号|接口地址",
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
      content: `你真的删除选择的接口吗？`,
      onOk() {
        batchDeleteApi(ids).then(() => {
          message.success("接口删除成功");
          done();
        });
      },
    });
  };
  const handlePrint = () => {
    window.print();
  };
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
  const handleDelete = (item: IApi, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.apiName}】的接口吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteApi(item.id).then(() => {
          message.success("接口删除成功");
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 150,
    hiddenEditButton: !validatePermission(permissionBtn?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn?.detail),
  };
  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "50",
      type: "selection",
    },
    // {
    //   width: "60",
    //   type: "index",
    //   label: "序号",
    // },
    {
      label: "接口编号",
      prop: "apiId",
      width: "200",
    },
    {
      label: "接口名称",
      prop: "apiName",
      width: "200",
    },
    {
      label: "接口地址",
      prop: "apiPath",
      width: "300",
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: "200",
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
    getApiPageList(parmas)
      .then((res) => {
        setLoading(false);
        const { data: apiList, total } = res;
        console.log("apiList", apiList);
        if (apiList) {
          setDataList([...apiList]);
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
  const dialogTitle: IDialogTitle = {
    add: "添加接口",
    edit: "编辑接口",
    detail: "接口详情",
  };
  const formModel: IApi = {
    id: undefined,
    apiId: "",
    apiName: "",
    apiPath: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "接口编号",
      labelWidth: "80px",
      vModel: "apiId",
      editReadonly: true,
      placeholder: "请输入接口编号",
      prop: "apiId",
      rules: [
        {
          required: true,
          message: "请输入接口编号",
          trigger: "blur",
        },
      ],
    },
    {
      label: "接口名称",
      labelWidth: "80px",
      vModel: "apiName",
      placeholder: "请输入接口名称",
      prop: "apiName",
      rules: [
        {
          required: true,
          message: "请输入接口名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "接口地址",
      labelWidth: "80px",
      vModel: "apiPath",
      placeholder: "请输入接口地址",
      prop: "apiPath",
      rules: [
        {
          required: true,
          message: "请输入接口地址",
          trigger: "blur",
        },
      ],
    },
    {
      label: "备注",
      labelWidth: "80px",
      vModel: "remark",
      placeholder: "备注",
      type: "textarea",
      prop: "remark",
    },
  ];
  const handleFormSubmit = (form: IApi, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateApi", row);
      updateApi(row).then(() => {
        message.success("接口修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addApi", row);
      addApi(row).then(() => {
        message.success("接口创建成功");
        done();
      });
    }
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
        tableData={dataList}
        tableColumns={tableColumns}
        tableActionbar={tableActionbar}
        tableToolbar={tableToolbar}
        searchFormItems={searchFormItems}
        searchFormModel={searchForm}
        pagebar={page}
        loading={loading}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
        onBatchDelete={handleBatchDelete}
        onPrint={handlePrint}
      ></Crud>
    </div>
  );
};

export default Api;
