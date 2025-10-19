import React, { useMemo } from 'react';

import './styles/grid.scss';

export interface GridProps {
  /** 列数 */
  columns: number;
  /** 格子之间的间距 */
  gap?: number | string | [number | string, number | string];
  children?: React.ReactNode;
}

const formatGap = (gap: string | number) => (typeof gap === 'number' ? `${gap}px` : gap);

const classPrefix = 'ygm-grid';

const Grid: React.FC<GridProps> = ({ children, gap, columns }) => {
  const style = useMemo(() => {
    if (gap !== undefined) {
      if (Array.isArray(gap)) {
        const [gapH, gapV] = gap;
        return {
          '--gap-vertical': formatGap(gapV),
          '--gap-horizontal': formatGap(gapH),
          '--columns': columns,
        };
      } else {
        return {
          '--gap': formatGap(gap),
          '--columns': columns,
        };
      }
    }

    return {
      '--columns': columns,
    };
  }, [columns, gap]);
  return (
    <div className={classPrefix} style={style as React.CSSProperties}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
