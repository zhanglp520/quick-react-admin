import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IProject {
  id?: number;
  projectId?: number;
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
