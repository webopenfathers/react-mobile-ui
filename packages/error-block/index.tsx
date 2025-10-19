import React from 'react';
import ErrorImage from './errorImage';

import './styles/index.scss';

export interface ErrorBlockProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: React.ReactNode;
}

const classPrefix = 'ygm-error-block';
const ErrorBlock: React.FC<ErrorBlockProps> = ({ title = '页面遇到一些小问题', description = '请稍后重试', image }) => {
  let imageNode: React.ReactNode = ErrorImage;

  if (image) {
    imageNode = image;
  }

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-image`}>{imageNode}</div>

      <div className={`${classPrefix}-description`}>
        <div className={`${classPrefix}-title`}>{title}</div>
        <div className={`${classPrefix}-description-subtitle`}>{description}</div>
      </div>
    </div>
  );
};

export default ErrorBlock;

// 使组件名字在打包后不会被压缩 显示 ErrorBlock
ErrorBlock.displayName = 'ErrorBlock';
