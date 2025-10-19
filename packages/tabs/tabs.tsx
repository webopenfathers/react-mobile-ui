import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import Tab from '@/tabs/tab';

import { traverseReactNode } from '@/utils/traverse-react-node';

import './styles/index.scss';
import { useIsomorphicLayoutEffect } from 'swr/_internal';
import useUpdateIsomorphicEffect from '@/hooks/useUpdateIsomorphicLayoutEffect';

export interface TabsProps {
  /** 当前激活tab面板的key */
  activeKey: string;
  children?: React.ReactNode;
  /** 是否显示tab下划线 */
  showTabLine?: boolean;
  /** tab展示形式 */
  type?: 'line' | 'card';
  /** 点击tab切换后回调 */
  onChange?: (key: string) => void;
  /** 激活的tab样式 */
  tabActiveClassName?: string;
  /** tab列表样式 */
  tabListClassName?: string;
  /** tab内容样式 */
  tabContentClassName?: string;
}

const classPrefix = 'ygm-tabs';

const Tabs: React.FC<TabsProps> = ({
  children,
  showTabLine = true,
  onChange,
  type = 'line',
  activeKey,
  tabListClassName,
  tabActiveClassName,
  tabContentClassName,
}) => {
  const [activeIndex, setActiveKey] = useState<string>(activeKey);
  const keyToIndexRecord: Record<string, number> = useMemo(() => ({}), []);

  const [activeLineStyle, setActiveLineStyle] = useState<React.CSSProperties>({
    width: 0,
    transform: `translate3d(0,0,0)`,
    transitionDuration: '0',
  });

  const tabListRef = useRef<HTMLDivElement>(null);

  const panes: React.ReactElement<React.ComponentProps<typeof Tab>>[] = [];

  traverseReactNode(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (!child.key) return;

    const length = panes.push(child as React.ReactElement<React.ComponentProps<typeof Tab>>);
    keyToIndexRecord[child.key] = length - 1;
  });

  const onTab = (item: React.ReactElement<React.ComponentProps<typeof Tab>>) => {
    setActiveKey(item.key as string);
    onChange?.(item.key as string);
  };

  // 计算tabItem的宽度
  const calculateLineWidth = useCallback(
    (immediate = false) => {
      if (!showTabLine) return;
      const tabListEle = tabListRef.current;
      if (!tabListEle) return;

      const activedIndex = keyToIndexRecord[activeIndex];
      const activeTabWrapper = tabListEle.children.item(activedIndex + 1) as HTMLDivElement;
      const activeTab = activeTabWrapper.children.item(0) as HTMLDivElement;
      // 获取tabItem的宽度
      const activeTabWidth = activeTab.offsetWidth;
      // 获取tabItem的左边距
      const activeTabLeft = activeTab.offsetLeft;
      // 设置样式
      setActiveLineStyle({
        width: activeTabWidth,
        transform: `translate3d(${activeTabLeft}px,0,0)`,
        transitionDuration: immediate ? '0ms' : '300ms',
      });
    },
    [activeIndex, keyToIndexRecord, showTabLine]
  );

  // 计算tabItem的宽度
  useIsomorphicLayoutEffect(() => {
    calculateLineWidth(true); // 解决初次渲染时，tabItem的宽度计算错误
  }, []);

  // 解决监听activeIndex的变化，重新计算tabItem的宽度和移动位置
  useUpdateIsomorphicEffect(() => {
    calculateLineWidth();
  }, [calculateLineWidth]);

  // 处理当屏幕尺寸变化时，重新计算tabItem的宽度和移动位置
  useEffect(() => {
    window.addEventListener('resize', () => calculateLineWidth(true));

    return () => window.removeEventListener('resize', () => calculateLineWidth(true));
  }, [calculateLineWidth]);

  return (
    <div className={classPrefix}>
      <div
        className={cx(`${classPrefix}-tab-list`, tabListClassName, {
          [`${classPrefix}-tab-list-${type}`]: true,
        })}
        ref={tabListRef}
      >
        {/* 添加下划线 */}
        {showTabLine && <div className={`${classPrefix}-tab-line`} style={{ ...activeLineStyle }} />}
        {panes.map((item) => (
          <div
            key={item.key}
            className={cx(`${classPrefix}-tab`, tabActiveClassName, {
              [`${classPrefix}-tab-active`]: item.key === activeIndex,
            })}
            onClick={() => onTab(item)}
          >
            <div className={`${classPrefix}-tab-title`}>{item.props.title}</div>
          </div>
        ))}
      </div>
      {panes.map(
        (child) =>
          child.props.children &&
          child.key === activeIndex && (
            <div key={child.key} className={cx(`${classPrefix}-content`, tabContentClassName)}>
              {child}
            </div>
          )
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
