import request from '../utils/http/mint'

export function getGlobalInfoApi() {
    return request({
        url: '/getGlobalInfo',
        method: 'get',
        loading: true,
    })
}
export function exchangelistApi(data) {
    return request({
        url: '/exchangelist',
        method: 'post',
        data,
        loading: true,
    })
}
export function myprofileApi(data) {
    return request({
        url: '/myprofile',
        method: 'post',
        data,
        loading: true,
    })
}
export function queryChipPriceApi(data) {
    return request({
        url: '/queryChipPrice',
        method: 'post',
        data,
        loading: true,
    })
}
export function queryKlineApi(data) {
    return request({
        url: '/queryKline',
        method: 'post',
        data,
        loading: true,
    })
}