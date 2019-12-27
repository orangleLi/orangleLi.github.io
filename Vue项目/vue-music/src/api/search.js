import jsonp from '@/common/js/jsonp'
import {commonParams, options} from "./config";
import axios from "axios";
//

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({},commonParams,{
    _: 1551342697515,
    g_tk: 5381,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

// export function searchByKey(key, page, perPage, callBack) {
//   const url = 'https://api.bzqll.com/music/tencent/search'
//   const data = Object.assign({},commonParams,{
//     key: 579621905,
//     s: key,
//     limit: perPage,
//     type: 'song',
//     offset: page
//   })
//   axios.get(url,{
//     params: data
//   }).then((res) => {
//     callBack && callBack(res.data)
//   })
//   // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
//   // const data = Object.assign({},commonParams,{
//   //   _: 1551407808430,
//   //   g_tk: 5381,
//   //   uin: 0,
//   //   format: 'json',
//   //   platform: 'h5',
//   //   needNewCode: 1,
//   //   w: key,
//   //   zhidaqu: zhida?1:0,
//   //   catZhida: 1,
//   //   t: 0,
//   //   flag: 1,
//   //   ie: 'utf-8',
//   //   sem: 1,
//   //   aggr: 0,
//   //   perpage: 20,
//   //   n: 20,
//   //   p: page,
//   //   remoteplace: 'txt.mqq.all',
//   // })
//   // return jsonp(url, data, options)
// }
export function searchByKey(key, page, perPage) {
  const url = '/api/search'
  const data = Object.assign({},commonParams,{
    _: 1551407808430,
    g_tk: 5381,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    w: key,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perPage,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all',
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
