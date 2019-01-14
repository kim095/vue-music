export default class Singer {
  constructor({id,mid,name,avator}){
    this.id = id;
    this.mid = mid;
    this.name = name;
    if(avator){
      //this.avator = avator.replace(".webp",".jpg")
      this.avator=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg`
    }else{
      this.avator=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg`
    }

  }
}
