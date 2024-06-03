import { IDataSource } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { dataSources as api } from "../index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

export const getDataSourcesList = (): Promise<
  IQuickResponseData<Array<IDataSource>>
> => {
  return request<IQuickResponseData<Array<IDataSource>>>({
    url: api,
    method: "GET",
  });
};
export const addDataSource = (data: IDataSource) => {
  return request({
    url: api,
    method: "POST",
    data,
  });
};
export const updateDataSource = (data: IDataSource) => {
  const { id } = data;
  return request({
    url: `${api}/${id}`,
    method: "PUT",
    data,
  });
};
export const deleteDataSource = (id: number) => {
  return request({
    url: `${api}/${id}`,
    method: "DELETE",
  });
};
