import React, { useMemo } from 'react';

import './styles/grid-item.scss';

export interface GridItemProps {
  /** 跨度 */
  span?: number;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const classPrefix = 'ygm-grid-item';

const GridItem: React.FC<GridItemProps> = React.memo(({ span, children, onClick }) => {
  const style = useMemo(() => {
    return {
      '--item-span': span,
    };
  }, [span]);

  return (
    <div className={classPrefix} style={style as React.CSSProperties} onClick={onClick}>
      {children}
    </div>
  );
});

export default GridItem;
