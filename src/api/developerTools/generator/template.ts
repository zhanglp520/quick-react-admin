import { ITemplate } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { templates as api } from "../index";
import { TreeDataNode } from "antd";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 模版管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */
export const getTreeData = (): Promise<
  IQuickResponseData<Array<TreeDataNode>>
> => {
  return request<IQuickResponseData<Array<TreeDataNode>>>({
    url: `${api}/getTreeData`,
    method: "GET",
  });
};
export const getFile = (
  key: string
): Promise<IQuickResponseData<Array<ITemplate>>> => {
  return request<IQuickResponseData<Array<ITemplate>>>({
    url: `${api}/getFile`,
    method: "GET",
    params: {
      path: key,
    },
  });
};
