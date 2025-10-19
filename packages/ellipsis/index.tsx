import React, { useCallback, useRef, useState } from 'react';

import { pxToNumber } from './utils';
import './styles/index.scss';
import { useIsomorphicLayoutEffect } from 'swr/_internal';
import useResizeObserver from '@/hooks/useResizeObserver';

export interface EllipsisProps {
  // 文本内容
  text: string;
  // 展示几行
  rows?: number;
  // 收起操作元素
  collapse?: React.ReactNode;
  // 展开操作元素
  expand?: React.ReactNode;
}

const classPrefix = 'ygm-ellipsis';
const ellipsisTailing = '...';

const Ellipsis: React.FC<EllipsisProps> = ({ text = '', rows = 1, collapse = '', expand = '' }) => {
  // 是否超出
  const [exceeded, setExceeded] = useState<boolean>(false);
  // 是否展开
  const [expanded, setExpanded] = useState<boolean>(false);
  // 省略以后展示的文本内容
  const [ellipsised, setEllipsised] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  // 获取省略后的文本内容
  const calcEllipsised = useCallback(() => {
    const element = containerRef.current;
    if (!element) return;
    // 获取元素的原始样式(伪数组)
    const originStyle = window.getComputedStyle(element);

    // 创建一个容器元素来计算文本的宽度
    const container = document.createElement('div');
    // 样式的真正的数组
    const styNames: string[] = Array.prototype.slice.apply(originStyle);

    // 给创建的容器设置一模一样的样式
    styNames.forEach((name) => {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });

    container.innerText = text;
    container.style.height = 'auto';
    container.style.position = 'fixed';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);

    // 获取文字的行高
    const lineHeight = pxToNumber(originStyle.lineHeight);
    // 依据行高和行数，计算用户希望展示的最大高度
    const maxHeght = lineHeight * rows;
    // 获取容器内的所有文字撑起来的实际高度
    const height = container.getBoundingClientRect().height;

    // 二分查找
    const check = (left: number, right: number) => {
      let l = left;
      let r = right;
      let calcText = '';
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (l === m) break;

        // 截取字符串
        const tempText = text.slice(l, m);
        container.innerText = `${calcText}${tempText}${ellipsisTailing}${expand}`;
        const tempHeight = container.getBoundingClientRect().height;
        if (tempHeight > maxHeght) {
          r = m;
        } else {
          calcText += tempText;
          l = m;
        }
      }

      return calcText;
    };

    if (maxHeght >= height) {
      // 没有超出
      setExceeded(false);
    } else {
      // 超出
      setExceeded(true);
      const ellipsisedValue = check(0, text.length);
      setEllipsised(ellipsisedValue);
    }

    document.body.removeChild(container);
  }, [expand, rows, text]);

  useIsomorphicLayoutEffect(() => {
    calcEllipsised();
  }, [calcEllipsised]);

  // 使用 ResizeObserver 来监听容器的大小变化,重新调用计算 calcEllipsised
  useResizeObserver(calcEllipsised, containerRef);

  const renderContent = () => {
    // 没有溢出直接展示text
    if (!exceeded) return text;
    // 是否展开
    if (expanded) {
      return (
        <>
          {text}
          {/* 展开：判断是否需要显示收起元素 */}
          {collapse && <a style={{ color: '#1677ff' }}>{collapse}</a>}
        </>
      );
    } else {
      // 折叠：判断是否需要显示展开元素
      return (
        <>
          {ellipsised}
          {ellipsisTailing}
          {expand && <a style={{ color: '#1677ff' }}>{expand}</a>}
        </>
      );
    }
  };

  const onContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!expand && !collapse) return;

    if (expand && !collapse) {
      return setExpanded(true);
    }

    setExpanded(!expanded);
  };

  return (
    <div className={`${classPrefix}`} ref={containerRef} onClick={onContent}>
      {renderContent()}
    </div>
  );
};

Ellipsis.displayName = 'Ellipsis';

export default Ellipsis;
