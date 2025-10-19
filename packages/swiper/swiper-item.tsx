import React from 'react';
import './styles/swiper-item.scss';

export interface SwiperItemProps {
  children?: React.ReactNode; // 子节点---相当于vue中的slot
}

const classPrefix = 'ygm-swiper-item';
const SwiperItem: React.FC<SwiperItemProps> = ({ children }) => {
  return <div className={classPrefix}>{children}</div>;
};

export default SwiperItem;

SwiperItem.displayName = 'SwiperItem';
