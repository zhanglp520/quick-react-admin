import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IDictionaryType {
  id?: number;
  pId?: number;
  dicTypeId: string;
  dicTypeName: string;
}
export interface IDictionaryTypePermissionButton extends IPermissionButton {}
