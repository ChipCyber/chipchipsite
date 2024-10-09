import request from '../utils/http/exchange';

/**
 * 获取 chipchip-box的持有数量
 * @param btc_address
 * @returns balance
 */
export function exchangeBtcbalanceApi(data) {
  return request({
    url: '/exchange/btcbalance',
    method: 'post',
    data,
    loading: true,
  })
}
/**
 * 查询销毁记录
 * @param (btc_address page page_size)
 * @returns data
 */
export function exchangeExchangeinfoApi(data) {
  return request({
    url: '/exchange/exchangeinfo',
    method: 'post',
    data,
    loading: true,
  })
}
/**
 * 提交确认销毁信息
 * @param (uid btc_address solana_address count)
 * @returns void
 */
export function exchangeRegistApi(data) {
  return request({
    url: '/exchange/regist',
    method: 'post',
    data,
    loading: true,
  })
}
