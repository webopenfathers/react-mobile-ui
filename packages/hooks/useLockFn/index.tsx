import { useCallback, useRef } from 'react';

const useLockFn = <P extends unknown[] = unknown[], V = unknown>(fn: (...args: P) => Promise<V>) => {
  const lockRef = useRef(false);
  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;

      lockRef.current = true;

      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (error) {
        lockRef.current = false;
        throw error;
      }
    },
    [fn]
  );
};

export default useLockFn;
