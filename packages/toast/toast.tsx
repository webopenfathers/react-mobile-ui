import React, { useEffect, useMemo } from 'react';
import cx from 'classnames';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';

import SpinnerLoading from '@/spinner-loading';

import './styles/index.scss';

export interface ToastProps {
  /** 提示持续时间 */
  duration?: number;
  /** Toast文本内容 */
  content: React.ReactNode;
  /** Toast关闭后的回调 */
  afterClose?: () => void;
  /** 卸载当前Toast的DOM */
  unmount?: () => void;
  /** Toast图标 */
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
}

const classPrefix = 'ygm-toast';

const Toast: React.FC<ToastProps> = ({ duration = 2000, content, unmount, afterClose, icon }) => {
  // 定义不同的toast'的图标元素
  const iconElement = useMemo(() => {
    if (icon === null || icon === undefined) return null;
    switch (icon) {
      case 'success':
        return <CheckOutline />;
      case 'fail':
        return <CloseOutline />;
      case 'loading':
        return <SpinnerLoading />;
      default:
        return icon;
    }
  }, [icon]);

  // 定义toast的卸载方法
  useEffect(() => {
    const timer = window.setTimeout(() => {
      // duration后卸载
      unmount?.();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration, unmount]);

  // 定义租价销毁时调用afterClose
  useEffect(() => {
    return () => {
      afterClose?.();
    };
  }, [afterClose]);

  return (
    <div className={classPrefix}>
      {/* toast内容 */}
      <div className={cx(`${classPrefix}-main`, icon ? `${classPrefix}-main-icon` : `${classPrefix}-main-text`)}>
        {/* toast图标 */}
        {iconElement && <div className={`${classPrefix}-icon`}>{iconElement}</div>}
        {/* toast文本内容 */}
        <div className={`${classPrefix}-text`}>{content}</div>
      </div>
    </div>
  );
};

Toast.displayName = 'Toast';

export default Toast;
