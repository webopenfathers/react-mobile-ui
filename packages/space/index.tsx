import React, { useMemo } from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface SpaceProps {
  /** 间距方向 */
  direction?: 'horizontal' | 'vertical';
  /** 交叉轴对齐方式 */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /** 主轴对齐方式	 */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /** 是否自动换行，仅在 horizontal 时有效	 */
  wrap?: boolean;
  /** 是否渲染为块级元素	 */
  block?: boolean;
  /** 间距大小，设为数组时则分别设置水平方向和垂直方向的间距大小 */
  gap?: number | string | [number | string, number | string];
  /** 元素点击事件 */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const classPrefix = `ygm-space`;

const formatGap = (gap: number | string) => (typeof gap === 'number' ? `${gap}px` : gap);

const Space: React.FC<SpaceProps> = ({
  gap,
  children,
  wrap,
  block = true,
  direction = 'horizontal',
  align,
  justify,
  onClick,
}) => {
  const style = useMemo(() => {
    if (gap) {
      if (Array.isArray(gap)) {
        const [horizontalGap, verticalGap] = gap;
        return {
          '--gap-vertical': formatGap(verticalGap),
          '--gap-horizontal': formatGap(horizontalGap),
        };
      }

      return {
        '--gap': formatGap(gap),
      };
    }

    return {};
  }, [gap]);

  return (
    <div
      className={cx(classPrefix, {
        [`${classPrefix}-wrap`]: wrap,
        [`${classPrefix}-block`]: block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${align}`]: !!align,
        [`${classPrefix}-${justify}`]: !!justify,
      })}
      onClick={onClick}
      style={style as React.CSSProperties}
    >
      {React.Children.map(children, (child) => {
        return child !== null && child !== undefined && <div className={`${classPrefix}-item`}>{child}</div>;
      })}
    </div>
  );
};

export default Space;

Space.displayName = 'Space';
