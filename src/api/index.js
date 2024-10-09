import request from '../utils/http'

export function sendEmailApi(data) {
  return request({
    url: '/api/common/vcode/sendEmail',
    method: 'post',
    data,
    loading: true,
  })
}
export function loginEmailApi(data) {
  return request({
    url: '/api/user/login/email',
    method: 'post',
    data,
    loading: true,
  })
}
export function loginGoogleAuthApi(data) {
  return request({
    url: '/api/user/login/googleauth',
    method: 'post',
    data,
    loading: true,
  })
}
export function articlePageListApi(data) {
  return request({
    url: '/api/article/pageList',
    method: 'post',
    data,
    loading: true,
  })
}
export function articleGetApi(data) {
  return request({
    url: '/api/article/get',
    method: 'get',
    params: data,
    loading: true,
  })
}
export function knowledgePageListApi(data) {
  return request({
    url: '/api/knowledge/pageList',
    method: 'post',
    data,
    loading: true,
  })
}
export function knowledgeGetApi(data) {
  return request({
    url: '/api/knowledge/get',
    method: 'get',
    params: data,
    loading: true,
  })
}
