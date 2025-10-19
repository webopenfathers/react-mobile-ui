import React from 'react';

import { LeftOutline } from 'antd-mobile-icons';

import './styles/index.scss';

export interface NavBarProps {
  /** 点击返回区域后的回调 */
  onBack?: () => void;
  /** 右侧内容 */
  right?: React.ReactNode;
  /** 中间内容 */
  children?: React.ReactNode;
  /** 是否显示返回区域的箭头 */
  leftArrow?: boolean;
  /** 返回区域文字 */
  leftText?: string;
  /** 样式 */
  style?: React.CSSProperties & Partial<Record<'--nav-bar-height' | '--border-bottom', string>>;
}

const classPrefix = 'ygm-nav-bar';

const NavBar: React.FC<NavBarProps> = ({ onBack, leftText = '', leftArrow = true, style, children, right }) => {
  return (
    <div className={classPrefix} style={style}>
      {/* 左 */}
      <div className={`${classPrefix}-left`} onClick={onBack}>
        {leftArrow && (
          <div className={`${classPrefix}-left-icon`}>
            <LeftOutline />
          </div>
        )}
        <div className={`${classPrefix}-left-text`}>{leftText}</div>
      </div>
      {/* 中 */}
      <div className={`${classPrefix}-title`}>{children}</div>
      {/* 右 */}
      <div className={`${classPrefix}-right`}>{right}</div>
    </div>
  );
};

NavBar.displayName = 'NavBar';

export default NavBar;
