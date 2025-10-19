import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './styles/swiper.scss';
import SwiperPageIndicator from './swiper-page-indicator';

import { modules } from '@/swiper/utils';

import SwiperItem from './swiper-item';

export interface SwiperProps {
  loop?: boolean; // 是否循环播放
  autoplay?: boolean; // 是否自动播放
  autoPlayInterval?: number; // 自动播放的间隔时间，单位为毫秒
  defaultIndex?: number; // 默认显示第几个
  showIndicator?: boolean; // 是否显示指示器
  indicatorClassName?: string; // 指示器的样式类名
  children: React.ReactElement | React.ReactElement[]; // 子节点---相当于vue中的slot
  style?: React.CSSProperties & Partial<Record<'--height' | '--width' | '--border-radius' | '--track-padding', string>>;
}

const classPrefix = 'ygm-swiper';

const Swiper: React.FC<SwiperProps> = ({
  autoplay = false,
  loop = false,
  defaultIndex = 0,
  showIndicator = true,
  autoPlayInterval = 3000,
  children,
  indicatorClassName,
  style,
}) => {
  const [currentIndex, setCurrntIndex] = useState<number>(defaultIndex || 0);
  const [dragging, setDragging] = useState<boolean>(false);
  const startRef = useRef<number>(0);
  const slideRatioRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlaying = useRef<boolean>(false); // 是否正在自动播放
  const intervalRef = useRef<number>(0); // 自动播放的定时器

  const { validChildren, count } = useMemo(() => {
    let count = 0;
    const validChildren = React.Children.map(children, (child) => {
      // 验证对象是否是一个React元素
      if (!React.isValidElement(child)) return null;
      // 验证是否是一个SwiperItem类型
      if (child.type !== SwiperItem) {
        console.warn('Swiper children must be Swiper.Item components');
      }

      count++;
      return child;
    });

    return { validChildren, count };
  }, [children]);
  const getFinalPosition = (index: number) => {
    /**
     * 1=>0*100+0*100=0
     * 1=>0*100+1*100=100
     */
    let finalPosition = -currentIndex * 100 + index * 100;
    if (!loop) return finalPosition;

    const totalWidth = count * 100;
    // 无限轮播，当前图的前后平均分配轮播图的数量
    const flagWidth = totalWidth / 2;

    finalPosition = modules(finalPosition + flagWidth, totalWidth) - flagWidth;

    return finalPosition;
  };

  const getTransition = (position: number) => {
    if (dragging) {
      return '';
    } else if (autoPlaying.current) {
      if (position === -100 || position === 0) {
        return 'transform .3s ease-out';
      } else {
        return '';
      }
    } else if (position < -100) {
      return '';
    }
    return 'transform .3s ease-out';
  };

  // 处理Swiper的子元素
  const renderSwiperItem = () => {
    return (
      <div className={`${classPrefix}-track-inner`}>
        {React.Children.map(validChildren, (child, index) => {
          const position = getFinalPosition(index);
          return (
            <div
              className={`${classPrefix}-slide`}
              key={index}
              style={{
                left: `-${index * 100}%`,
                transform: `translate3d(${position}%,0,0)`,
                transition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  };

  const getSlideRatio = (diff: number) => {
    const element = trackRef.current;
    if (!element) return 0;
    return diff / element.offsetWidth;
  };

  const boundIndex = useCallback(
    (currentIndex: number) => {
      const min = 0;
      const max = count - 1;
      let ret = currentIndex;
      ret = Math.max(currentIndex, min);
      ret = Math.min(ret, max);
      return ret;
    },
    [count]
  );

  const swiperTo = useCallback(
    (index: number) => {
      const targetIndex = loop ? modules(index, count) : boundIndex(index);
      setCurrntIndex(targetIndex);
    },
    [boundIndex, count, loop]
  );

  const swiperNext = useCallback(() => {
    swiperTo(currentIndex + 1);
  }, [swiperTo, currentIndex]);

  const onTouchEnd = () => {
    const index = Math.round(slideRatioRef.current);
    slideRatioRef.current = 0;
    const position = currentIndex + index;
    swiperTo(position);
    setDragging(false);

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;
    const diff = startRef.current - currentX;
    slideRatioRef.current = getSlideRatio(diff);
    let position = currentIndex + slideRatioRef.current;

    if (!loop) {
      position = boundIndex(position);
    }
    setCurrntIndex(position);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startRef.current = e.changedTouches[0].clientX;
    setDragging(true);

    clearInterval(intervalRef.current); // 拖动时清除自动播放定时器
    autoPlaying.current = false; // 停止自动播放

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  useEffect(() => {
    if (!autoplay || dragging) return;
    intervalRef.current = window.setInterval(() => {
      autoPlaying.current = true;
      swiperNext();
    }, autoPlayInterval);

    // 组件卸载时清除定时器
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dragging, autoplay, autoPlayInterval, swiperNext]);

  if (count === 0 || !validChildren) {
    return null; // 如果没有有效的子元素，则不渲染Swiper
  }

  return (
    <div className={classPrefix} style={style}>
      {/* 轮播图 */}
      <div className={`${classPrefix}-track`} onTouchStart={onTouchStart} ref={trackRef}>
        {renderSwiperItem()}
      </div>
      {/* 指示器 */}
      {showIndicator && (
        <div className={`${classPrefix}-indicator`}>
          <SwiperPageIndicator
            total={count}
            current={slideRatioRef.current > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)}
            indicatorClassName={indicatorClassName}
          />
        </div>
      )}
    </div>
  );
};

export default Swiper;

Swiper.displayName = 'Swiper';
