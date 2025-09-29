import {isEmpty} from '../constants/constantsFunction'

function stopScroll(e) {
  e.stopPropagation();
  e.preventDefault();
}
export function showPop() {
  window.addEventListener("touchmove", stopScroll, {passive: false });
  document.body.style.overflow = 'hidden';
}
export function closePop() {
  window.removeEventListener('touchmove', stopScroll);
  document.body.style.overflow = 'auto';
}

export function scrollToAnchor(anchorName) {
  if (anchorName) {
      const anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
  }
}
export function formatNumberWithCommas(number) {
  if (number === null || number === undefined || isNaN(number)) {
    return number;
  }
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}
export function debounce(fn, delay=500) {
  let timer; // 定时器变量
  return function (...args) {
    clearTimeout(timer); // 如果定时器存在，清除定时器
    timer = setTimeout(() => {
      fn.apply(this, args); // 延迟执行传入的函数
    }, delay);
  };
}

export const toDateStr = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
}
export const toDateStrWithSeconds = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const formatted = date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");
  return formatted;
}
export function formatTimeDiff(targetTimestamp, currentTimestamp=(Date.now())) {
  if(isEmpty(targetTimestamp)||targetTimestamp==0) {
    return {};
  }
  if ((typeof targetTimestamp === 'string') && (/^[0-9]+$/.test(targetTimestamp))) {
    targetTimestamp = parseInt(targetTimestamp)
  } else if (typeof time === 'string') {
    targetTimestamp = targetTimestamp.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
  }
  if ((typeof targetTimestamp === 'number') && (targetTimestamp.toString().length === 10)) {
    targetTimestamp = targetTimestamp * 1000
  }
  if ((typeof currentTimestamp === 'string') && (/^[0-9]+$/.test(currentTimestamp))) {
    currentTimestamp = parseInt(currentTimestamp)
  } else if (typeof currentTimestamp === 'string') {
    currentTimestamp = currentTimestamp.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
  }
  if ((typeof currentTimestamp === 'number') && (currentTimestamp.toString().length === 10)) {
    currentTimestamp = currentTimestamp * 1000
  }
  const diffValue = Math.max(targetTimestamp - currentTimestamp, 0); // 时间差，确保为正数
  let diff = diffValue;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // 计算天数
  diff %= 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60)); // 计算小时
  diff %= 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60)); // 计算分钟
  diff %= 1000 * 60;
  const seconds = Math.floor(diff / 1000); // 计算秒
  return {diff: diffValue, d: `${days}`, h: hours.toString().padStart(2, '0'), m: minutes.toString().padStart(2, '0'), s: seconds.toString().padStart(2, '0')};
}
export function parseTime(time, pattern, zone = 8) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}/{m}/{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    const utc = time + new Date(time).getTimezoneOffset() * 60000;
    const wishTime = utc + (3600000 * zone);
    date = new Date(wishTime);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
export const getDateDiff = (dateTimeStamp) => {
  var result = ''
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) return
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + " month ago"
  }
  else if (weekC>=1) {
    result = "" + parseInt(weekC) + " week ago"
  }
  else if (dayC >= 1) {
    result = ""+ parseInt(dayC) + " day ago"
  }
  else if (hourC >= 1){
    result = "" + parseInt(hourC) + " hour ago"
  }
  else if (minC >= 1) {
    result = ""+ parseInt(minC) + " minutes ago"
  } else {
    result = "In one minute"
  }
  return result
}
export function maskEmail(email) {
  if(isEmpty(email)){
    return '';
  }
  const [username, domain] = email.split('@');
  if (username.length <= 3) {
    return `${username[0]}***@${domain}`;
  }
  const maskedUsername = username.slice(0, 3) + '***';
  return `${maskedUsername}@${domain}`;
}
export function shortenString(str, before = 5, end = 5) {
  if(isEmpty(str)){
    return '';
  }
  if(str&&str.length>=12) {
    return `${str.substring(0, before)}...${str.substring(str.length - end)}`
  }else{
    return str;
  }
}
export function shortenNameAddress(address, before = 2, end = 4) {
  if(isEmpty(address)){
    return '';
  }
  if(address&&address.length>=42) {
      return `${address.substring(0, before + 2)}**${address.substring(address.length - end)}`
  }else{
      return address;
  }
}
export function shortenAddress(address, before = 4, end = 4) {
  if(isEmpty(address)){
    return '';
  }
  if(address&&address.length>=42) {
      return `${address.substring(0, before + 2)}****${address.substring(address.length - end)}`
  }else{
      return address;
  }
}
export function shortenLongAddress(address, chars = 16) {
  if(isEmpty(address)){
    return '';
  }
  if(address&&address.length>=42) {
      return `${address.substring(0, 2)}****${address.substring(address.length - chars)}`
  }else{
      return address;
  }
}
