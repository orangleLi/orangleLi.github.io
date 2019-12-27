import jsonp from 'common/js/jsonp'
import {commonParams, options} from "./config";
import axios from 'axios'

export function getRecommond() {
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"
  const data = Object.assign({},commonParams,{
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'
  // let param = {"comm":{"ct":24},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"}}
  // param = JSON.stringify(param)
  // console.log(param)
  const paramData = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
    // '-': 'recom8859073603059431',
    // g_tk: 5381,
    // loginUin: 0,
    // hostUin: 0,
    // format: 'json',
    // platform: 'yqq.json',
    // needNewCode: 0,
    // data: param

  })

  return axios.get(url, {
    params: paramData
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = '/api/songlist'
  const data = Object.assign({},commonParams,{
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
