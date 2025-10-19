import React, { useCallback, useEffect, useRef } from 'react';

import SpinnerLoading from '../spinner-loading';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useLockFn from '@/hooks/useLockFn';

import './styles/index.scss';

export interface InfiniteScrollProps {
  // 是否加载更多
  hasMore: boolean;
  // 加载更多的函数
  loadMore: () => Promise<void>;
  // 自定义底部样式
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const classPrefix = 'ygm-infinite-scroll';

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ children, footer, hasMore, loadMore }) => {
  const intersectionEleRef = useRef<HTMLDivElement>(null);

  const doLoadMore = useLockFn(loadMore);

  const observerEntry = useIntersectionObserver(intersectionEleRef, {});

  const check = useCallback(() => {
    if (!observerEntry?.isIntersecting) return;
    if (!hasMore) return;
    doLoadMore();
  }, [observerEntry?.isIntersecting, hasMore, doLoadMore]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <div className={classPrefix}>
      {children}

      {/* 监听footer部分 */}
      <div className={`${classPrefix}-load`} ref={intersectionEleRef}>
        {footer && footer}
        {!footer && hasMore ? <SpinnerLoading size={16} /> : ''}
      </div>
    </div>
  );
};

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
