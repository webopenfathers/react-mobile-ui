import useSWR from 'swr';
import type { SWRConfiguration, SWRResponse } from 'swr';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import AxiosInstance from './axiosInstance';

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

interface UseRequestResponse<Data, Error>
  extends Pick<SWRResponse<Response<Data>, AxiosError<Error>>, 'error' | 'mutate' | 'isValidating'> {
  response: Response<Data> | undefined;
  data: Data | undefined;
  error: AxiosError<Error> | undefined;
}

function useRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  config?: SWRConfiguration
): UseRequestResponse<Data, Error> {
  const {
    data: response,
    error,
    mutate, // 更改缓存数据函数(重新手动请求数据)
    isValidating, // 是否正在请求数据或重新验证加载
  } = useSWR<Response<Data>, AxiosError<Error>>(request.url, () => AxiosInstance.request(request), config);

  return {
    data: response?.data,
    response,
    error,
    mutate,
    isValidating,
  };
}

export default useRequest;
