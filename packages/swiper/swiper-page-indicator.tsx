import React, { useMemo } from 'react';
import cx from 'classnames';

import './styles/swiper-page-indicator.scss';

export interface SwiperPageIndicatorProps {
  // 当前轮播图下标
  current: number;
  // 轮播图数量
  total: number;
  // 样式
  indicatorClassName?: string;
}

const classPrefix = 'ygm-swiper-page-indicator';
const SwiperPageIndicator: React.FC<SwiperPageIndicatorProps> = (props) => {
  const dots: React.ReactElement[] = useMemo(() => {
    return Array(props.total)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className={cx(`${classPrefix}-dot`, index === props.current && `${classPrefix}-dot-active`)}
        ></div>
      ));
  }, [props]);

  return <div className={classPrefix}>{dots}</div>;
};

export default SwiperPageIndicator;

SwiperPageIndicator.displayName = 'SwiperPageIndicator';
