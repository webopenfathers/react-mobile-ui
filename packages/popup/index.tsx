import React from 'react';
import cx from 'classnames';
import { useSpring, animated } from '@react-spring/web';

import Mask from '@/mask';

import './styles/index.scss';

export interface PopupProps {
  /** 指定弹出的位置 */
  position?: 'left' | 'top' | 'bottom' | 'right';
  /** 内容区域style属性 */
  style?: React.CSSProperties;
  /** 内容区域类名 */
  className?: string;
  /** 是否可见 */
  visible: boolean;
  children?: React.ReactNode;
  /** 是否展示蒙层 */
  mask?: boolean;
  /** 点击蒙层回调 */
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** 显示后回调 */
  afterShow?: () => void;
  /** 关闭后回调 */
  afterClose?: () => void;
}

const classPrefix = 'ygm-popup';

const Popup: React.FC<PopupProps> = ({
  afterClose,
  afterShow,
  onMaskClick,
  style,
  mask = true,
  children,
  className,
  visible = false,
  position = 'left',
}) => {
  const { percent } = useSpring({
    percent: visible ? 0 : 100,
    config: {
      precision: 0.1, // 精度
      mass: 0.4, // 弹簧的质量
      tension: 300, // 弹簧的弹力
      friction: 30, // 弹簧的摩擦力
    },
    // 弹窗关闭时执行
    onRest: () => {
      if (visible) {
        afterShow?.();
      } else {
        afterClose?.();
      }
    },
  });

  return (
    <div className={classPrefix}>
      {/* 蒙层遮罩 */}
      {mask && <Mask visible={visible} onMaskClick={onMaskClick} />}
      {/* @ts-ignore */}
      <animated.div
        className={cx(`${classPrefix}-body`, `${classPrefix}-${position}`, className)}
        style={{
          ...style,
          // 从不同位置弹出的动画判断
          transform: percent.to((v) => {
            if (position === 'left') {
              return `translate(-${v}%,0)`;
            }

            if (position === 'bottom') {
              return `translate(0,${v}%)`;
            }

            if (position === 'right') {
              return `translate(${v}%,0)`;
            }

            if (position === 'top') {
              return `translate(0,-${v}%)`;
            }
            return 'none';
          }),
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default Popup;

Popup.displayName = 'Popup';
