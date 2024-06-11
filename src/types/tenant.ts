import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface ITenant {
  id?: number;
  tenantName?: string;
  contacts: string;
  phone?: string;
  balance?: string;
  expire?: string;
  dbHost?: string;
  dbPort?: string;
  dbName?: string;
  dbUsername?: string;
  dbPassword?: string;
  deleted?: string;
  createTime?: string;
  remark?: string;
}
export interface ITenantPermissionButton extends IPermissionButton {}
