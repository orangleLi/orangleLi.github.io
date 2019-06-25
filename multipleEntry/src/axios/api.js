import axios from 'axios';
import jsonp from '@/jsonp/jsonp';
const IMG_SERVER = 'http://mall.einwin.com/';

// const LOCAL_SERVER = '';// 测试环境地址(接口)
const LOCAL_SERVER = '';// 正式环境地址(接口)

// const base64Util = require('./base64Util.js');
// const Base64 = new base64Util.Base64();

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
// Axios实现请求重试
axios.defaults.retry = 1; // 重试次数
axios.defaults.retryDelay = 1000; // 重试延时
// eslint-disable-next-line
axios.defaults.shouldRetry = (error) => true; // 重试条件，默认只要是错误都需要重试

/* 封装get方法 */
export function get (url, params = {}) {
  // return new Promise((resolve, reject) => {
  //   let u = LOCAL_SERVER + url;
  //   if (params) {
  //     u += ('?appParam=' + Base64.encode(JSON.stringify(params)));
  //   }
  //   axios.get(u).then(response => {
  //     resolve(response.data);
  //   }).catch(err => {
  //     reject(err);
  //   });
  // });
  return jsonp(url, params);
}

/* 封装post方法 */
export function post (url, data = {}, token = null) {
  return new Promise((resolve, reject) => {
    axios.post(LOCAL_SERVER + url, data, {
      headers: {
        'content-type': 'application/json',
        'token': token
      }
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
}

export function jsonpFun (url, params = {}) {
  return jsonp(url, params);
}

export {LOCAL_SERVER, IMG_SERVER};
