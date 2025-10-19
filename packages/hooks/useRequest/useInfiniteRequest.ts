import type { AxiosRequestConfig, AxiosError } from 'axios';
import AxiosInstance from '@/hooks/useRequest/axiosInstance';

import useSWRInfinite, { type SWRInfiniteConfiguration, type SWRInfiniteResponse } from 'swr/infinite';

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

function getKey(pageIndex: number, url: string) {
  return `${url}?pageIndex=${pageIndex + 1}`;
}

interface Return<Data, Error>
  extends Pick<
    SWRInfiniteResponse<Response<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined;
  response: Response<Data>[] | undefined;
}
function useInfiniteRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  config?: SWRInfiniteConfiguration
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<Response<Data>, AxiosError<Error>>(
    (pageIndex: number) => getKey(pageIndex, request.url!),
    (url: string) => AxiosInstance.request({ url }),
    { ...config, revalidateFirstPage: false }
  );

  return {
    data: response?.map((item) => item.data),
    response,
    mutate,
    error,
    isValidating,
    size,
    setSize,
  };
}

export default useInfiniteRequest;
