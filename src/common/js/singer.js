export default class Singer {
  constructor({id,name,avator}){
    this.id = id;
    this.name = name;
    this.avator = avator.replace(".webp",".jpg")
  }
}
