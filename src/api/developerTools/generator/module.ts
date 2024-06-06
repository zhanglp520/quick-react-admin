import { IModule } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { modules as api } from "../index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

export const getModuleList = (
  params: object
): Promise<IQuickResponseData<Array<IModule>>> => {
  return request<IQuickResponseData<Array<IModule>>>({
    url: api,
    method: "GET",
    params,
  });
};

export const addModule = (data: IModule) => {
  return request({
    url: api,
    method: "POST",
    data,
  });
};
export const updateModule = (data: IModule) => {
  const { id } = data;
  return request({
    url: `${api}/${id}`,
    method: "PUT",
    data,
  });
};
export const deleteModule = (id: number) => {
  return request({
    url: `${api}/${id}`,
    method: "DELETE",
  });
};
//保存配置
export const saveConfig = (id: any, data: any) => {
  return request({
    url: `${api}/saveConfig/${id}`,
    method: "PUT",
    data,
  });
};
// 生成代码
export const buildCode = (id: number) => {
  return request({
    url: `${api}/buildCode/${id}`,
    method: "get",
  });
};
