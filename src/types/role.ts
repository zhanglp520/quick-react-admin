import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IRole {
  id?: number;
  roleId: string;
  roleName: string;
  deptId?: number;
  remark?: string;
}
export interface IRolePermissionButton extends IPermissionButton {}
