import jsonp from 'common/js/jsonp'
import {commonParams} from "api/config"
import {getLyric} from "api/song"
import {ERR_OK} from "api/config"
import {Base64} from "js-base64"
export default class Song {
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve,reject)=>{
      getLyric(this.mid).then((res)=>{
        if(res.code===ERR_OK){
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
           reject('no lyric')
        }
      })
    })

  }
}

export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg`,
    url:''
  })
}

export function getSongUrlByVkey(songmid) {
 getSongUrl(songmid).then((response)=>{
    let base = response.req_0.data;
    let vkey = base.midurlinfo[0].vkey,media = base.midurlinfo[0].filename,base_url = base.sip[1];
    return `${base_url}${media}?guid=4029829689&vkey=${vkey}&uin=0&fromtag=66`
  })
}

export function getSongUrl(songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({},commonParams,{
    '-':'getplaysongvkey'+(Math.random()+'').replace('0.',''),
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq.json',
    needNewCode:0,
    data:JSON.stringify({
      'req':{
        'module':'CDN.SrfCdnDispatchServer',
        'method':'GetCdnDispatch',
        'param':{
          'guid':'4029829689',
          'calltype':0,
          'userip':''
        }
      },
      'req_0':{
        'module':'vkey.GetVkeyServer',
        'method':'CgiGetVkey',
        'param':{
          'guid':'4029829689',
          'songmid':[`${songmid}`],
          'songtype':[0],
          'uin':'0',
          'loginflag':1,
          'platform':'20'
        }
      },
      'comm':{
        'uin':0,
        'format':'json',
        'ct':20,
        'cv':0
      }
    })
  })
  return jsonp(url,data,{})
}

export function filterSinger(singer) {
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('.')
}
