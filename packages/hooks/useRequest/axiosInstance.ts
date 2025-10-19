import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json; charset=UTF-8', // 设置请求头
  },
  responseType: 'json', // 设置响应类型
};

const AxiosInstance = axios.create(axiosConfig);

// 响应拦截器
AxiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200 || !res.data) {
      throw 'error';
    }

    return res.data;
  },
  (error: AxiosError) => {
    throw error;
  }
);

export default AxiosInstance;
