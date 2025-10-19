import InternalTabs from './tabs';
import Tab from './tab';
export type { TabProps } from './tab';
export type { TabsProps } from './tabs';

type InternalTabsType = typeof InternalTabs;

export interface TabsInterface extends InternalTabsType {
  Tab: typeof Tab;
}

const Tabs = InternalTabs as TabsInterface;

Tabs.Tab = Tab;

export default Tabs;
