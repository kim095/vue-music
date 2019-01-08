import {mapGetters} from 'vuex'
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
