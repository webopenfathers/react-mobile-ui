import cx from 'classnames';
import React from 'react';
import './styles/index.scss';

export interface SpinnerLoadingProps {
  color?: 'default' | 'primary' | 'white';
  size?: number;
  style?: React.CSSProperties;
}

const classPrefix = 'ygm-spinner-loading';

const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({ style, color = 'default', size = 32 }) => {
  return (
    <div
      className={cx(`${classPrefix}`, `${classPrefix}-color-${color}`)}
      style={{ ...style, width: size, height: size }}
    ></div>
  );
};

export default SpinnerLoading;

// 使组件名字在打包后不会被压缩 显示 SpinnerLoading
SpinnerLoading.displayName = 'SpinnerLoading';
