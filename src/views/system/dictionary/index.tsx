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
import { selectFormat, treeFormat, validatePermission } from "@/utils";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import {
  addDictionary,
  deleteDictionary,
  getDictionaryList,
  getDictionaryTypeList,
  updateDictionary,
} from "@/api/system/dictionary";
import {
  IDictionary,
  IDictionaryPermissionButton,
  IDictionaryType,
} from "@/types";

const Dictionary: React.FC = () => {
  const { confirm } = Modal;
  const [dicTypeSelectData, setDicTypeSelectData] = useState<IOptions[]>([]);
  const [treeDataList, setTreeDataList] = useState<ITree[]>([]);
  const [dataList, setDataList] = useState<IDictionary[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);

  const { permissionBtn }: { permissionBtn: IDictionaryPermissionButton } =
    useSelector((state: RootState) => state.user);

  const [currentTreeData, setCurrentTreeData] = useState<ITree>({
    key: "",
    title: "",
    children: [],
  });

  /**
   * 加载字典分类下拉框
   * @param data 字典分类数据
   */
  const loadDicTypeSelect = (data: IDictionaryType[]) => {
    const dicTypeselect = selectFormat(data, {
      value: "dicTypeCode",
      label: "dicTypeName",
    });
    dicTypeSelectData.length = 0;
    dicTypeSelectData.push(...dicTypeselect);
  };
  /**
   * 加载数据
   */
  const loadData = () => {
    const { key } = currentTreeData;

    setLoading(true);
    getDictionaryList(key).then((res) => {
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
    getDictionaryTypeList().then((res) => {
      const { data: dictionaryTypeList } = res;
      loadDicTypeSelect(dictionaryTypeList);
      const dicTree = treeFormat(dictionaryTypeList, {
        id: "dicTypeCode",
        label: "dicTypeName",
      });
      console.log("dictionaryTree", dictionaryTypeList);
      setTreeDataList([...dicTree]);
      leftTree.treeData = dicTree;
      console.log("dicTree", dicTree);

      setCurrentTreeData({ ...(treeDataList && treeDataList[0]) });
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
    add: "创建字典",
    edit: "修改字典",
    detail: "字典详情",
  };
  const formModel: IDictionary = {
    id: undefined,
    dicTypeId: undefined,
    dicId: "",
    dicName: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "字典编码",
      labelWidth: "80px",
      vModel: "dicCode",
      placeholder: "字典编码",
      editReadonly: true,
      prop: "dicCode",
      rules: [
        {
          required: true,
          message: "字典编号不能为空",
          trigger: "blur",
        },
      ],
    },
    {
      label: "字典名称",
      labelWidth: "80px",
      vModel: "dicName",
      placeholder: "字典名称",
      prop: "dicName",
      rules: [
        {
          required: true,
          message: "字典名称不能为空",
          trigger: "blur",
        },
      ],
    },
    {
      label: "字典类型",
      labelWidth: "80px",
      vModel: "dicTypeCode",
      placeholder: "字典类型",
      type: "select",
      addDisabled: true,
      editDisabled: true,
      detailDisabled: true,
      options: dicTypeSelectData,
      prop: "dicTypeCode",
    },
  ];
  /**
   * 操作栏
   */
  const handleDelete = (item: IDictionary, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.dicName}】的字典吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteDictionary(item.id).then(() => {
          message.success("字典删除成功");
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 300,
    hiddenDetailButton: true,
    hiddenEditButton: !validatePermission(permissionBtn?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
  };
  /**
   * 工具栏
   */
  const handleAdd = (item: IDictionary, done: any) => {
    const form = { ...item };
    form.dicTypeId = currentTreeData.id;
    done(form);
  };
  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: !validatePermission(permissionBtn?.add),
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
      label: "字典编码",
      prop: "dicCode",
      width: "200",
    },
    {
      label: "字典名称",
      prop: "dicName",
    },
  ];
  const handleFormSubmit = (form: IDictionary, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateDictionary", row);
      updateDictionary(row).then(() => {
        message.success("字典修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addDictionary", row);
      addDictionary(row).then(() => {
        message.success("字典创建成功");
        done();
      });
    }
  };
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
    loadData();
  }, [activeTab, currentTreeData, dispatch]);
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

export default Dictionary;
