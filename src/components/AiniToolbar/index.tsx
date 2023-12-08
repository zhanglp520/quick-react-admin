import { Button, Space } from "antd";
import "./index.less";

type PropType = {
  position?: string;
  leftToolbarSlot?: any;
  rightToolbarSlot?: any;
  addButtonName?: string;
  batchDeleteButtonName?: string;
  importButtonName?: string;
  exportButtonName?: string;
  printtButtonName?: string;
  refreshButtonName?: string;
  hiddenAddButton?: boolean;
  hiddenBatchDeleteButton?: boolean;
  hiddenImportButton?: boolean;
  hiddenExportButton?: boolean;
  hiddenPrintButton?: boolean;
  hiddenRefreshButton?: boolean;
  onImport?: any;
  onExport?: any;
  onAdd?: any;
  onBatchDelete?: any;
  onPrint?: any;
  onRefresh?: any;
};
const AiniToolbar: React.FC<PropType> = (props: PropType) => {
  const {
    position,
    leftToolbarSlot,
    rightToolbarSlot,
    addButtonName = "新增",
    batchDeleteButtonName = "批量删除",
    importButtonName = "导入",
    exportButtonName = "导出",
    printtButtonName = "打印",
    refreshButtonName = "刷新",
    hiddenAddButton,
    hiddenBatchDeleteButton,
    hiddenImportButton,
    hiddenExportButton,
    hiddenPrintButton,
    hiddenRefreshButton,
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
      }}
      className={position === "right" ? "right" : "left"}
    >
      <Space>
        {leftToolbarSlot}
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
            {printtButtonName}
          </Button>
        )}
        {!hiddenRefreshButton && (
          <Button type="primary" onClick={onRefresh}>
            {refreshButtonName}
          </Button>
        )}
        {rightToolbarSlot}
      </Space>
    </div>
  );
};

export default AiniToolbar;
