import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IColumn,
  IActionbar,
  IToolbar,
  IFormItem,
  IPage,
  Crud,
} from "@ainiteam/quick-react-ui";
import { getLogPageList } from "@/api/system/log";
import { validatePermission } from "@/utils";
import { ILog, ISearchLog, ILogPermissionButton } from "@/types";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";

const Operate: React.FC = () => {
  /**
   * 属性
   */
  const [dataList, setDataList] = useState<ILog[]>();
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: ILogPermissionButton } =
    useSelector((state: RootState) => state.user);
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
  const searchForm: ISearchLog = {
    startTime: "",
    endTime: "",
    logTime: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "日志时间",
      vModel: "logTime",
      placeholders: ["开始时间", "结束时间"],
      type: "rangepicker",
    },
  ];
  /**
   * 工具栏
   */
  const tableToolbar: IToolbar = {
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenAddButton: true,
    hiddenPrintButton: true,
    hiddenBatchDeleteButton: true,
  };
  /**
   * 操作栏
   */
  const handleDetail = (item: ILog, done: any) => {
    const form: ILog = { ...item };
    if (form.request) {
      form.request = JSON.stringify(form.request, null, 4);
      done(form);
    }
    if (form.response) {
      form.response = JSON.stringify(form.response, null, 4);
      done(form);
    }
  };
  const tableActionbar: IActionbar = {
    width: 60,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenDetailButton: !validatePermission(permissionBtn?.detail),
  };
  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "50",
      type: "selection",
      align: "center",
    },
    {
      label: "日志时间",
      prop: "createTime",
      width: "200",
    },
    {
      label: "IP",
      prop: "ip",
      width: "120",
    },
    {
      label: "耗时（ms）",
      prop: "duration",
      width: "150",
    },
    {
      label: "操作人",
      prop: "operateId",
      width: "200",
    },
    {
      label: "请求类型",
      prop: "request",
      render: (value: any) => {
        return value.method;
      },
      width: "100",
    },
    {
      label: "请求接口",
      prop: "request",
      render: (value: any) => {
        return value.url;
      },
    },
  ];
  /**
   * 加载数据
   */
  const loadData = (params: any) => {
    let obj = {};
    const { logTime } = params;
    if (logTime) {
      obj = {
        ...params,
        type: 0,
        startTime: logTime[0],
        endTime: logTime[1],
      };
    } else {
      obj = { ...params, type: 0, logTime: null };
    }
    setLoading(true);
    getLogPageList(obj)
      .then((res) => {
        setLoading(false);
        const { data: logList, total } = res;
        console.log("logList", logList);
        if (logList) {
          setDataList([...logList]);
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
    detail: "日志详情",
  };
  const formModel: ILog = {
    id: undefined,
    type: 1,
    ip: "",
    request: "",
    response: "",
    duration: 0,
    operateId: "",
    createTime: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "编号",
      labelWidth: "80px",
      vModel: "id",
    },
    {
      label: "日志时间",
      labelWidth: "80px",
      vModel: "createTime",
    },
    {
      label: "IP",
      labelWidth: "80px",
      vModel: "ip",
    },
    {
      label: "耗时",
      labelWidth: "80px",
      vModel: "duration",
    },
    {
      label: "操作人ID",
      labelWidth: "80px",
      vModel: "operateId",
    },
    {
      label: "操作人",
      labelWidth: "80px",
      vModel: "operator",
    },
    {
      label: "请求参数",
      labelWidth: "80px",
      vModel: "request",
      type: "textarea",
    },
    {
      label: "响应",
      labelWidth: "80px",
      vModel: "response",
      type: "textarea",
    },
  ];
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
        onDetail={handleDetail}
      ></Crud>
    </div>
  );
};

export default Operate;
