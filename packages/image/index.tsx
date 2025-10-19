import React, { useRef } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export interface ImageProps {
  /** 图片地址 */
  src: string;
  /** 图片描述 */
  alt?: string;
  /** 图片宽度 */
  width?: number | string;
  /** 图片高度 */
  height?: number | string;
  /** 加载时的占位图地址 */
  loading?: string;
  style?: React.CSSProperties;
  /** 是否开启懒加载 */
  lazy?: boolean;
  /** 图片填充模式 */
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  className?: string;
  /** 图片点击事件 */
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  /** 图片加载失败时回调 */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** 图片加载完成时回调 */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
const defaultImage =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/x8AAqMB0Fk+W34AAAAASUVORK5CYII=';
const Image: React.FC<ImageProps> = ({
  loading = defaultImage,
  className,
  src,
  alt = '',
  style,
  fit = 'fill',
  width = '100%',
  height = '100%',
  lazy = false,
  onClick,
  onError,
  onLoad,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const observerEntry = useIntersectionObserver(imageRef, {
    freezeOnceVisible: true, // 默认只执行一次(加载好了以后就不需要监听)
  });

  return (
    <img
      className={className}
      ref={imageRef}
      src={observerEntry?.isIntersecting || !lazy ? src : loading}
      alt={alt}
      style={{ ...style, objectFit: fit }}
      width={width}
      height={height}
      onClick={onClick}
      onError={onError}
      onLoad={onLoad}
      draggable={false}
    />
  );
};

Image.displayName = 'Image';

export default Image;
