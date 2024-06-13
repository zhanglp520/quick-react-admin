import { IPermissionButton } from "@ainiteam/quick-react-ui";

export interface ITenant {
  id?: number;
  tenantCode?: string;
  tenantName?: string;
  contacts: string;
  phone?: string;
  balance?: string;
  expire?: number;
  dbHost?: string;
  dbPort?: string;
  dbName?: string;
  dbUsername?: string;
  dbPassword?: string;
  dbType?: number;
  deleted?: string;
  createTime?: string;
  remark?: string;
}
export interface ITenantPermissionButton extends IPermissionButton {}
