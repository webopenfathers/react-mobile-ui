import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface CardProps {
  /** header 左边区域 */
  title?: React.ReactNode;
  /** header 右边区域 */
  extra?: React.ReactNode;
  /** header 自定义类名 */
  headerClassName?: string;
  /** header 左边区域自定义类名 */
  titleClassName?: string;
  /** header 右边区域自定义类名 */
  extraClassName?: string;
  /** body 自定义类名 */
  bodyClassName?: string;
  /** 元素children */
  children?: React.ReactNode;
  /** header 区域点击事件 */
  onHeaderClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** body 区域点击事件 */
  onBodyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const classPrefix = 'ygm-card';

const Card: React.FC<CardProps> = ({
  title,
  extra,
  headerClassName,
  onHeaderClick,
  titleClassName,
  extraClassName,
  children,
  bodyClassName,
  onBodyClick,
}) => {
  // 头部：
  // - title: 左边区域
  // - extra: 右边区域
  const renderHeader = () => {
    if (!(title || extra)) {
      return null;
    }

    return (
      <div className={cx(`${classPrefix}-header`, headerClassName)} onClick={onHeaderClick}>
        <div className={cx(`${classPrefix}-header-title`, titleClassName)}>{title}</div>
        <div className={cx(`${classPrefix}-header-extra`, extraClassName)}>{extra}</div>
      </div>
    );
  };

  // 渲染主体内容
  // - children: 卡片主体内容
  const renderBody = () => {
    if (!children) return null;

    return (
      <div
        className={cx(`${classPrefix}-body`, bodyClassName)}
        onClick={onBodyClick}
        style={{ paddingTop: title || extra ? 0 : 13 }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className={classPrefix}>
      {renderHeader()}
      {renderBody()}
    </div>
  );
};

export default Card;

Card.displayName = 'Card';
