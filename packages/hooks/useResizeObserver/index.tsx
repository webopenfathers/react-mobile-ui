import React from 'react';

import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

// 用于监听某个 DOM 元素的尺寸变化
const useResizeObserver = <T extends HTMLElement>(
  callback: (target: T) => void,
  targetRef: React.RefObject<T | null>
) => {
  useIsomorphicLayoutEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        console.log('resize');
        callback(element);
      });

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }

    callback(element);
    return () => null;
  }, []);
};

export default useResizeObserver;
