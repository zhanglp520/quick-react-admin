import { Button, Space } from "antd";
import "./index.less";
import { IBtns, IToolbar } from "@ainiteam/quick-vue3-ui";

type PropType = {
  addButtonName?: string;
  batchDeleteButtonName?: string;
  importButtonName?: string;
  exportButtonName?: string;
  printButtonName?: string;
  refreshButtonName?: string;
  hiddenAddButton?: boolean;
  hiddenBatchDeleteButton?: boolean;
  hiddenImportButton?: boolean;
  hiddenExportButton?: boolean;
  hiddenPrintButton?: boolean;
  hiddenRefreshButton?: boolean;
  position?: string;
  btns?: IBtns[];
  leftToolbarSlot?: any;
  rightToolbarSlot?: any;
  onImport?: any;
  onExport?: any;
  onAdd?: any;
  onBatchDelete?: any;
  onPrint?: any;
  onRefresh?: any;
};
const AiniToolbar: React.FC<PropType> = (props: PropType) => {
  const {
    addButtonName = "新增",
    batchDeleteButtonName = "批量删除",
    importButtonName = "导入",
    exportButtonName = "导出",
    printButtonName = "打印",
    refreshButtonName = "刷新",
    hiddenAddButton,
    hiddenBatchDeleteButton,
    hiddenImportButton,
    hiddenExportButton,
    hiddenPrintButton,
    hiddenRefreshButton,
    position = "left",
    btns = [],
    leftToolbarSlot,
    rightToolbarSlot,
    onImport,
    onExport,
    onAdd,
    onBatchDelete,
    onPrint,
    onRefresh,
  } = props;
  return (
    <div
      style={{
        marginBottom: 16,
        display: "flex",
      }}
      className={position === "right" ? "right" : "left"}
    >
      <Space>
        {leftToolbarSlot}
        {btns.map((item: IBtns) => {
          if (item.position !== "right" && !item.hidden) {
            return (
              <Button
                type={item.type ? item.type : "primary"}
                onClick={item.click}
              >
                {item.name}
              </Button>
            );
          }
        })}
        {!hiddenImportButton && (
          <Button type="primary" onClick={onImport}>
            {importButtonName}
          </Button>
        )}
        {!hiddenExportButton && (
          <Button type="primary" onClick={onExport}>
            {exportButtonName}
          </Button>
        )}
        {!hiddenAddButton && (
          <Button type="primary" onClick={onAdd}>
            {addButtonName}
          </Button>
        )}
        {!hiddenBatchDeleteButton && (
          <Button type="primary" onClick={onBatchDelete}>
            {batchDeleteButtonName}
          </Button>
        )}
        {!hiddenPrintButton && (
          <Button type="primary" onClick={onPrint}>
            {printButtonName}
          </Button>
        )}
        {!hiddenRefreshButton && (
          <Button type="primary" onClick={onRefresh}>
            {refreshButtonName}
          </Button>
        )}
        {btns.map((item: IBtns) => {
          if (item.position === "right" && !item.hidden) {
            return (
              <Button
                type={item.type ? item.type : "primary"}
                onClick={item.click}
              >
                {item.name}
              </Button>
            );
          }
        })}
        {rightToolbarSlot}
      </Space>
    </div>
  );
};

export default AiniToolbar;
