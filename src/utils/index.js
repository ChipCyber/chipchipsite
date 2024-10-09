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
export const toDateStr = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
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
      return `${address.substring(0, before + 2)}**${address.substring(42 - end)}`
  }else{
      return address;
  }
}
export function shortenAddress(address, before = 4, end = 4) {
  if(isEmpty(address)){
    return '';
  }
  if(address&&address.length>=42) {
      return `${address.substring(0, before + 2)}****${address.substring(42 - end)}`
  }else{
      return address;
  }
}
export function shortenLongAddress(address, chars = 16) {
  if(isEmpty(address)){
    return '';
  }
  if(address&&address.length>=42) {
      return `${address.substring(0, 2)}****${address.substring(42 - chars)}`
  }else{
      return address;
  }
}
