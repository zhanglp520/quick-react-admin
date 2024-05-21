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
import { IDictionaryType, IUserPermissionButton } from "@/types";
import {
  getDictionaryTypeList,
  addDictionaryType,
  updateDictionaryType,
  deleteDictionaryType,
} from "@/api/system/dictionaryType";
import { AppDispatch, RootState } from "@/store";
import { getPermissionBtns } from "@/store/modules/user";

const DictionaryType: React.FC = () => {
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
  const { permissionBtn }: { permissionBtn: IUserPermissionButton } =
    useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [tableDataList, setTableDataList] = useState<IDictionaryType[]>([]);

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
  const tableToolbar: IToolbar = {
    hiddenBatchDeleteButton: !validatePermission(permissionBtn?.batchDelete),
    hiddenImportButton: !validatePermission(permissionBtn?.import),
    hiddenExportButton: !validatePermission(permissionBtn?.export),
    hiddenAddButton: !validatePermission(permissionBtn?.add),
    hiddenPrintButton: !validatePermission(permissionBtn?.print),
    position: "left",
    // leftToolbarSlot: <div>lll</div>,
    // rightToolbarSlot: <div>rrr</div>,
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
    dicTypeId: "",
    dicTypeName: "",
    // fullName: "",
    // phone: "",
    // email: "",
    // address: "",
  };
  const formItems: IFormItem[] = [
    {
      label: "字典编号",
      labelWidth: "80px",
      vModel: "dicTypeId",
      editReadonly: true,
      placeholder: "请输入字典编号",
      prop: "dicTypeId",
      rules: [
        {
          required: true,
          message: "请输入字典编号",
          trigger: "blur",
        },
        {
          // validator: validateUserId,
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
      rules: [
        {
          required: true,
          message: "请输入字典名称",
          trigger: "blur",
        },
        {
          // validator: validateUserName,
          trigger: "blur",
        },
      ],
    },
  ];
  const handleFormSubmit = (form: IDictionaryType, done: any) => {
    const row = { ...form };
    debugger;
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
      label: "字典编号",
      prop: "dicTypeId",
    },
    {
      label: "字典名称",
      prop: "dicTypeName",
      // edit: true,
    },
  ];

  /**
   * 加载数据
   */
  const loadData = (parmas: object) => {
    setLoading(true);
    getDictionaryTypeList(parmas)
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
        pagebar={page}
        loading={loading}
        onLoad={loadData}
        onFormSubmit={handleFormSubmit}
        onDelete={handleDelete}
      ></Crud>
    </div>
  );
};

export default DictionaryType;
