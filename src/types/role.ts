import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IRole {
    id?: number;
    roleId: string;
    roleName: string;
    deptId?: number;
    remark?:string;
}
export interface IRolePermissionButton extends IPermissionButton {}
