import React, { useEffect, useState } from 'react';

export interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

// 懒加载
const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false }: Options
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  // 只监听一次
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = targetRef.current;
    if (!element || frozen) return;

    const observerParams = { threshold, root, rootMargin };

    const ob = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
      setEntry(entry);
    }, observerParams);

    ob.observe(element);

    // 组件卸载时取消监听
    return () => ob.disconnect();
  }, [targetRef, threshold, root, rootMargin, frozen]);

  return entry;
};

export default useIntersectionObserver;
