import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  IActionbar,
  IColumn,
  IFormItem,
  IPage,
  Crud,
  IDialogTitle,
  IOptions,
} from "@ainiteam/quick-react-ui";

// import "./index.less";
import { listToSelectTree, listToTableTree, validatePermission } from "@/utils";
import { IDictionaryType, IDictionaryTypePermissionButton } from "@/types";
import {
  getDictionaryTypeList,
  addDictionaryType,
  updateDictionaryType,
  deleteDictionaryType,
} from "@/api/system/dictionaryType";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";
import "@/assets/iconfont/quickIconFont.js";

const DictionaryType: React.FC = () => {
  /**
   * 属性
   */
  const { confirm } = Modal;
  const dispatch: AppDispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.tab);
  useEffect(() => {
    dispatch(getPermissionBtns(activeTab));
  }, []);
  const { permissionBtn }: { permissionBtn: IDictionaryTypePermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IDictionaryType[]>([]);
  const [parentTreeData, setParentTreeData] = useState<Array<IOptions>>([]);

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
   * 工具栏
   */
  const tableToolbar = {
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: !validatePermission(permissionBtn?.add),
  };

  /**
   * 表单
   */
  const dialogTitle: IDialogTitle = {
    add: "添加字典分类",
    edit: "编辑字典分类",
    detail: "字典分类详情",
  };
  const formModel: IDictionaryType = {
    id: undefined,
    pId: undefined,
    dicTypeId: "",
    dicTypeName: "",
    // fullName: "",
    // phone: "",
    // email: "",
    // address: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "字典编码",
      labelWidth: "80px",
      vModel: "dicTypeCode",
      editReadonly: true,
      placeholder: "请输入字典编码",
      prop: "dicTypeCode",
      rules: [
        {
          required: true,
          message: "请输入字典编码",
          trigger: "blur",
        },
      ],
    },
    {
      label: "字典名称",
      labelWidth: "80px",
      vModel: "dicTypeName",
      placeholder: "请输入字典名称",
      prop: "dicTypeName",
    },
    {
      label: "父级字典",
      labelWidth: "80px",
      vModel: "pId",
      placeholder: "请选择父级字典",
      type: "treeselect",
      options: parentTreeData,
      width: "400px",
      prop: "pId",
    },
  ];
  const handleFormSubmit = (form: IDictionaryType, done: any) => {
    const row = { ...form };
    if (row.id) {
      console.log("updateDictionaryType", row);
      updateDictionaryType(row).then(() => {
        message.success("字典分类修改成功");
        done();
      });
    } else {
      row.id = undefined;
      console.log("addDictionaryType", row);
      addDictionaryType(row).then(() => {
        message.success("字典分类创建成功");
        done();
      });
    }
  };

  /**
   * 操作栏
   */
  const handleDelete = (item: IDictionaryType, done: any) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: `你真的删除【${item.dicTypeName}】的字典分类吗？`,
      onOk() {
        if (!item.id) {
          return;
        }
        deleteDictionaryType(item.id).then(() => {
          message.success(`【${item.dicTypeName}】的字典分类删除成功`);
          done();
        });
      },
    });
  };
  const tableActionbar: IActionbar = {
    width: 200,
    hiddenEditButton: !validatePermission(permissionBtn?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn?.detail),
  };

  /**
   * 表格
   */
  const tableColumns: IColumn[] = [
    {
      label: "字典编码",
      prop: "dicTypeCode",
    },
    {
      label: "字典名称",
      prop: "dicTypeName",
      // edit: true,
    },
  ];

  /**
   * 加载父级字典分类下拉框
   * @param data 字典分类数据
   */
  const loadParentDictionaryData = (data: IDictionaryType[]) => {
    const parentTree = listToSelectTree(data, 0, {
      value: "id",
      label: "dicTypeName",
    });
    setParentTreeData([...parentTree]);
    console.log("父级字典分类", parentTree);
  };

  /**
   * 加载数据
   */
  const loadData = (parmas: object) => {
    setLoading(true);
    getDictionaryTypeList(parmas).then((res) => {
      setLoading(false);
      const { data: dictionaryTypeList } = res;
      console.log("dictionaryTypeList", dictionaryTypeList);
      loadParentDictionaryData(dictionaryTypeList);
      const dictionaryTypeTree = listToTableTree(dictionaryTypeList, 0, {
        pId: "pId",
      });
      console.log("dictionaryTypeTree", JSON.stringify(dictionaryTypeTree));
      setTableDataList([...dictionaryTypeTree]);
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
        pagebar={page}
        loading={loading}
        displayNumber={false}
        // formLayout="inline"
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
      ></Crud>
    </div>
  );
};

export default DictionaryType;
