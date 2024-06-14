import { ITemplate, ITemplatePermissionButton } from "@/types";
import {
  getTemplateList,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} from "@/api/developerTools/generator/template";
// import { getDictionaryTypeListByPId } from "@/api/system/dictionaryType";

/**导入第三方库 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TreeDataNode, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Crud,
  IColumn,
  IActionbar,
  IToolbar,
  IFormItem,
  IOptions,
  ITree,
  ILeftTree,
  IDialogTitle,
} from "@ainiteam/quick-react-ui";
/**导入项目文件 */
import {
  listToSelectTree,
  listToTree,
  selectFormat,
  treeFormat,
  validatePermission,
} from "@/utils";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import { getDictionaryTypeList } from "@/api/system/dictionary";
import { IDictionaryType } from "@/types";
import { getDictionaryTypeListByPId } from "@/api/system/dictionaryType";

const Template: React.FC = () => {
  const { confirm } = Modal;
  const [dicTypeSelectData] = useState<IOptions[]>([]);
  const [treeDataList, setTreeDataList] = useState<ITree[]>([]);
  const [dataList, setDataList] = useState<ITemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  const { permissionBtn }: { permissionBtn: ITemplatePermissionButton } =
    useSelector((state: RootState) => state.user);
  const [templateData, setTemplateData] = useState<ITreeOptions[]>([]);
  const [dictionaryTypeDdataListTemp, setDictionaryTypeDdataListTemp] =
    useState<ITemplate[]>([]);
  const [currentTreeData, setCurrentTreeData] = useState<ITree>({
    key: "",
    title: "",
    children: [],
  });

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
  const loadData = () => {
    const { key } = currentTreeData;
    if (!key) {
      return;
    }
    setLoading(true);
    getTemplateList(key).then((res) => {
      setLoading(false);
      const { data: dictionaryList } = res;
      console.log("dictionaryList", dictionaryList);

      setDataList([...dictionaryList]);
    });
  };
  /**
   * 左树
   */

  const [leftTree] = useState<ILeftTree>({
    treeData: [],
    treeSpan: 6,
  });
  const treeloadData = (done: any) => {
    getDictionaryTypeListByPId("generator_code_template").then((res) => {
      const { data: dictionaryTypeList } = res;
      console.log("dictionaryTypeList", dictionaryTypeList);
      setDictionaryTypeDdataListTemp([...dictionaryTypeList]);
      const template = listToTree(dictionaryTypeList, 3, {
        id: "dicTypeCode",
        label: "dicTypeName",
      });
      console.log("template", template);
      leftTree.treeData = template;
      console.log("leftTree", leftTree.treeData);
      setCurrentTreeData({ ...(template && template[0]) });
      done(currentTreeData);
    });
  };
  const handleTreeClick = (data: ITree, done: any) => {
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
   * 工具栏
   */
  const handleAdd = (item: ITemplate, done: any) => {
    const form = { ...item };
    form.templateCode = currentTreeData.id;
    done(form);
  };
  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: !validatePermission(permissionBtn?.batchDelete),
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    position: "left",
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
  useEffect(() => {
    loadData();
  }, [currentTreeData]);
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
  }, [activeTab, dispatch]);
  useEffect(() => {
    loadSelectTreeData();
  }, []);
  return (
    <>
      <div className="dept_wrap">
        <Crud
          dialogTitle={dialogTitle}
          formModel={formModel}
          formItems={formItems}
          tableData={dataList}
          tableColumns={tableColumns}
          tableActionbar={tableActionbar}
          tableToolbar={tableToolbar}
          // dialogTitles={dialogTitles}
          leftTree={leftTree}
          leftTree-refresh={true}
          loading={loading}
          // onLoad={loadData}
          onTreeLoad={treeloadData}
          onTreeClick={handleTreeClick}
          onFormSubmit={handleFormSubmit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        ></Crud>
      </div>
    </>
  );
};

export default Template;
