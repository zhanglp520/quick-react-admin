import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface IDictionary {
  id?: number;
  dicTypeId?: number | string;
  dicId: string;
  dicName: string;
}
export interface IDictionaryPermissionButton extends IPermissionButton {}
