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
    * creatorAddr: string
    * tokenContractAddr: string
    * sign: string
} data 
 * @returns 
 */
export function bindContractAddressApi(data) {
    return request({
        url: '/cto/v1/bindcontractaddr',
        method: 'post',
        data,
        loading: true,
    })
}