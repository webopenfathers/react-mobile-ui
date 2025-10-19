import React from 'react';

import cx from 'classnames';

import './styles/index.scss';

export interface DividerProps {
  contentPosition?: 'left' | 'center' | 'right';
  // 是否使用虚线
  dashed?: boolean;
  // 水平还是垂直类型
  direction?: 'horizontal' | 'vertical';
  // 是否使用0.5px的线
  hairline?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties &
    Partial<Record<'--border-width' | '--border-padding' | '--text-color' | '--border-color', string>>;
}

const classPrefix = 'ygm-divider';

const Divider: React.FC<DividerProps> = ({
  style,
  dashed,
  children,
  contentPosition = 'center',
  direction = 'horizontal',
  hairline = true,
}) => {
  return (
    <div
      style={style}
      className={cx(classPrefix, `${classPrefix}-${direction}`, `${classPrefix}-${contentPosition}`, {
        [`${classPrefix}-hairline`]: hairline,
        [`${classPrefix}-dashed`]: dashed,
      })}
    >
      {children && <div className={`${classPrefix}-content`}>{children}</div>}
    </div>
  );
};

export default Divider;

Divider.displayName = 'Divider';
