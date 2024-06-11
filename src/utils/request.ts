import { message, Modal } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import { ExclamationCircleFilled } from '@ant-design/icons';
import store, { RootState, AppDispatch } from "@/store";
import { refresh } from "@/store/modules/auth";
import { loginApi, refreshTokenApi } from "@/api/auth";

/*
 *@Description: 请求库
 *@Author: 土豆哥
 *@Date: 2022-12-02 01:28:26
 */

const { confirm } = Modal;

export interface IQuickResponseData<T = any> {
  status: number;
  msg: string;
  data: T;
  total: number;
}
let errFlag = false;
let isRefreshing = false;
const requestList: Array<any> = [];
const baseURL = import.meta.env.VITE_APP_BASE_URL;
const quickRequest: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const isTokenExpire = () => {
  const { expiresIn } = store.getState().auth;
  const expiresTime = expiresIn;
  const currentTime = new Date().getTime() / 1000;
  const num = Number(expiresTime) - Number(currentTime);
  // token 10分钟内即将过期，小于0时已过期
  if (num < 10 * 60) {
    return true;
  }
  return false;
};
const saveRequest = (callback: any) => {
  requestList.push(callback);
};
const handleRequest = (token: string) => {
  requestList.forEach((callback) => {
    callback(token);
  });
  requestList.length = 0;
};

// 请求拦截器
quickRequest.interceptors.request.use(
  (config: any) => {
    // 登录请求
    if (config.url === loginApi) {
      console.info("request111", config);
      config.headers["tenant-id"] = config.data.tenantId;
      return config;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const {
      quickAccessToken: token,
      quickRefreshToken: refreshToken,
      tenantId,
    } = store.getState().auth;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { dispatch } = store;
    // token过期
    if (isTokenExpire() && config.url !== refreshTokenApi) {
      if (!isRefreshing) {
        isRefreshing = true;
        dispatch(refresh({ quickRefreshToken: refreshToken }))
          .then(() => {
            if (token) {
              handleRequest(token);
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      const retry = new Promise((resolve) => {
        saveRequest((token: string) => {
          const cfg = config;

          if (cfg.headers) {
            cfg.headers["tenant-id"] = tenantId;
            cfg.headers.authorization = `Bearer ${token}`;
          }
          resolve(cfg);
        });
      });
      return retry;
    }
    const cfg = config;
    if (cfg.headers) {
      cfg.headers["tenant-id"] = tenantId;
      cfg.headers.authorization = `Bearer ${token}`;
    }
    console.info("request", cfg);
    return cfg;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
quickRequest.interceptors.response.use(
  (res) => {
    console.info("response", res);
    const { data: resultData } = res;
    // 导出文件
    if (res.config.responseType === ("arraybuffer" || "blob")) {
      return resultData;
    }
    const { data } = resultData as IQuickResponseData<any>;

    if (!data) {
      return Promise.resolve();
    }
    const { payload, total } = data;
    if (payload) {
      return Promise.resolve({
        data: payload,
        total,
      });
    }
    return Promise.resolve({
      data,
    });
  },
  (error) => {
    const { response } = error;
    const { status } = response;
    if (status === 401) {
      if (!errFlag) {
        confirm({
          title: "警告",
          // icon: <ExclamationCircleFilled />,
          content: "登录过期，请重新登录",
          onOk() {
            errFlag = true;
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
          },
          onCancel() {
            errFlag = false;
          },
        });
      }
    } else if (status === 400) {
      const { data: resultData } = response;
      const { msg } = resultData as IQuickResponseData<any>;
      message.error(msg);
    } else {
      if (!errFlag) {
        errFlag = true;
        message.error(error);
      }
      console.error("error", error);
    }
    return Promise.reject(error);
  }
);

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return quickRequest.request<any, T>(config);
};
export default request;
