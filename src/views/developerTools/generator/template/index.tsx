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
import { ISearchTemplate, ITemplate, ITemplatePermissionButton } from "@/types";
import {
  getTemplateList,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "@/api/developerTools/generator/template";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";

const Template: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: ITemplatePermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<ITemplate[]>([]);

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
  const searchForm: ISearchTemplate = {
    keyword: "",
  };
  const searchFormItems: IFormItem[] = [
    {
      label: "模板",
      vModel: "keyword",
      placeholder: "模板名称",
    },
    {
      label: "编号",
      vModel: "keyword",
      placeholder: "模板编号",
    },
  ];

  /**
   * 工具栏
   */

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
    add: "添加模板",
    edit: "编辑模板",
    detail: "模板详情",
  };
  const formModel: ITemplate = {
    id: undefined,
    templateId: "",
    templateName: "",
    content: "",
    type: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "模板编码",
      labelWidth: "80px",
      vModel: "templateId",
      editReadonly: true,
      placeholder: "请输入模板编码",
      prop: "templateId",
      rules: [
        {
          required: true,
          message: "请输入模板编码",
          trigger: "blur",
        },
      ],
    },
    {
      label: "模板名称",
      labelWidth: "80px",
      vModel: "templateName",
      placeholder: "请输入模板名称",
      prop: "templateName",
      rules: [
        {
          required: true,
          message: "请输入模板名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "模板内容",
      labelWidth: "80px",
      vModel: "content",
      placeholder: "请输入模板内容",
      prop: "content",
      rules: [
        {
          trigger: "blur",
        },
      ],
    },
    {
      label: "模板类型",
      labelWidth: "80px",
      vModel: "type",
      placeholder: "请输入模板类型",
      prop: "type",
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
  const handleFormSubmit = (form: ITemplate, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateTemplate", row);
      updateTemplate(row).then(() => {
        message.success("模板修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addTemplate", row);
      addTemplate(row).then(() => {
        message.success("模板创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: ITemplate, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.templateName}】的模板吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteTemplate(item.id).then(() => {
          message.success("模板删除成功");
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
      label: "模板编号",
      prop: "templateId",
    },
    {
      label: "模板名称",
      prop: "templateName",
    },
    // {
    //   label: "模板内容",
    //   prop: "content",
    // },
    {
      label: "模板类型",
      prop: "type",
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
    getTemplateList(parmas)
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

export default Template;
