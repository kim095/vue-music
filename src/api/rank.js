import jsonp from 'common/js/jsonp'
import {commonParams,options} from "./config"

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({},commonParams,{
    platform:'h5',
    uin:0,
    needNewCode:1,
    _:(new Date).getTime()
  })
  return jsonp(url,data,options)
}
