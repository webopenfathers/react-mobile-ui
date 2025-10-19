import { useCallback, useEffect, useState } from 'react';

type Value<T> = T | null;

// 读取本地存储并实时更新页面----因为storedValue是用useState保存的，
// 所以每次更新页面时，storedValue都会被更新，所以页面会实时更新
const useReadLocalStorage = <T,>(key: string): Value<T> => {
  // 读取本地存储
  const readValue = useCallback((): Value<T> => {
    // 兼容ssr的情况
    if (typeof window === 'undefined') return null;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState<Value<T>>(readValue());

  const handleStorageChange = useCallback(
    (event: Event) => {
      if ((event as CustomEvent).detail.key && (event as CustomEvent).detail.key !== key) {
        return;
      }

      setStoredValue(readValue());
    },
    [key, readValue]
  );

  // 自定义监听local-storage的变化
  useEffect(() => {
    // local-storage 这是一个自定义事件名称，通常用于在当前页面或其他页面中通知 localStorage 数据发生了变化
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return storedValue;
};

export default useReadLocalStorage;
