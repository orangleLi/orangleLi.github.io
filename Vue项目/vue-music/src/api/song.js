import {commonParams, options} from "./config";
import axios from "axios";

export function getLyric(mid) {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: new Date(),
    '-': 'MusicJsonCallback_lrc',
    platform: 'yqq.json',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })

}
