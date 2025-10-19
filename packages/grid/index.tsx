import InternalGrid from './grid';
import GridItem from './grid-item';

export type { GridProps } from './grid';
export type { GridItemProps } from './grid-item';

type InternalGridType = typeof InternalGrid;

export interface GridInterface extends InternalGridType {
  Item: typeof GridItem;
}

const Grid = InternalGrid as GridInterface;
Grid.Item = GridItem;
export default Grid;
