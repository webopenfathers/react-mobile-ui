const DAY_MILLISECONDS = 24 * 60 * 60 * 1000; // 一天的毫秒数
const HOURS_MILLISECONDS = 60 * 60 * 1000; // 一小时的毫秒数
const MINUTES_MILLISECONDS = 60 * 1000; // 一分钟的毫秒数

const formatTime = (val: number): string => {
  if (val <= 0) return '00';
  return val < 10 ? `0${val}` : `${val}`;
};

// 得到 天 小时 分钟 秒 毫秒
const getTime = (format: string, timeLeft: number) => {
  let d = timeLeft;

  let [, s, m, h] = [1000, 60, 60, 24].map((unit) => {
    const num = d % unit; // 可以分别得到  毫秒 秒 分钟 小时
    d = Math.floor(d / unit); // 天
    return num;
  });

  if (timeLeft > DAY_MILLISECONDS && format.indexOf('d') === -1) {
    h += d * 24;
  }

  if (timeLeft > HOURS_MILLISECONDS && format.indexOf('h') === -1) {
    m += h * 60;
  }

  if (timeLeft > MINUTES_MILLISECONDS && format.indexOf('m') === -1) {
    s += m * 60;
  }

  return {
    dd: formatTime(d),
    hh: formatTime(h),
    mm: formatTime(m),
    ss: formatTime(s),
    d,
    h,
    m,
    s,
  };
};

type formatType = 'dd' | 'hh' | 'mm' | 'ss';

export const getTimeItems = (format: string, timeLeft: number) => {
  // 匹配format
  const timeArr: Array<string> = format!.match(/[a-zA-Z]{1,3}/g) || [];
  // 匹配字符
  const symbolArr = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];

  const time = getTime(format, timeLeft);

  return timeArr.map((item, i) => {
    return {
      num: time[item.toLowerCase() as formatType],
      symbol: symbolArr[i],
    };
  });
};
