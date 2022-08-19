export class Blog{
  constructor(data){
    this.id = data.id
    this.title = data.title
    this.img = data.imgUrl
    this.body = data.body
    this.createdAt = data.createdAt
    this.creatorId = data.creatorId
    this.creator = data.creator || {}
  }
}