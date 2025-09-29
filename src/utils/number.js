import BigNumber from 'bignumber.js';

// 安全转换，null/undefined/空字符串当 0
function safeNumber(value) {
  if (value === null || value === undefined || value === '') {
    return new BigNumber(0);
  }
  return new BigNumber(value);
}

// 格式化数字：最多 decimals 位小数，末尾 0 去掉
function formatNumber(value, decimals = 2) {
  return new BigNumber(value)
    .decimalPlaces(decimals, BigNumber.ROUND_DOWN) // 截断
    .toString();
}

// 加法
export function add(a, b, decimals = 2) {
  return formatNumber(safeNumber(a).plus(safeNumber(b)), decimals);
}

// 减法
export function sub(a, b, decimals = 2) {
  return formatNumber(safeNumber(a).minus(safeNumber(b)), decimals);
}

// 乘法
export function mul(a, b, decimals = 2) {
  return formatNumber(safeNumber(a).multipliedBy(safeNumber(b)), decimals);
}

// 除法
export function div(a, b, decimals = 2) {
  const y = safeNumber(b);
  if (y.isZero()) return '0';
  return formatNumber(safeNumber(a).dividedBy(y), decimals);
}

/**
 * 格式化大数字，超过 1K/1M/1B 自动缩写
 * @param {string|number} value - 数字
 * @param {number} decimals - 小数位数（默认2）
 * @returns {string} - 格式化字符串
 */
export function formatLargeNumber(value, decimals = 2) {
  const num = safeNumber(value);
  const absNum = num.abs();
  let formatted;
  if (absNum.isGreaterThanOrEqualTo(1e9)) {
    formatted = num.dividedBy(1e9).decimalPlaces(decimals, BigNumber.ROUND_DOWN) + 'B';
  } else if (absNum.isGreaterThanOrEqualTo(1e6)) {
    formatted = num.dividedBy(1e6).decimalPlaces(decimals, BigNumber.ROUND_DOWN) + 'M';
  } else if (absNum.isGreaterThanOrEqualTo(1e3)) {
    formatted = num.dividedBy(1e3).decimalPlaces(decimals, BigNumber.ROUND_DOWN) + 'K';
  } else {
    formatted = num.decimalPlaces(decimals, BigNumber.ROUND_DOWN).toString();
  }
  if (formatted === '0') return '0';
  formatted = formatted.replace(/(\.\d*?)0+(?=[KMB]|$)/, '$1').replace(/\.0+$/, '');
  return formatted;
}
