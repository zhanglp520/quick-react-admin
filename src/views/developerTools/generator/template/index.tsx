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
  ILeftTree,
  ITreeOptions,
} from "@ainiteam/quick-react-ui";
import { listToSelectTree, listToTree, validatePermission } from "@/utils";
import { ISearchTemplate, ITemplate, ITemplatePermissionButton } from "@/types";
import {
  getTemplateList,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "@/api/developerTools/generator/template";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import { getDictionaryTypeListByPId } from "@/api/system/dictionaryType";

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
  const [templateData, setTemplateData] = useState<ITreeOptions[]>([]);
  const [tableDataList, setTableDataList] = useState<ITemplate[]>([]);
  const [dictionaryTypeDdataListTemp, setDictionaryTypeDdataListTemp] =
    useState<ITemplate[]>([]);
  const [currentTreeData, setCurrentTreeData] = useState({
    key: "",
    title: "",
    children: [],
  });

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
      label: "编码",
      vModel: "keyword",
      placeholder: "模板编码",
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
   * 左树
   */
  const [leftTree] = useState<ILeftTree>({
    treeData: [],
    treeSpan: 6,
  });
  const treeLoad = (done: any) => {
    getDictionaryTypeListByPId("generator_code_template").then((res) => {
      const { data: dictionaryTypeList } = res;
      console.log("dictionaryTypeList", dictionaryTypeList);
      setDictionaryTypeDdataListTemp([...dictionaryTypeList]);
      const template = listToTree(dictionaryTypeList, 3, {
        id: "id",
        label: "dicTypeName",
      });
      console.log("template", template);
      leftTree.treeData = template;
      console.log("leftTree", leftTree.treeData);
      setCurrentTreeData({ ...(template && template[0]) });
      done(currentTreeData);
    });
  };
  const handleTreeClick = (data: any, done: any) => {
    setCurrentTreeData({ ...data });
    done();
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
    templateCode: "",
    templateName: "",
    content: "",
    type: "",
    remark: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "模板编码",
      labelWidth: "80px",
      vModel: "templateCode",
      editReadonly: true,
      placeholder: "请输入模板编码",
      prop: "templateCode",
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
      type: "code",
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
      label: "模板编码",
      prop: "templateCode",
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
   * 加载父级部门树下拉框
   */
  const loadSelectTreeData = () => {
    const template = listToSelectTree(dictionaryTypeDdataListTemp, 0, {
      value: "id",
      label: "dictionaryTypeName",
    });
    setTemplateData([...template]);
    console.log("templateData", templateData);
  };
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
    loadSelectTreeData();
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
        leftTree={leftTree}
        leftTreeRefresh={true}
        searchFormItems={searchFormItems}
        searchFormModel={searchForm}
        pagebar={page}
        loading={loading}
        displayNumber={true}
        onLoad={loadData}
        onTreeLoad={treeLoad}
        onTreeClick={handleTreeClick}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
      ></Crud>
    </div>
  );
};

export default Template;
