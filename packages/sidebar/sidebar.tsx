import React, { isValidElement, useState } from 'react';
import cx from 'classnames';

import SidebarItem from '@/sidebar/sidebar-item';

import { traverseReactNode } from '@/utils/traverse-react-node';

import './styles/index.scss';

export interface SidebarProps {
  /** 当前激活side item面板的key */
  activeKey: string;
  /** 点击side item切换后回调 */
  onChange?: (key: string) => void;
  children?: React.ReactNode;
  /** 基本样式 */
  style?: React.CSSProperties &
    Partial<
      Record<'--width' | '--height' | '--background-color' | '--content-padding' | '--sidebar-item-padding', string>
    >;
}

const classPrefix = `ygm-sidebar`;

const Sidebar: React.FC<SidebarProps> = React.memo(({ children, style, activeKey, onChange }) => {
  const [activeIndex, setActiveIndex] = useState<string>(activeKey);
  const items: React.ReactElement<React.ComponentProps<typeof SidebarItem>>[] = [];

  // childern 指的是SidebarItem组件
  traverseReactNode(children, (child) => {
    if (!isValidElement(child)) return;
    if (!child.key) return;
    items.push(child as React.ReactElement<React.ComponentProps<typeof SidebarItem>>);
  });
  console.log(items, 'items');

  const onSetActive = (item: React.ReactElement<React.ComponentProps<typeof SidebarItem>>) => {
    setActiveIndex(item.key as string);
    onChange?.(item.key as string);
  };

  return (
    <div className={classPrefix}>
      {/* 左侧菜单栏 */}
      <div className={`${classPrefix}-items`} style={style}>
        {items.map((item) => {
          // *重要*
          // 这里为什么是item.key而不是item.props.key原因是：
          // key 是 React 的保留属性。直接挂在 ReactElement 上，而不是放在 props 中的，所以使用 item.key。
          // 而像 title 这样的自定义属性（非保留属性），会被 React 放在 props 对象中，因此需要通过 item.props.title 获取。
          const active = item.key === activeIndex;
          return (
            <div
              key={item.key}
              className={cx(`${classPrefix}-item`, { [`${classPrefix}-item-active`]: active })}
              onClick={() => onSetActive(item)}
            >
              {/* item.props.title 指的是SidebarItem组件的title属性 */}
              <div className={`${classPrefix}-item-title`}>{item.props.title}</div>
            </div>
          );
        })}
      </div>
      {/* 右侧渲染内容 */}
      <div className={`${classPrefix}-content`}>
        {items.map(
          (item) =>
            activeIndex === item.key && (
              <div key={item.key} className={`${classPrefix}-content-item`}>
                {item.props.children}
              </div>
            )
        )}
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
