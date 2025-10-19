import React, { useRef } from 'react';

import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

// 只有在更新阶段执行的hooks
const useUpdateIsomorphicEffect = (callback: React.EffectCallback, deep?: React.DependencyList) => {
  const isMounted = useRef<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      callback();
    }
  }, deep);
};

export default useUpdateIsomorphicEffect;
