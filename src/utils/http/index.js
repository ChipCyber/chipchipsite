import axios from 'axios'
import { message as MessageToast } from 'antd'
import { showLoading,hideLoading } from'../loading'
import store from "../../store";
import { removeUserInfo } from "../../store/userSlice";
import { LanaguageRequestMap } from "../../constants";

import i18n from '../../i18n'

axios.defaults.timeout = 30000;
// axios.defaults.retry = 1;
// axios.defaults.retryDelay = 1000;

export function getHeader() {
  let timestamp = new Date() * 1;
  const token = store.getState().user.userInfo.token;
  return { 'Content-Type': 'application/json; charset=UTF-8', 'timestamp': timestamp, 'Authorization': token ? `Bearer ${token}` : '', 'Accept-Language': LanaguageRequestMap[i18n.language] ?? LanaguageRequestMap['en'] };
}

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    config.headers = getHeader()
    if(config.data==undefined){
      config.data = {};
    }
    if (config.loading === true) {
      showLoading()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.config.loading === true) {
      hideLoading()
    }
    if(response.status===200){
      const res = response.data;
      if (res.code == 0) {
        return {data: res.data, res};
      }else if(res.code == 40752) {
        store.dispatch(removeUserInfo());
      }
      if (!response.config.hideToast) {
        MessageToast.error(res.msg)
      }
      return Promise.reject(res);
    }else{
      return Promise.reject({code:response.status, msg:response.data.message});
    }
  },
  error => {
    if (error.config && error.config.loading === true) {
      hideLoading()
    }
    if (!error.config.hideToast === true) {
      MessageToast.error(error.message);
    }
    return Promise.reject({code:-9999,msg:error.message});
  }
)

export default service
