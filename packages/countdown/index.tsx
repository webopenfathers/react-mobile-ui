import React, { useCallback, useMemo, useRef, useState } from 'react';
import cx from 'classnames';

import { getTimeItems } from './utils';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import './styles/index.scss';

export interface CountdownProps {
  /** 倒计时总时长，单位毫秒 */
  time: number;
  /** 倒计时格式 hh:mm:ss */
  format?: string;
  /** 结束文案 */
  endText?: string;
  /** 数字样式 */
  numberClassName?: string;
  /** 符号样式 */
  symbolClassName?: string;
  /** 结束文案样式 */
  endTextClassName?: string;
}

const classPrefix = 'ygm-countdown';
// 30小时 ======> 108000000
// format：hh:mm:ss
// [{num:'29',symbol:':'},{num:'59',symbol:':'},{num:'59',symbol:''}]
// 遍历 ===> 29:59:59
// 定时器 ====> 更新时间 ===> 更新UI

type timeItemType = {
  num: string;
  symbol: string;
}[];

const Countdown: React.FC<CountdownProps> = ({
  format = ' hh:mm:ss',
  time,
  endText,
  endTextClassName,
  numberClassName,
  symbolClassName,
}) => {
  const [timeItems, setTimeItems] = useState<timeItemType>([]); // 倒计时数字
  const [timeEnd, setTimeEnd] = useState<boolean>(false); // 倒计时结束时的文案
  const computeTimeRef = useRef<number>(time); // 倒计时总时长
  const timerRef = useRef<number>(0); // 定时器返回值
  const endTimeMs = useMemo(() => Date.now() + computeTimeRef.current, []); // 倒计时结束时间

  const setCountdownTimeItems = useCallback(() => {
    if (computeTimeRef.current <= 0) {
      setTimeEnd(true);
      clearTimeout(timerRef.current);
    }

    const timeItems = getTimeItems(format, computeTimeRef.current);
    setTimeItems(timeItems);
  }, [format]);

  const initCountdown = useCallback(() => {
    clearTimeout(timerRef.current);
    // 获取当前时间
    const now = Date.now();
    // 获取剩余毫秒数
    computeTimeRef.current = endTimeMs - now;
    timerRef.current = window.setTimeout(() => {
      initCountdown();
    });

    // 获取倒计时数字
    setCountdownTimeItems();
  }, [endTimeMs, setCountdownTimeItems]);

  useIsomorphicLayoutEffect(() => {
    initCountdown();

    // 组件卸载时清除定时器
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [initCountdown]);

  return (
    <div className={classPrefix}>
      {timeEnd && endText ? (
        <div className={endTextClassName}>{endText}</div>
      ) : (
        timeItems.map((item, index) => (
          <div className={`${classPrefix}-item`} key={index}>
            <div className={cx(`${classPrefix}-item-num`, numberClassName)}>{item.num}</div>
            <div className={cx(`${classPrefix}-symbol`, symbolClassName)}>{item.symbol}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Countdown;

Countdown.displayName = 'Countdown';
