import { IModule } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { modules as api } from "../index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

export const getModuleList = (): Promise<
  IQuickResponseData<Array<IModule>>
> => {
  return request<IQuickResponseData<Array<IModule>>>({
    url: api,
    method: "GET",
  });
};
// 生成模块
export const buildModule = (projectId: number, id: number) => {
  return request({
    url: `${api}/build/${projectId}/${id}`,
    method: "POST",
  });
};
// export const buildModule = (data: IModule) => {
//   return request({
//     url: api,
//     method: "POST",
//     data,
//   });
// };
