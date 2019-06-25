import originJSONP from 'jsonp';
import {LOCAL_SERVER} from '@/axios/api';
const base64Util = require('@/axios/base64Util.js');
const Base64 = new base64Util.Base64();

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
};

export default function jsonp (url, params) {
  let u = LOCAL_SERVER + url;
  if (params) {
    u += ('?appParam=' + Base64.encode(JSON.stringify(params)));
  }
  return new Promise((resolve, reject) => {
    originJSONP(u, options, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

// function param (data) {
//   let url = '';
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : '';
//     url += `&${k}=${encodeURIComponent(value)}`;
//   }
//   return url ? url.substring(1) : '';
// }
