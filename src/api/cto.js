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
//回购设置
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
//直接分红
export function directdividendRuleApi(data) {
    return request({
        url: '/cto/v1/directdividend/rule',
        method: 'post',
        data,
        loading: true,
    })
}
export function directdividendRuleQueryApi(data) {
    return request({
        url: '/cto/v1/directdividend/rule/query',
        method: 'post',
        data,
        loading: true,
    })
}
//分红
export function dividendRuleApi(data) {
    return request({
        url: '/cto/v1/dividend/rule',
        method: 'post',
        data,
        loading: true,
    })
}
export function dividendRuleQueryApi(data) {
    return request({
        url: '/cto/v1/dividend/rule/query',
        method: 'post',
        data,
        loading: true,
    })
}
//销毁
export function burnSettingApi(data) {
    return request({
        url: '/cto/v1/burn/setting',
        method: 'post',
        data,
        loading: true,
    })
}
export function burnSettingQueryApi(data) {
    return request({
        url: '/cto/v1/burn/setting/query',
        method: 'post',
        data,
        loading: true,
    })
}
//转出
export function transferoutApi(data) {
    return request({
        url: '/cto/v1/transferout',
        method: 'post',
        data,
        loading: true,
    })
}
