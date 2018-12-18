const mongoConnect = require('../util/database')
const mongoDb = require('mongodb')
const getDb = require('../util/database').getDb

class Blog {
  constructor(title,brief,contents,date,comments,imgURL,_id){
    this.title = title
    this.brief = brief
    this.contents = contents
    this.date = date
    this.comments = comments
    this.imgURL = imgURL
    this._id = _id
  }
  save(){
    const db = getDb()
    let dbOp
    if(this._id){
      //update this blog
      dbOp = db.collection('blogs').updateOne({_id:new mongoDb.ObjectId(this._id)},{$set:this})
    } else {
      //insert as a new record
      dbOp = db.collection('blogs').insertOne(this)
    }

    return dbOp
      .then((result)=>{
        // console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  static fetchAllBlogs(){
    const db = getDb()
    return db.collection('blogs')
      .find()
      .toArray()
      .then()
      .catch()
  }
  static findById(blogId){
    const db = getDb()
    return db.collection('blogs')
      //!!!!!!very important !
      .find({_id:new mongoDb.ObjectId(blogId)})
      // .toArray()
      .next()
      .then((blog)=>{
        return blog
      })
      .catch(err=>{
        console.log(err)
        throw "this id not exist"
      })
  }
  static deleteById(blogId){
    const db  = getDb()
    return db.collection('blogs')
    .deleteOne({_id:new mongoDb.ObjectId(blogId)})
      .then(()=>{
        console.log("deleted")
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
module.exports = Blog



// module.exports = (sequelize, DataTypes) => {
//     const Blog = sequelize.define('Blog', {
//       title: DataTypes.STRING,
//       brief: DataTypes.TEXT,
//       context: DataTypes.TEXT,
//       date: DataTypes.STRING,
//       comments: DataTypes.STRING,
//       imgURL: DataTypes.STRING
//     })
  
//     Blog.associate = function (models) {
//     }  
//     return Blog
//   }
