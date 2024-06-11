import { ITenant } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { tenant as api } from "./index";
/*
 *@Description: 角色管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:27
 */
export const getTenantList = (): Promise<
  IQuickResponseData<Array<ITenant>>
> => {
  return request<IQuickResponseData<Array<ITenant>>>({
    url: api,
    method: "GET",
  });
};
export const addTenant = (data: ITenant) => {
  return request({
    url: api,
    method: "POST",
    data,
  });
};
export const updateTenant = (data: ITenant) => {
  const { id } = data;
  return request({
    url: `${api}/${id}`,
    method: "PUT",
    data,
  });
};
export const deleteTenant = (id: number) => {
  return request({
    url: `${api}/${id}`,
    method: "DELETE",
  });
};
