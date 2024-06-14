import { ITemplate } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { templates as api } from "../index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

export const getTemplateList = (
  dicTypeId: string
): Promise<IQuickResponseData<Array<ITemplate>>> => {
  return request<IQuickResponseData<Array<ITemplate>>>({
    url: `${api}/getByTypeId/${dicTypeId}`,
    method: "GET",
  });
};
export const addTemplate = (data: ITemplate) => {
  return request({
    url: api,
    method: "POST",
    data,
  });
};
export const updateTemplate = (data: ITemplate) => {
  const { id } = data;
  return request({
    url: `${api}/${id}`,
    method: "PUT",
    data,
  });
};
export const deleteTemplate = (id: number) => {
  return request({
    url: `${api}/${id}`,
    method: "DELETE",
  });
};
