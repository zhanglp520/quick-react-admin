import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IAssignUserButton extends IPermissionButton {
  assignUser?: boolean;
}

export interface IRole1PermissionButton extends IPermissionButton {
  assignPermission?: boolean;
}
