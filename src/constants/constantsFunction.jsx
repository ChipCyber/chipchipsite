import cookie from 'react-cookies'
import BigNumber from 'bignumber.js'

export const getTokenIconLink = (address) => {
    if(isEmpty(address)){
        return '';
    }
    return `https://arkmeta.s3.ap-southeast-1.amazonaws.com/token/ICON-BSC/${address.toLowerCase()}.png`
}

export const getScanLink = (address, type='address') => {
    return `https://etherscan.io/${type}/${address}`
}

export const toShowDollar = (amount,scale=2) => {
    let temp = amount;
    if (typeof(amount) !== 'string') {
      temp = String(amount);
    }
    temp = _saveToWei(temp);
    return temp.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") 
}

export const isNoEmpty = (val) => {
    return !isEmpty(val)
}
export const isEmpty = (val) => {
    if(val==null||val===undefined||val===''){
        return true
    }else if(val instanceof Object){
        if(Object.keys(val).length==0){
            return true
        }
    }else if(val instanceof Array){
        if(val.length==0){
            return true
        }
    }
    return false
}

export const _saveToTwoWei = (number,scale=2) => {
    // var scaleP = Math.pow(10,scale);
    // var result = Math.floor(number * scaleP) /scaleP;
    let result = _toPrecision(number, scale);
    return String(result);
}
export const _toPrecision = (num, len=8) =>{
    let str = new BigNumber(num).toFixed(len,1);
    if (!Boolean(str)) return '0';
    if (!(/^[0-9.]+$/g.test(str))) return '0';
    while (str.includes(".") && (str.endsWith('.') || str.endsWith('0'))) {
        str = str.slice(0, -1)
    }
    return str
}
//保留两位，有00小数
export const _saveToWei = (number,scale=2) => {
    let bigNum = new BigNumber(number)
    let result = bigNum.toFixed(scale, 1);
    return result;
}
//次方
export const _getValuePow = (value, pow, scale=2) => {
    let bg1 = new BigNumber(value)
    let amount = bg1.pow(pow).toFixed(scale, 1);
    return amount;
}
//除法
export const _getValueDivided = (value,value2,scale=2)=> {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed(scale, 1);
    return amount;
}
export const _getValueMultipZero = (value,value2) => {
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(value2).toFixed(0, 1)
    return valueDecimals
}
//乘法
export const _getValueMultip = (value,value2,scale=2) => {
    //BigNumber
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(value2).toFixed(scale, 1)
    return valueDecimals
} 
// 减法
export const _getValueMinus = (value,value2,scale=2)=> {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.minus(bg2).toFixed(scale, 1)
    return amount;
}
export const _getValueAdd= (value,value2,scale=2)=> {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.plus(bg2).toFixed(scale, 1)
    return amount;
}

export const addCookie = (key,value,isChange) => {
    if(value.hash){
        let localDataArray = []
        let cookieArray = cookie.load(key)
        if(isChange){
        let position = checkPositionByHash(cookieArray,value.hash)
        localDataArray[position] = value
        }else{
        localDataArray.push(value)
        }
        if(cookieArray){
        cookieArray.map((item,index) => {
            localDataArray.push(item)
        })
        }
        cookie.save(key, localDataArray)
    }
}
export const checkPositionByHash = (allData,hash) => {
if(!allData){
    console.log("0")
    return 0
}
for(let i = 0;i<allData.length;i++){
    if(allData[i].hash == hash){
    return i
    }
}
}
export const removeCookieAndSetnewData = (key,data) => {
    cookie.remove(key)
    cookie.save(key,data)
}

export const removeCookieWithKey = (key) => {
    cookie.remove(key)
}

export const removeCookieListlast = (key) => {
let cookieArray = cookie.load(key)
let data_temp = []
cookieArray.map( (item,index) => {
    if(index!=0){
    data_temp.push(item)
    }
})
cookie.save(key,data_temp)
}