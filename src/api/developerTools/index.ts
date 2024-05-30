import { version1 } from "../index";
/*
 *@Description: 系统管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:54:32
 */
const parentModule = "/generator";
const apiUrl = `/developer-tools${version1}${parentModule}`;
export const generator = `${apiUrl}/generators`;
export const dataSources = `${apiUrl}/dataSources`;
export const modules = `${apiUrl}/modules`;
export const projects = `${apiUrl}/projects`;
