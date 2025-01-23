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
export function airdropGetHomeApi(data) {
    return request({
        url: '/airdrop/getHome',
        method: 'post',
        data,
        loading: true,
    })
}
export function airdropGetDetailApi(data) {
    return request({
        url: '/airdrop/getDetail',
        method: 'post',
        data,
        loading: true,
    })
}
export function airdropGetWalletInfoApi(data) {
    return request({
        url: '/airdrop/getWalletInfo',
        method: 'post',
        data,
        loading: true,
    })
}
export function airdropQueryBoxApi(data) {
    return request({
        url: '/airdrop/queryBox',
        method: 'post',
        data,
        loading: true,
    })
}
export function airdropGetRewardApi(data) {
    return request({
        url: '/airdrop/getReward',
        method: 'post',
        data,
        loading: true,
    })
}