export default class Singer {
  constructor({id,mid,name,avator}){
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.avator = avator.replace(".webp",".jpg")
  }
}
