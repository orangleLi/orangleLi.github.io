import jsonp from '@/common/js/jsonp'
import {commonParams, options} from "./config";
import axios from "axios";

export function getTopList() {
  const url = '/api/toplist'
  const data = Object.assign({},commonParams,{
    _: 1551317062362,
    g_tk: 5381,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

function getDate() {
  const date = new Date()
  return date.getFullYear() + '-' + Zero((date.getMonth() + 1)) + '-' + Zero(date.getDate())
}
function Zero(num) {
  return num < 10 ? "0" + num  : num
}

export function getTopSongList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({},commonParams,{
    tpl: 3,
    page: 'detail',
    date: '2019-02-28',
    topid: topid,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
  })
  return jsonp(url, data, options)
}

