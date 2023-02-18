/*
 * @Author: zyh
 * @Date: 2022-03-23 20:55:19
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-18 11:14:33
 * @FilePath: /vue3-music/src/utils/request.ts
 * @Description: 接口请求函数
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import axios, { type AxiosRequestConfig } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 10000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;

axios.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    config.params = {
      ...config.params,
      t: Date.now(),
    };
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface IRequest {
  get<T>(url: string, params?: unknown): Promise<T>;
  post<T>(url: string, params?: unknown): Promise<T>;
  upload<T>(url: string, params?: unknown): Promise<T>;
  delete<T>(url: string, params?: unknown): Promise<T>;
  put<T>(url: string, params?: unknown): Promise<T>;
  download(url: string): void;
}

interface ResType<T> {
  code: number;
  data?: T;
  msg: string;
  err?: string;
}

const request: IRequest = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {
          params,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  put(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, JSON.stringify(params))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  download(url) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    iframe.onload = () => {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default request;
