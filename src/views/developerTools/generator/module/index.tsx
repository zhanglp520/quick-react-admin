import { downloadFileStream } from "@/api/system/user";
import {
  getModuleList,
  buildModule,
  addModule,
  updateModule,
  deleteModule,
} from "@/api/developerTools/generator/module";
import { AppDispatch, RootState } from "@/store";

import { IModule, IModulePermissionButton } from "@/types";
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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeView from "./codeView";
import { useParams } from "react-router-dom";
import CodeConfig from "./codeConfig";

const Module: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  const [dialogConfigVisible, setDialogConfigVisible] = useState(false);
  const [dialogViewVisible, setDialogViewVisible] = useState(false);
  const [tableDataList, setTableDataList] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: IModulePermissionButton } =
    useSelector((state: RootState) => state.user);
  const { projectId } = useParams();
  const CodeConfigRef = useRef(null);
  const [form, setForm] = useState({});
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
  const loadData = (params: object) => {
    setLoading(true);
    const obj = {
      ...params,
      projectId,
    };

    getModuleList(obj)
      .then((res) => {
        setLoading(false);
        const { data: moduleList, total } = res;
        console.log("moduleList", moduleList);
        if (moduleList) {
          setTableDataList([...moduleList]);
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
    add: "新增模块",
    edit: "编辑模块",
    detail: "模块详情",
  };
  const validateModuleId = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^MK_\d+$/;
    if (!reg.test(value)) {
      callback(new Error("模块编号必须是以MK_开头和数字组合"));
    } else {
      callback();
    }
  };
  const validateModuleName = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^[a-zA-Z0-9]{4,16}$/;
    if (!reg.test(value)) {
      callback(new Error("模块必须是4-16位的字母、数字"));
    } else {
      callback();
    }
  };
  const formModel: IModule = {
    id: undefined,
    projectId: undefined,
    moduleId: "",
    moduleName: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "模块编号",
      labelWidth: "80px",
      vModel: "moduleId",
      placeholder: "请输入模块编号",
      prop: "moduleId",
      rules: [
        {
          required: true,
          message: "请输入模块编号",
          trigger: "blur",
        },
        // {
        //   validator: validateModuleId,
        //   trigger: "blur",
        // },
      ],
    },
    {
      label: "模块名称",
      labelWidth: "80px",
      vModel: "moduleName",
      placeholder: "请输入模块名",
      prop: "moduleName",
      rules: [
        {
          required: true,
          message: "请输入模块名",
          trigger: "blur",
        },
        // {
        //   validator: validateModuleName,
        //   trigger: "blur",
        // },
      ],
    },
    {
      label: "项目编号",
      labelWidth: "80px",
      vModel: "projectId",
      placeholder: "请输入项目编号",
      prop: "projectId",
      addHidden: true,
      editHidden: true,
      rules: [
        {
          required: true,
          message: "请输入项目编号",
          trigger: "blur",
        },
        {
          validator: validateModuleId,
          trigger: "blur",
        },
      ],
    },
    {
      label: "表名",
      labelWidth: "80px",
      vModel: "tableName",
      placeholder: "请输入表名",
      prop: "tableName",
      rules: [
        {
          required: true,
          message: "请输入表名",
          trigger: "blur",
        },
      ],
    },
    {
      label: "表描述",
      labelWidth: "80px",
      vModel: "tableComment",
      placeholder: "请输入表描述",
      prop: "tableComment",
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
  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      width: "50",
      type: "selection",
    },
    {
      width: "100",
      label: "模块编号",
      prop: "moduleId",
    },
    {
      width: "100",
      label: "项目编号",
      prop: "projectId",
    },
    {
      width: "100",
      label: "模块编号",
      prop: "moduleName",
    },
    {
      width: "100",
      label: "表名",
      prop: "tableName",
    },

    {
      width: "100",
      label: "表描述",
      prop: "tableComment",
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
  const handleFormSubmit = (form: IModule, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateModule", row);
      updateModule(row).then(() => {
        message.success("模块修改成功");

        done();
      });
    } else {
      row.id = undefined;
      console.log("addModule", row);
      const rowData = {
        ...row,
        projectId,
      };
      addModule(rowData).then(() => {
        message.success("模块创建成功");
        done();
      });
    }
  };
  const tableActionbar: IActionbar = {
    width: 350,
    hiddenEditButton: !validatePermission(permissionBtn?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn?.detail),
    btns: [
      {
        name: "配置",
        // hidden: !validatePermission(permissionBtn?.config),
        click(item: IModule, done: any) {
          setDialogConfigVisible(true);
          console.log("配置", item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "生成",
        // hidden: !validatePermission(permissionBtn?.build),
        click(item: IModule, done: any) {
          handleBuild(item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "预览",
        // hidden: !validatePermission(permissionBtn?.view),
        click(item: IModule, done: any) {
          setDialogViewVisible(true);
          console.log("预览", item, done);
        },
        render() {
          return true;
        },
      },
      {
        name: "下载",
        // hidden: !validatePermission(permissionBtn?.view),
        click(item: IModule, done: any) {
          console.log("下载", item, done);
        },
        render() {
          return true;
        },
      },
    ],
  };
  const handleBuild = (item: IModule, done: any) => {
    confirm({
      title: "警告",
      icon: "",
      content: `你真的确定生成【${item.moduleName}】模块吗？`,
      onOk() {
        if (!item.projectId || !item.id) {
          return;
        }
        buildModule(item.projectId).then(() => {
          message.success("模块生成成功");
          done();
        });
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
          }/api/v2/downloads?filePath=templates/模块模板.xlsx`;
        },
      },
      {
        name: "下载模板(流文件方式)",
        position: "left",
        icon: <DownloadOutlined />,
        type: "primary",
        // hidden: !validatePermission(permissionBtn?.download),
        click() {
          downloadFileStream("templates/模块模板.xlsx").then((res) => {
            downloadExcel(res, "模块导入模板");
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
              label: "模块编号",
              value: "moduleId",
            },
            {
              label: "模块名",
              value: "moduleName",
            },
            {
              label: "创建时间",
              value: "createTime",
            },
            {
              label: "备注",
              value: "remark",
            },
          ];
          exportExcel(tableDataList, "模块列表", columns);
        },
      },
    ],
  };
  /**
   * 操作栏
   */
  const handleDelete = (item: IModule, done: any) => {
    confirm({
      title: "警告",
      icon: "",
      content: `你真的删除【${item.moduleName}】的模块吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteModule(item.id).then(() => {
          message.success("模块删除成功");
          done();
        });
      },
    });
  };
  /**
   * 配置弹窗
   */
  const handleConfigOk = () => {
    setDialogConfigVisible(false);
  };

  const handleConfigCancel = () => {
    setDialogConfigVisible(false);
  };

  /**
   * 预览弹窗
   */
  const handleViewOk = () => {
    setDialogViewVisible(false);
  };

  const handleViewCancel = () => {
    setDialogViewVisible(false);
  };
  const saveConfig = () => {
    if (CodeConfigRef.current) {
      const ConfigData = CodeConfigRef.current.callChildMethod();
      setForm({ ...ConfigData });
    }
    setDialogConfigVisible(false);
  };
  // const handleGenerateOk = () => {
  //   if (CodeConfigRef.current) {
  //     const ConfigData = CodeConfigRef.current.callChildMethod();
  //     setForm({ ...ConfigData });
  //   }
  // };

  useEffect(() => {
    console.log("ConfigData", form);
    console.log("ConfigDataString", JSON.stringify(form));

    // dispatch(getPermissionBtns(activeTab));
    // loadData();
  }, [form]);
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
        title="代码生成配置"
        open={dialogConfigVisible}
        onOk={handleConfigOk}
        onCancel={handleConfigCancel}
        width="45%"
        footer={[
          <Button
            key="back"
            key="submit"
            type="primary"
            loading={loading}
            onClick={saveConfig}
          >
            保存配置
          </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleGenerateOk}
          // >
          //   生成
          // </Button>,
        ]}
      >
        <CodeConfig ref={CodeConfigRef}></CodeConfig>
      </Modal>
      <Modal
        title="预览"
        open={dialogViewVisible}
        onOk={handleViewOk}
        onCancel={handleViewCancel}
        width="30%"
      >
        <CodeView></CodeView>
      </Modal>
    </>
  );
};
export default Module;
