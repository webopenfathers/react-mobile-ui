import React from 'react';
import cx from 'classnames';

import SpinnerLoading from '@/spinner-loading';
import { isPromise } from '@/utils/validate';

import './styles/index.scss';

export interface ButtonProps {
  /** 按钮颜色 */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** 按钮大小 */
  size?: 'small' | 'middle' | 'large';
  /** 按钮形状 */
  shape?: 'default' | 'rounded' | 'rectangular';
  /** 按钮填充 */
  fill?: 'solid' | 'outline' | 'none';
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => Promise<void> | unknown;
  /** 块级按钮 */
  block?: boolean;
  disabled?: boolean;
  loading?: boolean | 'auto';
  loadingIcon?: React.ReactNode;
}

const classPrefix = 'ygm-button';

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  block,
  className,
  onClick,
  color = 'default',
  size = 'middle',
  shape = 'default',
  fill = 'solid',
  loading = false,
  loadingIcon = <SpinnerLoading size={16} />,
}) => {
  const [innerLoading, setInnerLoading] = React.useState(false);
  const loadingType = loading === 'auto' ? innerLoading : loading;

  const onButtonClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;

    const promise = onClick(e);

    if (isPromise(promise)) {
      try {
        setInnerLoading(true);
        await promise;
        setInnerLoading(false);
      } catch (e) {
        setInnerLoading(false);
        throw e;
      }
    }
  };

  return (
    <div
      className={cx(
        classPrefix,
        className,
        `${classPrefix}-${color}`,
        `${classPrefix}-${size}`,
        `${classPrefix}-fill-${fill}`,
        `${classPrefix}-shape-${shape}`,
        {
          [`${classPrefix}-block`]: block,
          [`${classPrefix}-disabled`]: disabled,
        }
      )}
      onClick={onButtonClick}
    >
      {loadingType ? <div className={`${classPrefix}-loading-wrap`}>{loadingIcon}</div> : children}
    </div>
  );
};

Button.displayName = 'Button';

export default Button;
