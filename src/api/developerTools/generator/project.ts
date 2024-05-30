import { IProjec } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { projects as api } from "../index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

export const getProjectList = (): Promise<
  IQuickResponseData<Array<IProjec>>
> => {
  return request<IQuickResponseData<Array<IProjec>>>({
    url: api,
    method: "GET",
  });
};
// project

// 生成项目
export const buildProjec = (id: number) => {
  return request({
    url: `${api}/build/${id}`,
    method: "POST",
  });
};
