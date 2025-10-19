import React from 'react';

import './styles/thumb.scss';

interface ThumbProps {
  value: number;
  min: number;
  max: number;
  /** 是否禁用 */
  disabled: boolean;
  /** slider滑动条的ref */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** 拖拽回调 */
  onDrag: (value: number) => void;
  /** TouchEnd回调 */
  onChangeAfter: (value: number) => void;
}

const classPrefix = 'ygm-slider-thumb';

const Thumb: React.FC<ThumbProps> = (props) => {
  const { value, min, max, disabled, trackRef, onDrag, onChangeAfter } = props;
  const startX = React.useRef(0);
  const endX = React.useRef(0);
  const prevValue = React.useRef<number>(0);

  // 计算当前滑块位置的百分比
  const currentPosition = `${((value - min) / (max - min)) * 100}%`;

  const onTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    prevValue.current = value;
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const trackElement = trackRef.current;
    if (disabled || !trackElement) return;

    // 计算与开始位置的距离
    const deltax = e.touches[0].clientX - startX.current;
    // 总长度
    const total = trackElement.offsetWidth;

    const position = (deltax / total) * (max - min);
    const finalPosition = position + prevValue.current;
    endX.current = finalPosition;
    onDrag(finalPosition);
  };

  const onTouchEnd = () => {
    onChangeAfter(endX.current);
  };

  return (
    <div
      className={classPrefix}
      style={{ left: currentPosition }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={`${classPrefix}-button`} />
    </div>
  );
};

Thumb.displayName = 'Thumb';

export default Thumb;
