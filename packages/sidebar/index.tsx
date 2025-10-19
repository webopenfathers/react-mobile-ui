import InternalSidebar from './sidebar';
import SidebarItem from './sidebar-item';

export type { SidebarProps } from './sidebar';
export type { SidebarItemProps } from './sidebar-item';

type InternalSidebarType = typeof InternalSidebar;

export interface SidebarInterface extends InternalSidebarType {
  Item: typeof SidebarItem;
}

const Sidebar = InternalSidebar as SidebarInterface;

Sidebar.Item = SidebarItem;

export default Sidebar;
