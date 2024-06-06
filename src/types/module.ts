import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IModule {
  id?: number;
  projectId?: number;
  moduleId: string;
  moduleName: string;
  deleted?: number;
  createTime?: string;
  remark?: string;
  config?: string;
}

export interface ISearchModule {
  keyword: string;
}

export interface IModulePermissionButton extends IPermissionButton {
  resetPassword?: boolean;
}
