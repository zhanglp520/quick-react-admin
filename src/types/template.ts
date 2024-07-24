import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface ITemplate {
  id?: number;
  templateCode: string;
  templateName: string;
  deleted?: number;
  content?: string;
  dicTypeId?: string;
  createTime?: string;
  remark?: string;
}
export interface ISearchTemplate {
  keyword: string;
}

export interface ITemplatePermissionButton extends IPermissionButton {
  resetPassword?: boolean;
}
