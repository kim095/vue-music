<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {getStrFirstCharacter} from 'common/js/util'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.singerList.data.singerlist);//res.singerList.data.singerlist
            // console.log( this._normalizeSinger(this.singers))
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(
              new Singer(
                {
                  id: item.singer_id,
                  name: item.singer_name,
                  avator: item.singer_pic
                }
              )
            )
          }
          const key = getStrFirstCharacter(item.singer_name, '-', true)
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(
            new Singer(
              {
                id: item.singer_id,
                name: item.singer_name,
                avator: item.singer_pic
              }
            )
          )
        })
        //对map排序
        let hot = [], ret = [];
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      test() {
        var singers = this.singers
        for (let i = 0; i < singers.length; i++) {
          //  console.log(singers[i]);
          //console.log(singers[i].singer_name + '---' + getStrFirstCharacter(singers[i].singer_name, '-', true))
        }
      }
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 86px
    bottom: 0
    width: 100%
</style>
