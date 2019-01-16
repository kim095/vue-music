import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from "./config";
import {shuffle} from "./util";

export const playListMixin={
  computed:{
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
    this.handlePlayList(this.playList)
  },
  activated(){
    this.handlePlayList(this.playList)
  },
  watch:{
    playList(newVal){
      this.handlePlayList(this.playList)
    }
  },
  methods:{
    handlePlayList(){
      throw new Error('组件需要自己实现该方法(handlePlayList)')
    }
  }
}

export const playerMixin = {
  computed:{
    iconMode(){
      return this.mode === playMode.sequence?'icon-sequence':
        this.mode===playMode.loop?'icon-loop':'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode',
    ])
  },
  methods:{
    changeMode(){
      const mode = (this.mode+1)%3
      this.setPlayMode(mode)
      let list = null
      if(mode === playMode.random){
        list = shuffle(this.sequenceList)
      }else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    _resetCurrentIndex(list){
      let index = list.findIndex((item)=>{
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayingState:'SET_PLAYING_STATE',
      setCurrentIndex:'SET_CURRENT_INDEX',
      setPlayMode:'SET_PLAY_MODE',
      setPlaylist:'SET_PLAYLIST'
    })
  }
}

export const searchMixin = {
  computed:{
    ...mapGetters([
        'searchHistory'
      ]
    )
  },
  data(){
    return{
      query:'',
    refreshDelay:100
    }
  },
  methods:{
    blurInput(){
      this.$refs.searchBox.blur()
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    onQueryChange(query){
      this.query = query
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
