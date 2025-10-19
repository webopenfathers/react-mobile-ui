import React, { useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import Mask, { type MaskProps } from '@/mask';
import DialogActionButton, { type Action } from '@/dialog/dialog-action-button';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import './styles/index.scss';

export interface DialogProps {
  /** 对话框标题 */
  title?: React.ReactNode;
  /** 对话框内容 */
  content?: React.ReactNode;
  /** 显示隐藏 */
  visible?: boolean;
  actions?: Action[];
  maskStyle?: MaskProps['style'];
  /** 点击action后是否关闭 */
  closeOnAction?: boolean;
  /** Dialog关闭时的回调 */
  onClose?: () => void;
  /** 显示后回调 */
  afterShow?: () => void;
  /** 关闭后回调 */
  afterClose?: () => void;
  /** 点击action后回调 */
  onAction?: (action: Action, index: number) => void | Promise<void>;
}

const classPrefix = 'ygm-dialog';

const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  visible = false,
  actions = [] as Action[],
  maskStyle,
  onClose,
  onAction,
  afterShow,
  afterClose,
  closeOnAction,
}) => {
  const [active, setActive] = useState<boolean>(visible);

  const style = useSpring({
    scale: visible ? 1 : 0.8,
    opacity: visible ? 1 : 0,
    config: {
      mass: 2.2,
      tension: 200,
      friction: 25,
      clamp: true,
    },
    onRest: () => {
      if (visible) {
        afterShow?.();
      } else {
        afterClose?.();
      }
    },
  });

  const renderTitle = () => {
    if (title) {
      return <div className={`${classPrefix}-header`}>{title}</div>;
    }
  };
  const renderContent = () => {
    if (content) {
      return (
        <div className={`${classPrefix}-content`}>
          <div>{content}</div>
        </div>
      );
    }
  };

  const renderFooter = () => {
    return (
      <div className={`${classPrefix}-footer`}>
        {actions.map((action, index) => (
          <DialogActionButton
            key={action.key}
            action={action}
            onAction={async () => {
              await Promise.all([action.onClick?.(), onAction?.(action, index)]);
              if (closeOnAction) {
                onClose?.();
              }
            }}
          />
        ))}
      </div>
    );
  };

  useIsomorphicLayoutEffect(() => {
    if (visible) {
      setActive(true);
    }
  }, [visible]);

  return (
    active && (
      <div className={classPrefix}>
        {/* 遮罩 */}
        <Mask visible={visible} style={maskStyle} onMaskClick={onClose} />
        {/* dialog */}
        <div className={`${classPrefix}-wrap`}>
          <animated.div style={style}>
            <div className={`${classPrefix}-body`}>
              {renderTitle()}
              {renderContent()}
              {renderFooter()}
            </div>
          </animated.div>
        </div>
      </div>
    )
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
