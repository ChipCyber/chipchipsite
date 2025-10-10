import request from '../utils/http/cto'

export function getProjectApi(data={}) {
    return request({
        url: '/cto/v1/project',
        method: 'get',
        params: {...data,t:new Date().getTime()},
        loading: true,
    })
}
/**
 * @param 
 * {
    * page: 1
    * pageSize: 10
} data 
 */
export function getProjectListApi(data={}) {
    return request({
        url: '/cto/v1/projectlist',
        method: 'get',
        params: {...data,t:new Date().getTime()},
        loading: true,
    })
}
/**
 * @param 
 * {
    * creatorAddr: string
    * tokenContractAddr: string
    * sign: string
} data 
 */
export function bindContractAddressApi(data) {
    return request({
        url: '/cto/v1/bindcontractaddr',
        method: 'post',
        data,
        loading: true,
    })
}

export function repurchaseSetApi(data) {
    return request({
        url: '/cto/v1/repurchase/set',
        method: 'post',
        data,
        loading: true,
    })
}
export function repurchaseSetListApi(data) {
    return request({
        url: '/cto/v1/repurchase/set/list',
        method: 'post',
        data,
        loading: true,
    })
}