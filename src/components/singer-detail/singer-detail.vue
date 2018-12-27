<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "api/singer"
  import {ERR_OK} from "api/config"
  import {createSong} from "common/js/song"

  export default {
    computed:{
      ...mapGetters([
        'singer'
      ])
    },
    data(){
      return{
         songs:[]
      }
    },
    created(){
      this._getDetail()
    },
    methods:{
      _getDetail(){
         if(!this.singer.mid){
           this.$router.push('/singer')
           return
         }
         getSingerDetail(this.singer.mid).then((res)=>{
           if(res.code === ERR_OK){
           //  console.log(res.data.list);
             this.songs = this._normalizeSongs(res.data.list)
             console.log(this.songs)
             // var songmid = '002CxSLT41D5tD';
             // getSongUrl(songmid).then((res)=>{
             //   var vkey = res.req_0.data.midurlinfo[0].vkey;
             //   var media = res.req_0.data.midurlinfo[0].filename;
             //   var url_pre = res.req_0.data.sip[1];
             //   console.log("url:");
             //   console.log(`${url_pre}${media}?guid=4029829689&vkey=${vkey}&uin=0&fromtag=66`)
             // })
           }
         })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((item)=>{
          let {musicData} = item
          if(musicData.songid&&musicData.albummid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
  .slide-enter-active,.slide-leave-active
    transition :all 0.3s
  .slide-enter,.slide-leave-to
    transform :translate3d(100%,0,0)
</style>
