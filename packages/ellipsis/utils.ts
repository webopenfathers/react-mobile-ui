// 将字符串中的像素值转换为数字
// 例如：'20px' -> 20
// 如果无法解析为数字，则返回0
export const pxToNumber = (value: string) => {
  // parseFloat方法 尝试将字符串解析为浮点数
  // 如果解析失败，返回NaN
  // 如果是NaN，返回0，否则返回解析后的数字
  // 例如：'20px' -> 20
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};
