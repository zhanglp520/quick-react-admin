import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IProjec {
  id?: number;
  projectId: string;
  projectName: string;
  deleted?: number;
  createTime?: string;
  dbId?: string;
  author?: string;
  remark?: string;
}
export interface ISearchProjec {
  keyword: string;
}

export interface IProjecPermissionButton extends IPermissionButton {
  resetPassword?: boolean;
}
