import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IDataSource {
  id?: number;
  dsId: string;
  dsName: string;
  deleted?: number;
  dbAddress?: string;
  dbPort?: string;
  dbName?: string;
  dbAccount?: string;
  dbPassword?: string;
  createTime?: string;
  remark?: string;
}
export interface ISearchDataSource {
  keyword: string;
}

export interface IDataSourcePermissionButton extends IPermissionButton {
  resetPassword?: boolean;
}
